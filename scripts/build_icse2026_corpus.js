const fs = require('node:fs/promises');
const path = require('node:path');

const OFFICIAL_URL = 'https://conf.researchr.org/track/icse-2026/icse-2026-research-track';
const ACCESSED_AT = new Date().toISOString();

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2019;/gi, "'")
    .replace(/&#x201c;/gi, '"')
    .replace(/&#x201d;/gi, '"');
}

function textFromHtml(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function extractAttr(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]+)"`, 'i'));
  return match ? decodeHtml(match[1]) : null;
}

function parseOfficialTrackPage(html) {
  const overviewStart = html.search(/id="event-overview"/i);
  const callStart = html.search(/id="Call-for-Papers"/i);
  const section = html.slice(overviewStart >= 0 ? overviewStart : 0, callStart >= 0 ? callStart : html.length);
  const papers = new Map();

  for (const rowMatch of section.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const row = rowMatch[0];
    const trackMatch = row.match(/<div\s+class="prog-track">([\s\S]*?)<\/div>/i);
    if (!trackMatch || textFromHtml(trackMatch[1]) !== 'Research Track') continue;

    const titleMatch = row.match(/<a\b[^>]*data-event-modal="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!titleMatch) continue;
    const official_event_id = titleMatch[1];
    const title = textFromHtml(titleMatch[2].replace(/<span\b[\s\S]*?<\/span>/gi, ''));
    if (!title) continue;

    const performersMatch = row.match(/<div\s+class="performers">([\s\S]*?)<\/div>/i);
    const authors = performersMatch
      ? [...performersMatch[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((match) => textFromHtml(match[1])).filter(Boolean)
      : [];

    let doi_url = null;
    let preprint_url = null;
    let media_url = null;
    for (const linkMatch of row.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      const href = extractAttr(linkMatch[1], 'href');
      const label = textFromHtml(linkMatch[2]);
      if (!href) continue;
      if (label === 'DOI' || /doi\.org\//i.test(href)) doi_url = href;
      if (label === 'Pre-print') preprint_url = href;
      if (label === 'Media Attached') media_url = href;
    }
    const paper = { official_event_id, title, authors, doi_url, preprint_url };
    if (media_url) paper.media_url = media_url;
    papers.set(official_event_id, paper);
  }

  return [...papers.values()].sort((a, b) => a.title.localeCompare(b.title));
}

function parseOfficialEventDetails(payload) {
  const commands = JSON.parse(payload);
  const modal = commands.find((command) => command.action === 'append' && command.id === 'event-modals');
  if (!modal || typeof modal.value !== 'string') throw new Error('Official event-details response did not contain an event modal.');
  const descriptionStart = modal.value.search(/<div\s+class="[^"]*event-description[^"]*">/i);
  const description = descriptionStart >= 0
    ? modal.value.slice(descriptionStart).split(/<div\s+class="row">/i)[0]
    : '';
  const abstract = [...description.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((match) => textFromHtml(match[1]))
    .filter(Boolean)
    .join(' ') || null;

  let doi_url = null;
  let preprint_url = null;
  let media_url = null;
  for (const linkMatch of description.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = extractAttr(linkMatch[1], 'href');
    const label = textFromHtml(linkMatch[2]);
    if (!href) continue;
    if (label === 'DOI' || /doi\.org\//i.test(href)) doi_url = href;
    if (label === 'Pre-print') preprint_url = href;
    if (label === 'Media Attached') media_url = href;
  }
  const detailLink = [...modal.value.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .find((match) => textFromHtml(match[2]) === 'All Details');
  return {
    abstract,
    official_detail_url: detailLink ? extractAttr(detailLink[1], 'href') : null,
    doi_url,
    preprint_url,
    media_url,
  };
}

function modalRequestFromPage(html) {
  const formMatch = html.match(/<form\b([^>]*)action="([^"]*eventDetailsModalByAjaxConferenceEdition[^"]*)"[^>]*>([\s\S]*?)<\/form>/i);
  if (!formMatch) throw new Error('Official page did not contain the event-details request form.');
  const formBody = formMatch[3];
  const eventInput = formBody.match(/<input\b[^>]*name="([^"]+)"[^>]*class="[^"]*event-id-input[^"]*"[^>]*\/>/i);
  const actionMatch = formBody.match(/serverInvoke\([^,]+,\s*"([^"]+)"/i);
  if (!eventInput || !actionMatch) throw new Error('Could not derive the official event-details request parameters.');
  const fields = [...formBody.matchAll(/<input\b([^>]*)\/>/gi)]
    .map((match) => ({ name: extractAttr(match[1], 'name'), value: extractAttr(match[1], 'value') || '' }))
    .filter((field) => field.name);
  return { action_url: decodeHtml(formMatch[2]), action_name: actionMatch[1], event_input_name: eventInput[1], fields };
}

async function fetchOfficialEventDetails(paper, request) {
  const form = new FormData();
  for (const field of request.fields) form.append(field.name, field.value);
  form.append('context', 'icse-2026');
  form.append(request.event_input_name, paper.official_event_id);
  form.append(request.action_name, '1');
  form.append('__ajax_runtime_request__', 'event-modal-loader');
  const response = await fetch(request.action_url, { method: 'POST', body: form });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return parseOfficialEventDetails(await response.text());
}

function slugify(title) {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function classifyPaperText(title, abstract) {
  const normalized = `${title}\n${abstract || ''}`.toLowerCase();
  if (/llm|language model|generative ai|agentic|ai agent|code generation|prompt|swe-bench/.test(normalized)) return 'AI_FOR_SOFTWARE_ENGINEERING';
  if (/test|fuzz|debug|defect|bug|fault|repair|verification|verify|proof|model checking|compiler/.test(normalized)) return 'TESTING_VERIFICATION_DEBUGGING';
  if (/program analys|static analys|reachability|security|vulnerab|privacy|malware|taint|attack|exploit|cve|supply chain/.test(normalized)) return 'PROGRAM_ANALYSIS_SECURITY_PRIVACY';
  if (/maintain|evolution|refactor|code review|technical debt|change impact|dependency|documentation/.test(normalized)) return 'MAINTENANCE_EVOLUTION_QUALITY';
  if (/requirement|architect|design|modeling|model completion/.test(normalized)) return 'REQUIREMENTS_DESIGN_ARCHITECTURE';
  if (/empirical|developer|human|community|open source|education|career|practitioner|gender|social/.test(normalized)) return 'EMPIRICAL_SOCIO_TECHNICAL_SE';
  if (/build|release|devops|docker|configuration|performance|energy|serverless|microservice|log/.test(normalized)) return 'BUILD_RELEASE_OPERATIONS';
  return 'UNCLASSIFIED_TITLE_AND_ABSTRACT';
}

function canonicalRecord(paper) {
  const doi = paper.doi_url && paper.doi_url.match(/doi\.org\/([^?#]+)$/i);
  const sourceRecords = [
    {
      source_type: 'official_program',
      url: OFFICIAL_URL,
      accessed_at: ACCESSED_AT,
      source_locator: `Accepted Papers / official event ${paper.official_event_id}`,
      supports: 'direct_evidence: official Research Track inclusion, title, authors, and listed external links',
      access_status: 'accessed',
    },
  ];
  if (paper.official_detail_url) sourceRecords.push({ source_type: 'official_detail', url: paper.official_detail_url, accessed_at: ACCESSED_AT, source_locator: `official event ${paper.official_event_id} / All Details`, supports: 'direct_evidence: official abstract and listed external links', access_status: 'accessed' });
  if (paper.doi_url) sourceRecords.push({ source_type: 'official_program_link', url: paper.doi_url, accessed_at: ACCESSED_AT, source_locator: `official event ${paper.official_event_id} / DOI link`, supports: 'direct_evidence: DOI or publisher target listed by official program', access_status: 'not_fetched' });
  if (paper.preprint_url) sourceRecords.push({ source_type: 'official_program_link', url: paper.preprint_url, accessed_at: ACCESSED_AT, source_locator: `official event ${paper.official_event_id} / Pre-print link`, supports: 'direct_evidence: accessible preprint target listed by official program', access_status: 'not_fetched' });
  if (paper.media_url) sourceRecords.push({ source_type: 'official_program_link', url: paper.media_url, accessed_at: ACCESSED_AT, source_locator: `official event ${paper.official_event_id} / Media Attached link`, supports: 'direct_evidence: media target listed by official program', access_status: 'not_fetched' });

  return {
    paper_id: `ICSE2026_${slugify(paper.title)}`,
    official_event_id: paper.official_event_id,
    title: paper.title,
    authors: paper.authors,
    venue: { venue_id: 'ICSE2026', conference: 'ICSE', year: 2026, official_track: 'Research Track' },
    publication: {
      doi: doi ? doi[1] : null,
      publisher_url: paper.doi_url,
      pdf_url: null,
      preprint_url: paper.preprint_url,
      artifact_url: null,
      code_urls: [],
      data_urls: [],
      media_url: paper.media_url || null,
    },
    abstract: paper.abstract || null,
    abstract_status: paper.abstract ? 'verified_from_official_event_details' : (paper.detail_fetch_error || 'not_present_in_official_event_details; pending publisher, author, or preprint verification'),
    source_records: sourceRecords,
    corpus_status: {
      inclusion_status: 'included',
      decision_reason: 'direct_evidence: listed under Accepted Papers with track label Research Track on the official ICSE 2026 Research Track page',
      taxonomy_categories: [classifyPaperText(paper.title, paper.abstract)],
      taxonomy_assignment: {
        claim_type: 'agent_inference',
        source_locator: paper.official_detail_url
          ? `official event ${paper.official_event_id} / All Details / event description abstract`
          : `official event ${paper.official_event_id} / event-details modal / event description abstract`,
        statement: 'Provisional single-category classification inferred only from the official title and abstract; no taxonomy revision made during corpus construction.',
      },
      duplicate_of: null,
    },
    access_and_verification: {
      official_listing: 'verified',
      authors: paper.authors.length ? 'verified_from_official_listing' : 'missing_from_official_listing',
      official_detail: paper.official_detail_url ? 'verified' : (paper.detail_fetch_error || 'not_verified'),
      publication_link: paper.doi_url ? 'listed_by_official_program_not_fetched' : 'not_listed',
      preprint_or_paper_link: paper.preprint_url ? 'listed_by_official_program_not_fetched' : 'not_listed',
      artifact_code_data: paper.media_url ? 'media_link_listed_by_official_program_not_classified' : 'not_listed',
      abstract: paper.abstract ? 'verified_from_official_event_details' : 'not_verified',
    },
    notes: 'This corpus-build record intentionally does not contain a paper card, deep reading, cross-conference synthesis, or research-gap judgment.',
  };
}

function duplicateAudit(records) {
  const byTitle = new Map();
  const byTitleAndAuthors = new Map();
  const byDoi = new Map();
  const byAuthors = new Map();
  for (const record of records) {
    const normalizedTitle = record.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const normalizedAuthors = record.authors.map((author) => author.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()).join('|');
    byTitle.set(normalizedTitle, [...(byTitle.get(normalizedTitle) || []), record.paper_id]);
    byTitleAndAuthors.set(`${normalizedTitle}|${normalizedAuthors}`, [...(byTitleAndAuthors.get(`${normalizedTitle}|${normalizedAuthors}`) || []), record.paper_id]);
    byAuthors.set(normalizedAuthors, [...(byAuthors.get(normalizedAuthors) || []), record.paper_id]);
    if (record.publication.doi) byDoi.set(record.publication.doi.toLowerCase(), [...(byDoi.get(record.publication.doi.toLowerCase()) || []), record.paper_id]);
  }
  const duplicates = (map) => [...map.entries()].filter(([, ids]) => ids.length > 1).map(([key, paper_ids]) => ({ key, paper_ids }));
  const bothVersions = records.filter((record) => record.publication.doi && record.publication.preprint_url).map((record) => record.paper_id);
  const preprintOnly = records.filter((record) => !record.publication.doi && record.publication.preprint_url).map((record) => record.paper_id);
  const formalOnly = records.filter((record) => record.publication.doi && !record.publication.preprint_url).map((record) => record.paper_id);
  return {
    exact_normalized_title_duplicates: duplicates(byTitle),
    normalized_title_and_author_duplicates: duplicates(byTitleAndAuthors),
    doi_duplicates: duplicates(byDoi),
    title_variant_candidates: duplicates(byTitle),
    repeated_complete_author_lists_across_distinct_titles: duplicates(byAuthors).map((entry) => ({ ...entry, interpretation: 'not a duplicate finding by itself; a complete author-list match across different titles can represent distinct papers' })),
    author_identity_check: 'normalized author-name strings were used only as a companion duplicate key; no author identifier (for example ORCID) is present in the official acceptance listing.',
    version_mapping: {
      method: 'direct_evidence: map formal DOI and preprint only when both external links are co-listed on the same official event record.',
      co_listed_formal_and_preprint: bothVersions,
      preprint_without_co_listed_formal_doi: preprintOnly,
      formal_doi_without_co_listed_preprint: formalOnly,
      unresolved_preprint_formal_correspondence: 'pending: do not infer a version correspondence solely from a title search.',
    },
  };
}

async function main() {
  const response = await fetch(OFFICIAL_URL);
  if (!response.ok) throw new Error(`Official source fetch failed: ${response.status} ${response.statusText}`);
  const html = await response.text();
  const accepted = parseOfficialTrackPage(html);
  if (!accepted.length) throw new Error('No Research Track papers parsed from the official source.');
  const modalRequest = modalRequestFromPage(html);
  const detailed = [];
  for (let index = 0; index < accepted.length; index += 4) {
    const batch = accepted.slice(index, index + 4);
    const results = await Promise.all(batch.map(async (paper) => {
      try {
        return { ...paper, ...(await fetchOfficialEventDetails(paper, modalRequest)) };
      } catch (error) {
        return { ...paper, detail_fetch_error: `official_event_details_fetch_failed: ${error.message}` };
      }
    }));
    detailed.push(...results);
    process.stderr.write(`Fetched official details for ${Math.min(index + batch.length, accepted.length)}/${accepted.length} papers\n`);
  }
  const records = detailed.map(canonicalRecord);
  const paperIds = new Set(records.map((record) => record.paper_id));
  if (paperIds.size !== records.length) throw new Error('Generated paper_id collision; manual resolution required.');

  const root = path.resolve(__dirname, '..');
  const corpusDir = path.join(root, 'corpus');
  await fs.mkdir(corpusDir, { recursive: true });
  await fs.writeFile(path.join(corpusDir, 'icse2026-research-track.jsonl'), `${records.map((record) => JSON.stringify(record)).join('\n')}\n`);
  await fs.writeFile(path.join(corpusDir, 'icse2026-research-track-official-baseline.json'), `${JSON.stringify({
    venue_id: 'ICSE2026',
    official_track: 'Research Track',
    source: { url: OFFICIAL_URL, accessed_at: ACCESSED_AT, source_locator: 'Accepted Papers tab', access_status: 'accessed_http_200' },
    accepted_paper_count: accepted.length,
    accepted_papers: detailed,
  }, null, 2)}\n`);
  const dedupAudit = duplicateAudit(records);
  await fs.writeFile(path.join(corpusDir, 'icse2026-research-track-dedup-audit.json'), `${JSON.stringify(dedupAudit, null, 2)}\n`);

  const report = {
    venue_id: 'ICSE2026',
    scope: 'ICSE 2026 Research Track only',
    claim_type: 'direct_evidence',
    source_locator: `${OFFICIAL_URL} / Accepted Papers tab`,
    official_accepted_count: accepted.length,
    local_corpus_record_count: records.length,
    coverage: { numerator: records.length, denominator: accepted.length, percentage: (records.length / accepted.length) * 100 },
    fields: {
      title: records.filter((record) => record.title).length,
      authors: records.filter((record) => record.authors.length).length,
      official_source: records.filter((record) => record.source_records.length).length,
      official_detail_page: records.filter((record) => record.access_and_verification.official_detail === 'verified').length,
      doi_or_publisher_link: records.filter((record) => record.publication.publisher_url).length,
      preprint_link: records.filter((record) => record.publication.preprint_url).length,
      abstract: records.filter((record) => record.abstract).length,
      artifact_or_media_link: records.filter((record) => record.publication.artifact_url || record.publication.media_url).length,
      code_link: records.filter((record) => record.publication.code_urls.length).length,
      data_link: records.filter((record) => record.publication.data_urls.length).length,
    },
    unavailable_or_pending: {
      abstracts: records.filter((record) => !record.abstract).map((record) => record.paper_id),
      official_detail_fetch_failures: records.filter((record) => record.access_and_verification.official_detail !== 'verified').map((record) => ({ paper_id: record.paper_id, status: record.access_and_verification.official_detail })),
      artifacts_code_data: records.filter((record) => !record.publication.artifact_url && !record.publication.code_urls.length && !record.publication.data_urls.length).map((record) => record.paper_id),
      external_link_targets_not_fetched: records.flatMap((record) => record.source_records.filter((source) => source.access_status === 'not_fetched').map((source) => ({ paper_id: record.paper_id, url: source.url }))),
    },
    source_conflicts: [],
    deduplication: {
      audit_file: 'corpus/icse2026-research-track-dedup-audit.json',
      exact_normalized_title_duplicates: dedupAudit.exact_normalized_title_duplicates.length,
      normalized_title_and_author_duplicates: dedupAudit.normalized_title_and_author_duplicates.length,
      doi_duplicates: dedupAudit.doi_duplicates.length,
      title_variant_candidates: dedupAudit.title_variant_candidates.length,
      co_listed_formal_and_preprint_versions: dedupAudit.version_mapping.co_listed_formal_and_preprint.length,
      unresolved_preprint_formal_correspondence: dedupAudit.version_mapping.preprint_without_co_listed_formal_doi.length,
    },
    taxonomy: { status: 'initial taxonomy retained', rationale: 'config/research_scope.yaml restricts taxonomy revision to the domain-map phase; records contain provisional title-and-abstract categories.', unclassified_title_and_abstract: records.filter((record) => record.corpus_status.taxonomy_categories.includes('UNCLASSIFIED_TITLE_AND_ABSTRACT')).map((record) => record.paper_id) },
    follow_up_verification: ['Resolve DOI and proceedings pages, abstracts, and formal/preprint version links from publisher and author sources.', 'Classify official Media Attached targets before treating them as artifacts, code, or data.', 'Check author identity and title variants with publisher/preprint records once those sources are added.'],
  };
  await fs.writeFile(path.join(root, 'reports', 'icse2026-corpus-build-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ official_accepted_count: accepted.length, local_corpus_record_count: records.length, report: 'reports/icse2026-corpus-build-report.json' })}\n`);
}

if (require.main === module) main().catch((error) => { console.error(error.stack || error); process.exitCode = 1; });

module.exports = { parseOfficialTrackPage, parseOfficialEventDetails, classifyPaperText, duplicateAudit };
