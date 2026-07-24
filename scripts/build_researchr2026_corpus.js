const fs = require('node:fs/promises');
const path = require('node:path');

const ACCESSED_AT = new Date().toISOString();

const VENUE_CONFIGS = Object.freeze({
  ICSE2026: Object.freeze({
    venue_id: 'ICSE2026',
    conference: 'ICSE',
    year: 2026,
    conference_edition: 'icse-2026',
    official_track: 'Research Track',
    display_name: 'ICSE 2026 Research Track',
    official_url: 'https://conf.researchr.org/track/icse-2026/icse-2026-research-track',
    file_stem: 'icse2026-research-track',
  }),
  FSE2026: Object.freeze({
    venue_id: 'FSE2026',
    conference: 'FSE',
    year: 2026,
    conference_edition: 'fse-2026',
    official_track: 'Research Papers',
    display_name: 'FSE 2026 Research Papers',
    official_url: 'https://conf.researchr.org/track/fse-2026/fse-2026-research-papers',
    file_stem: 'fse2026-research-papers',
  }),
  ISSTA2026: Object.freeze({
    venue_id: 'ISSTA2026',
    conference: 'ISSTA',
    year: 2026,
    conference_edition: 'issta-2026',
    official_track: 'Research papers',
    display_name: 'ISSTA 2026 Research Papers',
    official_url: 'https://conf.researchr.org/track/issta-2026/issta-2026-research-papers',
    file_stem: 'issta2026-research-papers',
  }),
  ASE2025: Object.freeze({
    venue_id: 'ASE2025',
    conference: 'ASE',
    year: 2025,
    conference_edition: 'ase-2025',
    official_track: 'Research Papers',
    display_name: 'ASE 2025 Research Papers',
    official_url: 'https://conf.researchr.org/track/ase-2025/ase-2025-papers',
    file_stem: 'ase2025-research-papers',
  }),
});

function resolveVenueConfig(venueId = 'ICSE2026') {
  const config = VENUE_CONFIGS[venueId];
  if (!config) throw new Error(`Unsupported venue configuration: ${venueId}`);
  return config;
}

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

function parseOfficialTrackPage(html, officialTrack = resolveVenueConfig().official_track) {
  const overviewStart = html.search(/id="event-overview"/i);
  const callStart = html.search(/id="-?Call-for-Papers"/i);
  const section = html.slice(overviewStart >= 0 ? overviewStart : 0, callStart >= 0 ? callStart : html.length);
  const papers = new Map();

  for (const rowMatch of section.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const row = rowMatch[0];
    const trackMatch = row.match(/<div\s+class="prog-track">([\s\S]*?)<\/div>/i);
    if (!trackMatch || textFromHtml(trackMatch[1]) !== officialTrack) continue;

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
    const official_links = [];
    for (const linkMatch of row.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
      const href = extractAttr(linkMatch[1], 'href');
      const label = textFromHtml(linkMatch[2]);
      if (!href || !/\bpublication-link\b/i.test(linkMatch[1])) continue;
      official_links.push({ label, url: href });
      if (label === 'Pre-print') preprint_url = href;
      else if (label === 'DOI' || /doi\.org\//i.test(href)) doi_url = href;
      if (label === 'Media Attached') media_url = href;
    }
    const paper = { official_event_id, title, authors, doi_url, preprint_url };
    if (media_url) paper.media_url = media_url;
    if (official_links.length) paper.official_links = official_links;
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
    if (label === 'Pre-print') preprint_url = href;
    else if (label === 'DOI' || /doi\.org\//i.test(href)) doi_url = href;
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

async function fetchOfficialEventDetails(paper, request, config) {
  const form = new FormData();
  for (const field of request.fields) form.append(field.name, field.value);
  form.append('context', config.conference_edition);
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

function canonicalRecord(paper, config = resolveVenueConfig(), accessedAt = ACCESSED_AT) {
  const doi = paper.doi_url && paper.doi_url.match(/doi\.org\/([^?#]+)$/i);
  const officialLinks = paper.official_links || [];
  const urlsFor = (pattern) => officialLinks.filter((link) => pattern.test(link.label)).map((link) => link.url);
  const pdfUrls = urlsFor(/^(paper|pdf)$/i);
  const publicationUrls = urlsFor(/^link to publication$/i);
  const mediaUrls = urlsFor(/^media attached$/i);
  const artifactUrls = urlsFor(/artifact/i);
  const codeUrls = urlsFor(/^(code|source code|repository)$/i);
  const dataUrls = urlsFor(/^(data|dataset)$/i);
  const knownLink = (link) => /^(doi|pre-print|media attached|paper|pdf|link to publication|code|source code|repository|data|dataset)$/i.test(link.label) || /artifact/i.test(link.label) || /doi\.org\//i.test(link.url);
  const unclassifiedOfficialLinks = officialLinks.filter((link) => !knownLink(link));
  const sourceRecords = [
    {
      source_type: 'official_program',
      url: config.official_url,
      accessed_at: accessedAt,
      source_locator: `Accepted Papers / official event ${paper.official_event_id}`,
      supports: `direct_evidence: official ${config.official_track} inclusion, title, authors, and listed external links`,
      access_status: 'accessed',
    },
  ];
  if (paper.official_detail_url) sourceRecords.push({ source_type: 'official_detail', url: paper.official_detail_url, accessed_at: accessedAt, source_locator: `official event ${paper.official_event_id} / All Details`, supports: 'direct_evidence: official abstract and listed external links', access_status: 'accessed' });
  for (const link of officialLinks) sourceRecords.push({ source_type: 'official_program_link', url: link.url, accessed_at: accessedAt, source_locator: `official event ${paper.official_event_id} / ${link.label || 'unlabelled'} link`, supports: `direct_evidence: ${link.label || 'unlabelled'} target listed by official program`, access_status: 'not_fetched' });

  return {
    paper_id: `${config.venue_id}_${slugify(paper.title)}`,
    official_event_id: paper.official_event_id,
    title: paper.title,
    authors: paper.authors,
    venue: { venue_id: config.venue_id, conference: config.conference, year: config.year, official_track: config.official_track },
    publication: {
      doi: doi ? doi[1] : null,
      publisher_url: paper.doi_url,
      pdf_url: pdfUrls[0] || null,
      paper_url: publicationUrls[0] || null,
      preprint_url: paper.preprint_url,
      artifact_url: artifactUrls[0] || null,
      code_urls: codeUrls,
      data_urls: dataUrls,
      media_url: paper.media_url || mediaUrls[0] || null,
      officially_listed_links: officialLinks,
      unclassified_official_link_urls: unclassifiedOfficialLinks,
    },
    abstract: paper.abstract || null,
    abstract_status: paper.abstract ? 'verified_from_official_event_details' : (paper.detail_fetch_error || 'not_present_in_official_event_details; pending publisher, author, or preprint verification'),
    source_records: sourceRecords,
    corpus_status: {
      inclusion_status: 'included',
      decision_reason: `direct_evidence: listed under Accepted Papers with track label ${config.official_track} on the official ${config.display_name} page`,
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
      publication_link: paper.doi_url || pdfUrls.length || publicationUrls.length ? 'listed_by_official_program_not_fetched' : 'not_listed',
      preprint_or_paper_link: paper.preprint_url ? 'listed_by_official_program_not_fetched' : 'not_listed',
      artifact_code_data: artifactUrls.length || codeUrls.length || dataUrls.length
        ? 'listed_by_official_program_not_fetched'
        : (unclassifiedOfficialLinks.length || mediaUrls.length ? 'official_links_listed_by_program_not_classified' : 'not_listed'),
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

function coverageAudit(officialPapers, records) {
  const recordsByEvent = new Map(records.map((record) => [record.official_event_id, record]));
  const officialEventIds = new Set(officialPapers.map((paper) => paper.official_event_id));
  const missing_official_event_records = officialPapers
    .filter((paper) => !recordsByEvent.has(paper.official_event_id))
    .map((paper) => ({ official_event_id: paper.official_event_id, title: paper.title }));
  const local_records_not_in_official_baseline = records
    .filter((record) => !officialEventIds.has(record.official_event_id))
    .map((record) => ({ paper_id: record.paper_id, official_event_id: record.official_event_id, title: record.title }));
  const title_mismatches = [];
  const author_mismatches = [];
  const source_conflicts = [];
  const missing_official_links = [];

  for (const officialPaper of officialPapers) {
    const record = recordsByEvent.get(officialPaper.official_event_id);
    if (!record) continue;
    if (officialPaper.title !== record.title) title_mismatches.push({ paper_id: record.paper_id, official_value: officialPaper.title, local_value: record.title });
    if (JSON.stringify(officialPaper.authors) !== JSON.stringify(record.authors)) author_mismatches.push({ paper_id: record.paper_id, official_value: officialPaper.authors, local_value: record.authors });

    const officialLinks = officialPaper.official_links || [];
    const retainedLinks = record.publication.officially_listed_links || [];
    const missingLinks = officialLinks.filter((officialLink) => !retainedLinks.some((retainedLink) => retainedLink.label === officialLink.label && retainedLink.url === officialLink.url));
    if (missingLinks.length) missing_official_links.push({ paper_id: record.paper_id, links: missingLinks });

    const officialDoi = officialLinks.find((link) => link.label === 'DOI' || (link.label !== 'Pre-print' && /doi\.org\//i.test(link.url)));
    const officialPreprint = officialLinks.find((link) => link.label === 'Pre-print');
    if ((officialDoi?.url || null) !== (record.publication.publisher_url || null)) source_conflicts.push({ paper_id: record.paper_id, field: 'publisher_url', official_value: officialDoi?.url || null, local_value: record.publication.publisher_url || null });
    if ((officialPreprint?.url || null) !== (record.publication.preprint_url || null)) source_conflicts.push({ paper_id: record.paper_id, field: 'preprint_url', official_value: officialPreprint?.url || null, local_value: record.publication.preprint_url || null });
  }

  const duplicates = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
  return {
    method: 'direct_evidence: compare each official accepted-paper event record with the locally generated corpus record; compare titles, ordered author strings, official link labels, and official DOI/pre-print fields without fetching external targets.',
    missing_official_event_records,
    local_records_not_in_official_baseline,
    title_mismatches,
    author_mismatches,
    duplicate_local_paper_ids: duplicates(records.map((record) => record.paper_id)),
    duplicate_local_official_event_ids: duplicates(records.map((record) => record.official_event_id)),
    missing_official_links,
    source_conflicts,
  };
}

async function main() {
  const config = resolveVenueConfig(process.argv[2] || 'ICSE2026');
  const response = await fetch(config.official_url);
  if (!response.ok) throw new Error(`Official source fetch failed: ${response.status} ${response.statusText}`);
  const html = await response.text();
  const accepted = parseOfficialTrackPage(html, config.official_track);
  if (!accepted.length) throw new Error(`No ${config.official_track} papers parsed from the official source.`);
  const modalRequest = modalRequestFromPage(html);
  const detailed = [];
  for (let index = 0; index < accepted.length; index += 4) {
    const batch = accepted.slice(index, index + 4);
    const results = await Promise.all(batch.map(async (paper) => {
      try {
        return { ...paper, ...(await fetchOfficialEventDetails(paper, modalRequest, config)) };
      } catch (error) {
        return { ...paper, detail_fetch_error: `official_event_details_fetch_failed: ${error.message}` };
      }
    }));
    detailed.push(...results);
    process.stderr.write(`Fetched official details for ${Math.min(index + batch.length, accepted.length)}/${accepted.length} papers\n`);
  }
  const records = detailed.map((paper) => canonicalRecord(paper, config));
  const paperIds = new Set(records.map((record) => record.paper_id));
  if (paperIds.size !== records.length) throw new Error('Generated paper_id collision; manual resolution required.');
  const coverageValidation = coverageAudit(accepted, records);
  if (coverageValidation.missing_official_event_records.length || coverageValidation.local_records_not_in_official_baseline.length || coverageValidation.title_mismatches.length || coverageValidation.author_mismatches.length || coverageValidation.duplicate_local_official_event_ids.length) {
    throw new Error('Official-list coverage validation failed; inspect generated parsing inputs before writing corpus artifacts.');
  }

  const root = path.resolve(__dirname, '..');
  const corpusDir = path.join(root, 'corpus');
  await fs.mkdir(corpusDir, { recursive: true });
  await fs.writeFile(path.join(corpusDir, `${config.file_stem}.jsonl`), `${records.map((record) => JSON.stringify(record)).join('\n')}\n`);
  await fs.writeFile(path.join(corpusDir, `${config.file_stem}-official-baseline.json`), `${JSON.stringify({
    venue_id: config.venue_id,
    official_track: config.official_track,
    source: { url: config.official_url, accessed_at: ACCESSED_AT, source_locator: 'Accepted Papers tab', access_status: 'accessed_http_200' },
    accepted_paper_count: accepted.length,
    accepted_papers: detailed,
  }, null, 2)}\n`);
  const dedupAudit = duplicateAudit(records);
  await fs.writeFile(path.join(corpusDir, `${config.file_stem}-dedup-audit.json`), `${JSON.stringify(dedupAudit, null, 2)}\n`);

  const report = {
    venue_id: config.venue_id,
    scope: `${config.display_name} only`,
    claim_type: 'direct_evidence',
    source_locator: `${config.official_url} / Accepted Papers tab`,
    official_accepted_count: accepted.length,
    local_corpus_record_count: records.length,
    coverage: { numerator: records.length, denominator: accepted.length, percentage: (records.length / accepted.length) * 100 },
    coverage_validation: coverageValidation,
    fields: {
      title: records.filter((record) => record.title).length,
      authors: records.filter((record) => record.authors.length).length,
      official_source: records.filter((record) => record.source_records.length).length,
      official_detail_page: records.filter((record) => record.access_and_verification.official_detail === 'verified').length,
      doi_or_publisher_link: records.filter((record) => record.publication.publisher_url).length,
      paper_or_pdf_link: records.filter((record) => record.publication.paper_url || record.publication.pdf_url).length,
      preprint_link: records.filter((record) => record.publication.preprint_url).length,
      abstract: records.filter((record) => record.abstract).length,
      artifact_or_media_link: records.filter((record) => record.publication.artifact_url || record.publication.media_url).length,
      code_link: records.filter((record) => record.publication.code_urls.length).length,
      data_link: records.filter((record) => record.publication.data_urls.length).length,
      unclassified_official_link: records.filter((record) => record.publication.unclassified_official_link_urls.length).length,
    },
    unavailable_or_pending: {
      abstracts: records.filter((record) => !record.abstract).map((record) => record.paper_id),
      official_detail_fetch_failures: records.filter((record) => record.access_and_verification.official_detail !== 'verified').map((record) => ({ paper_id: record.paper_id, status: record.access_and_verification.official_detail })),
      papers: records.filter((record) => !record.publication.paper_url && !record.publication.pdf_url).map((record) => record.paper_id),
      artifacts_code_data: records.filter((record) => !record.publication.artifact_url && !record.publication.code_urls.length && !record.publication.data_urls.length).map((record) => record.paper_id),
      unclassified_official_links: records.filter((record) => record.publication.unclassified_official_link_urls.length).map((record) => ({ paper_id: record.paper_id, links: record.publication.unclassified_official_link_urls })),
      external_link_targets_not_fetched: records.flatMap((record) => record.source_records.filter((source) => source.access_status === 'not_fetched').map((source) => ({ paper_id: record.paper_id, url: source.url }))),
    },
    source_conflicts: coverageValidation.source_conflicts,
    deduplication: {
      audit_file: `corpus/${config.file_stem}-dedup-audit.json`,
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
  await fs.writeFile(path.join(root, 'reports', `${config.file_stem}-corpus-build-report.json`), `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ official_accepted_count: accepted.length, local_corpus_record_count: records.length, report: `reports/${config.file_stem}-corpus-build-report.json` })}\n`);
}

if (require.main === module) main().catch((error) => { console.error(error.stack || error); process.exitCode = 1; });

module.exports = { resolveVenueConfig, parseOfficialTrackPage, parseOfficialEventDetails, canonicalRecord, classifyPaperText, duplicateAudit, coverageAudit };
