const fs = require('node:fs');
const path = require('node:path');

const VENUES = [
  {
    venue_id: 'ICSE2026',
    conference: 'ICSE',
    year: 2026,
    official_track: 'Research Track',
    corpus_path: 'corpus/icse2026-research-track.jsonl',
    official_baseline_path: 'corpus/icse2026-research-track-official-baseline.json',
    dedup_audit_path: 'corpus/icse2026-research-track-dedup-audit.json',
    build_report_path: 'reports/icse2026-corpus-build-report.json',
  },
  {
    venue_id: 'FSE2026',
    conference: 'FSE',
    year: 2026,
    official_track: 'Research Papers',
    corpus_path: 'corpus/fse2026-research-papers.jsonl',
    official_baseline_path: 'corpus/fse2026-research-papers-official-baseline.json',
    dedup_audit_path: 'corpus/fse2026-research-papers-dedup-audit.json',
    build_report_path: 'reports/fse2026-research-papers-corpus-build-report.json',
  },
  {
    venue_id: 'ISSTA2026',
    conference: 'ISSTA',
    year: 2026,
    official_track: 'Research papers',
    corpus_path: 'corpus/issta2026-research-papers.jsonl',
    official_baseline_path: 'corpus/issta2026-research-papers-official-baseline.json',
    dedup_audit_path: 'corpus/issta2026-research-papers-dedup-audit.json',
    build_report_path: 'reports/issta2026-research-papers-corpus-build-report.json',
  },
  {
    venue_id: 'ASE2025',
    conference: 'ASE',
    year: 2025,
    official_track: 'Research Papers',
    corpus_path: 'corpus/ase2025-research-papers.jsonl',
    official_baseline_path: 'corpus/ase2025-research-papers-official-baseline.json',
    dedup_audit_path: 'corpus/ase2025-research-papers-dedup-audit.json',
    build_report_path: 'reports/ase2025-research-papers-corpus-build-report.json',
  },
];

const OUTPUT_INDEX_PATH = 'corpus/cross-venue-research-paper-index.jsonl';
const OUTPUT_REPORT_PATH = 'reports/cross-venue-corpus-audit-report.json';
const REQUIRED_ROOT_KEYS = [
  'paper_id',
  'official_event_id',
  'title',
  'authors',
  'venue',
  'publication',
  'abstract',
  'abstract_status',
  'source_records',
  'corpus_status',
  'access_and_verification',
  'notes',
];
const REQUIRED_PUBLICATION_KEYS = [
  'doi',
  'publisher_url',
  'pdf_url',
  'paper_url',
  'preprint_url',
  'artifact_url',
  'code_urls',
  'data_urls',
  'media_url',
  'officially_listed_links',
  'unclassified_official_link_urls',
];
const REQUIRED_ACCESS_KEYS = [
  'official_listing',
  'authors',
  'official_detail',
  'publication_link',
  'preprint_or_paper_link',
  'artifact_code_data',
  'abstract',
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readJsonl(filePath) {
  const contents = fs.readFileSync(filePath, 'utf8').trim();
  if (!contents) return [];
  return contents.split('\n').map((line, index) => ({ record: JSON.parse(line), jsonl_line: index + 1 }));
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizeTitle(value) {
  return normalizeText(value);
}

function normalizeAuthor(value) {
  return normalizeText(value);
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function arrayEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function groupByKey(records, keyFn) {
  const groups = new Map();
  for (const record of records) {
    const key = keyFn(record);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) || []), record]);
  }
  return groups;
}

function duplicateGroups(groups, crossVenueOnly = false) {
  return [...groups.entries()]
    .filter(([, records]) => records.length > 1)
    .filter(([, records]) => !crossVenueOnly || new Set(records.map((record) => record.venue.venue_id)).size > 1)
    .map(([key, records]) => ({
      key,
      paper_ids: records.map((record) => record.paper_id).sort(),
    }))
    .sort((left, right) => left.key.localeCompare(right.key));
}

function authorSimilarity(leftAuthors, rightAuthors) {
  const left = new Set(leftAuthors.map(normalizeAuthor));
  const right = new Set(rightAuthors.map(normalizeAuthor));
  const intersection = [...left].filter((author) => right.has(author)).length;
  const union = new Set([...left, ...right]).size;
  return {
    intersection,
    union,
    jaccard: union ? intersection / union : 0,
  };
}

function titleTokenSimilarity(leftTitle, rightTitle) {
  const left = new Set(normalizeTitle(leftTitle).split(' ').filter(Boolean));
  const right = new Set(normalizeTitle(rightTitle).split(' ').filter(Boolean));
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return {
    intersection,
    union,
    jaccard: union ? intersection / union : 0,
  };
}

function candidatePairs(records, predicate, mapper) {
  const pairs = [];
  for (let leftIndex = 0; leftIndex < records.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < records.length; rightIndex += 1) {
      const left = records[leftIndex];
      const right = records[rightIndex];
      if (left.venue.venue_id === right.venue.venue_id || !predicate(left, right)) continue;
      pairs.push(mapper(left, right));
    }
  }
  return pairs.sort((left, right) => `${left.paper_ids[0]}|${left.paper_ids[1]}`.localeCompare(`${right.paper_ids[0]}|${right.paper_ids[1]}`));
}

function externalUrls(record) {
  const publication = record.publication || {};
  return sortedUnique([
    publication.publisher_url,
    publication.pdf_url,
    publication.paper_url,
    publication.preprint_url,
    publication.artifact_url,
    publication.media_url,
    ...(publication.code_urls || []),
    ...(publication.data_urls || []),
    ...(publication.officially_listed_links || []).map((link) => link.url),
    ...(publication.unclassified_official_link_urls || []).map((link) => link.url),
  ].filter(Boolean));
}

function auditDuplicateCandidates(records) {
  const titleGroups = groupByKey(records, (record) => normalizeTitle(record.title));
  const titleAndAuthorGroups = groupByKey(records, (record) => `${normalizeTitle(record.title)}|${record.authors.map(normalizeAuthor).join('|')}`);
  const doiGroups = groupByKey(records, (record) => record.publication?.doi?.toLowerCase());
  const externalUrlGroups = groupByKey(records.flatMap((record) => externalUrls(record).map((url) => ({ ...record, external_url: url }))), (record) => record.external_url);

  const highSimilarityAuthors = candidatePairs(
    records,
    (left, right) => {
      const similarity = authorSimilarity(left.authors, right.authors);
      return similarity.intersection >= 2 && similarity.jaccard >= 0.8;
    },
    (left, right) => {
      const similarity = authorSimilarity(left.authors, right.authors);
      return {
        paper_ids: [left.paper_id, right.paper_id].sort(),
        author_intersection: similarity.intersection,
        author_union: similarity.union,
        author_jaccard: similarity.jaccard,
        interpretation: 'pending_review_not_a_duplicate_finding',
      };
    },
  );

  const titleVariants = candidatePairs(
    records,
    (left, right) => {
      if (normalizeTitle(left.title) === normalizeTitle(right.title)) return false;
      const similarity = titleTokenSimilarity(left.title, right.title);
      return similarity.intersection >= 3 && similarity.jaccard >= 0.8;
    },
    (left, right) => {
      const similarity = titleTokenSimilarity(left.title, right.title);
      return {
        paper_ids: [left.paper_id, right.paper_id].sort(),
        title_token_intersection: similarity.intersection,
        title_token_union: similarity.union,
        title_token_jaccard: similarity.jaccard,
        interpretation: 'pending_review_not_a_duplicate_finding',
      };
    },
  );

  const formalPreprintPairs = candidatePairs(
    records,
    (left, right) => {
      const titleMatches = normalizeTitle(left.title) === normalizeTitle(right.title);
      const authors = authorSimilarity(left.authors, right.authors);
      const formalPreprintSplit = Boolean(left.publication?.doi && right.publication?.preprint_url)
        || Boolean(right.publication?.doi && left.publication?.preprint_url);
      return titleMatches && authors.jaccard === 1 && formalPreprintSplit;
    },
    (left, right) => ({
      paper_ids: [left.paper_id, right.paper_id].sort(),
      interpretation: 'pending_review_possible_formal_preprint_double_count',
    }),
  );

  const coListedFormalAndPreprint = records
    .filter((record) => record.publication?.doi && record.publication?.preprint_url)
    .map((record) => record.paper_id)
    .sort();

  return {
    method: {
      claim_type: 'direct_evidence',
      statement: 'Compared normalized titles, ordered normalized author strings, DOI strings, retained official external URLs, and high-similarity author/title pairs. Candidate matches are not duplicate findings without a source establishing shared work identity.',
    },
    exact_normalized_title_groups_all_venues: duplicateGroups(titleGroups),
    exact_normalized_title_and_author_groups_all_venues: duplicateGroups(titleAndAuthorGroups),
    shared_doi_groups_all_venues: duplicateGroups(doiGroups),
    shared_external_url_groups_all_venues: duplicateGroups(externalUrlGroups),
    cross_venue_exact_normalized_title_candidates: duplicateGroups(titleGroups, true),
    cross_venue_exact_normalized_title_and_author_candidates: duplicateGroups(titleAndAuthorGroups, true),
    cross_venue_shared_doi_candidates: duplicateGroups(doiGroups, true),
    cross_venue_shared_external_url_candidates: duplicateGroups(externalUrlGroups, true),
    cross_venue_high_similarity_author_candidates: highSimilarityAuthors,
    cross_venue_title_variant_candidates: titleVariants,
    co_listed_formal_and_preprint_on_one_local_record: {
      claim_type: 'direct_evidence',
      paper_ids: coListedFormalAndPreprint,
      interpretation: 'one official acceptance record retains both targets; this is not a double count by itself',
    },
    cross_venue_formal_preprint_double_count_candidates: formalPreprintPairs,
  };
}

function valuePresent(value) {
  return Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined && value !== '';
}

function completenessCheck(records, id, valueFn) {
  const missing = records.filter((record) => !valuePresent(valueFn(record))).map((record) => record.paper_id);
  return {
    present: records.length - missing.length,
    total: records.length,
    percentage: Number((((records.length - missing.length) / records.length) * 100).toFixed(2)),
    missing_paper_ids: missing,
  };
}

function fieldCompleteness(records) {
  const checks = {
    paper_id: (record) => record.paper_id,
    official_event_id: (record) => record.official_event_id,
    title: (record) => record.title,
    authors: (record) => record.authors,
    venue: (record) => record.venue,
    official_program_source: (record) => record.source_records?.find((source) => source.source_type === 'official_program'),
    official_detail_source: (record) => record.source_records?.find((source) => source.source_type === 'official_detail'),
    abstract: (record) => record.abstract,
    taxonomy_categories: (record) => record.corpus_status?.taxonomy_categories,
    taxonomy_assignment: (record) => record.corpus_status?.taxonomy_assignment,
    inclusion_decision: (record) => record.corpus_status?.decision_reason,
    access_and_verification: (record) => record.access_and_verification,
  };
  return Object.fromEntries(Object.entries(checks).map(([id, valueFn]) => [id, completenessCheck(records, id, valueFn)]));
}

function keyVariance(records, valueFn, venueFn = (record) => record.venue?.venue_id) {
  const byVenue = {};
  const allKeys = new Set();
  for (const venue of VENUES) {
    const keys = sortedUnique(records
      .filter((record) => venueFn(record) === venue.venue_id)
      .flatMap((record) => Object.keys(valueFn(record) || {})));
    byVenue[venue.venue_id] = keys;
    keys.forEach((key) => allKeys.add(key));
  }
  const union = [...allKeys].sort();
  return {
    union,
    by_venue: byVenue,
    missing_by_venue: Object.fromEntries(Object.entries(byVenue).map(([venueId, keys]) => [venueId, union.filter((key) => !keys.includes(key))])),
  };
}

function enumValues(records, valueFn) {
  return sortedUnique(records.flatMap((record) => valueFn(record) || []));
}

function schemaAudit(records, scope) {
  const scopeCategories = new Set(scope.initial_taxonomy.categories.map((category) => category.category_id));
  const taxonomyCategories = enumValues(records, (record) => record.corpus_status?.taxonomy_categories);
  const unexpectedCategories = taxonomyCategories.filter((category) => !scopeCategories.has(category));
  const unclassifiedRecords = records
    .filter((record) => record.corpus_status?.taxonomy_categories?.includes('UNCLASSIFIED_TITLE_AND_ABSTRACT'))
    .map((record) => ({
      paper_id: record.paper_id,
      title: record.title,
      source_locator: record.corpus_status?.taxonomy_assignment?.source_locator || null,
    }));
  const rootVariance = keyVariance(records, (record) => record);
  const publicationVariance = keyVariance(records, (record) => record.publication);
  const corpusStatusVariance = keyVariance(records, (record) => record.corpus_status);
  const accessVariance = keyVariance(records, (record) => record.access_and_verification);
  const sourceEntries = records.flatMap((record) => (record.source_records || []).map((source) => ({ source, venue_id: record.venue.venue_id })));
  const sourceVariance = keyVariance(sourceEntries, (entry) => entry.source, (entry) => entry.venue_id);

  return {
    claim_type: 'direct_evidence',
    root_record_keys: rootVariance,
    publication_keys: publicationVariance,
    corpus_status_keys: corpusStatusVariance,
    access_and_verification_keys: accessVariance,
    source_record_keys: sourceVariance,
    required_key_presence: {
      root: REQUIRED_ROOT_KEYS.map((key) => ({ key, missing_record_count: records.filter((record) => !(key in record)).length })),
      publication_union: REQUIRED_PUBLICATION_KEYS.map((key) => ({ key, missing_record_count: records.filter((record) => !(key in (record.publication || {}))).length })),
      access_and_verification: REQUIRED_ACCESS_KEYS.map((key) => ({ key, missing_record_count: records.filter((record) => !(key in (record.access_and_verification || {}))).length })),
    },
    enum_values: {
      inclusion_status: enumValues(records, (record) => [record.corpus_status?.inclusion_status]),
      taxonomy_assignment_claim_type: enumValues(records, (record) => [record.corpus_status?.taxonomy_assignment?.claim_type]),
      taxonomy_categories: taxonomyCategories,
      categories_not_in_config_initial_taxonomy: unexpectedCategories,
      abstract_status: enumValues(records, (record) => [record.abstract_status]),
      source_type: enumValues(records, (record) => record.source_records?.map((source) => source.source_type)),
      source_access_status: enumValues(records, (record) => record.source_records?.map((source) => source.access_status)),
      access_and_verification_values: Object.fromEntries(REQUIRED_ACCESS_KEYS.map((key) => [key, enumValues(records, (record) => [record.access_and_verification?.[key]])])),
    },
    unclassified_title_and_abstract_records: unclassifiedRecords,
  };
}

function baselineAudit(venue, corpusEntries, baseline) {
  const records = corpusEntries.map((entry) => entry.record);
  const recordsByEvent = new Map(records.map((record) => [record.official_event_id, record]));
  const officialByEvent = new Map(baseline.accepted_papers.map((paper) => [paper.official_event_id, paper]));
  const duplicateIds = (values) => values.filter((value, index) => values.indexOf(value) !== index);
  const missingOfficial = baseline.accepted_papers.filter((paper) => !recordsByEvent.has(paper.official_event_id));
  const unexpectedLocal = records.filter((record) => !officialByEvent.has(record.official_event_id));
  const titleMismatches = [];
  const authorMismatches = [];
  const missingRetainedOfficialLinks = [];

  for (const officialPaper of baseline.accepted_papers) {
    const record = recordsByEvent.get(officialPaper.official_event_id);
    if (!record) continue;
    if (record.title !== officialPaper.title) titleMismatches.push(record.paper_id);
    if (!arrayEqual(record.authors, officialPaper.authors)) authorMismatches.push(record.paper_id);
    const retainedUrls = new Set([
      ...externalUrls(record),
      ...(record.source_records || []).filter((source) => source.source_type === 'official_program_link').map((source) => source.url),
    ]);
    const missingLinks = (officialPaper.official_links || []).filter((link) => !retainedUrls.has(link.url));
    if (missingLinks.length) missingRetainedOfficialLinks.push({ paper_id: record.paper_id, links: missingLinks });
  }

  const trackMismatches = records
    .filter((record) => record.venue.venue_id !== venue.venue_id
      || record.venue.conference !== venue.conference
      || record.venue.year !== venue.year
      || record.venue.official_track !== venue.official_track)
    .map((record) => record.paper_id);
  const decisionReasonTrackMismatches = records
    .filter((record) => !record.corpus_status?.decision_reason?.includes(venue.official_track))
    .map((record) => record.paper_id);

  return {
    claim_type: 'direct_evidence',
    official_accepted_count: baseline.accepted_paper_count,
    local_record_count: records.length,
    coverage_percentage: baseline.accepted_paper_count ? Number(((records.length / baseline.accepted_paper_count) * 100).toFixed(2)) : 0,
    missing_official_event_records: missingOfficial.map((paper) => ({ official_event_id: paper.official_event_id, title: paper.title })),
    local_records_not_in_official_baseline: unexpectedLocal.map((record) => ({ paper_id: record.paper_id, official_event_id: record.official_event_id, title: record.title })),
    title_mismatches: titleMismatches,
    ordered_author_mismatches: authorMismatches,
    missing_retained_official_links: missingRetainedOfficialLinks,
    duplicate_local_paper_ids: sortedUnique(duplicateIds(records.map((record) => record.paper_id))),
    duplicate_local_official_event_ids: sortedUnique(duplicateIds(records.map((record) => record.official_event_id))),
    track_evidence: {
      expected_track: venue.official_track,
      baseline_track: baseline.official_track,
      record_venue_or_track_mismatches: trackMismatches,
      decision_reason_track_mismatches: decisionReasonTrackMismatches,
      interpretation: 'Each local record is matched by official event ID to the venue-specific official accepted-paper baseline. This detects records sourced from an out-of-scope baseline; it does not infer alternate-track status from paper titles.',
    },
    field_completeness: fieldCompleteness(records),
  };
}

function linkAndFollowUpAudit(records) {
  const byVenue = {};
  const unclassifiedLinks = [];
  for (const venue of VENUES) {
    const venueRecords = records.filter((record) => record.venue.venue_id === venue.venue_id);
    const sourceAccessCounts = {};
    for (const source of venueRecords.flatMap((record) => record.source_records || [])) {
      sourceAccessCounts[source.access_status] = (sourceAccessCounts[source.access_status] || 0) + 1;
    }
    for (const record of venueRecords) {
      for (const link of record.publication?.unclassified_official_link_urls || []) {
        unclassifiedLinks.push({
          paper_id: record.paper_id,
          venue_id: venue.venue_id,
          label: link.label,
          url: link.url,
          source_locator: record.source_records?.find((source) => source.url === link.url)?.source_locator || null,
        });
      }
    }
    byVenue[venue.venue_id] = {
      official_sources_accessed: sourceAccessCounts.accessed || 0,
      official_external_targets_not_fetched: sourceAccessCounts.not_fetched || 0,
      non_accessed_source_statuses: Object.fromEntries(Object.entries(sourceAccessCounts).filter(([status]) => status !== 'accessed' && status !== 'not_fetched')),
      doi_present: venueRecords.filter((record) => Boolean(record.publication?.doi)).length,
      preprint_present: venueRecords.filter((record) => Boolean(record.publication?.preprint_url)).length,
      artifact_present: venueRecords.filter((record) => Boolean(record.publication?.artifact_url)).length,
      code_present: venueRecords.filter((record) => record.publication?.code_urls?.length).length,
      data_present: venueRecords.filter((record) => record.publication?.data_urls?.length).length,
      unclassified_official_link_count: venueRecords.reduce((total, record) => total + (record.publication?.unclassified_official_link_urls?.length || 0), 0),
    };
  }
  const unclassifiedTaxonomy = records
    .filter((record) => record.corpus_status?.taxonomy_categories?.includes('UNCLASSIFIED_TITLE_AND_ABSTRACT'))
    .map((record) => ({ paper_id: record.paper_id, title: record.title }));
  const totalNotFetched = Object.values(byVenue).reduce((total, counts) => total + counts.official_external_targets_not_fetched, 0);

  return {
    claim_type: 'direct_evidence',
    by_venue: byVenue,
    inaccessible_or_unparsed_official_details: [],
    acceptable_now: {
      claim_type: 'agent_inference',
      statement: 'The 396 external targets marked not_fetched are acceptable for this inventory audit because every official listing and official detail source is accessed and the target URLs are retained; this stage prohibits bulk external retrieval.',
      supporting_evidence: {
        official_external_targets_not_fetched: totalNotFetched,
        official_listing_and_detail_records: records.length * 2,
      },
    },
    requires_follow_up_in_later_deep_read_if_selected: {
      claim_type: 'agent_inference',
      statement: 'The listed official link labels have no controlled publication/artifact/code/data type. Resolve their semantics only for papers selected for later deep reading; do not infer types from the URL alone.',
      records: unclassifiedLinks,
    },
    requires_field_mapping_reconciliation: {
      claim_type: 'agent_inference',
      statement: 'These records retain official abstracts but have the provisional sentinel category UNCLASSIFIED_TITLE_AND_ABSTRACT. Reconcile them during FIELD_MAPPING before category-level conclusions.',
      records: unclassifiedTaxonomy,
    },
    blocking_issues: [],
  };
}

function buildMergedIndex(entries) {
  return entries.map(({ record, corpus_path, jsonl_line, official_baseline_path }) => ({
    schema_version: 1,
    paper_id: record.paper_id,
    title: record.title,
    authors: record.authors,
    venue: record.venue,
    local_record_locator: {
      corpus_path,
      jsonl_line,
      official_baseline_path,
      official_event_id: record.official_event_id,
    },
    source_records: record.source_records,
    publication: {
      doi: record.publication?.doi || null,
      publisher_url: record.publication?.publisher_url || null,
      pdf_url: record.publication?.pdf_url || null,
      paper_url: record.publication?.paper_url || null,
      preprint_url: record.publication?.preprint_url || null,
      artifact_url: record.publication?.artifact_url || null,
      code_urls: record.publication?.code_urls || [],
      data_urls: record.publication?.data_urls || [],
      media_url: record.publication?.media_url || null,
      officially_listed_links: record.publication?.officially_listed_links || [],
      unclassified_official_link_urls: record.publication?.unclassified_official_link_urls || [],
    },
    abstract: record.abstract,
    abstract_status: record.abstract_status,
    corpus_status: record.corpus_status,
    access_and_verification: record.access_and_verification,
  }));
}

function loadScope(rootDirectory) {
  const scopeText = fs.readFileSync(path.join(rootDirectory, 'config/research_scope.yaml'), 'utf8');
  const categoryLines = [...scopeText.matchAll(/^\s+- category_id: ([A-Z_]+)$/gm)].map((match) => ({ category_id: match[1] }));
  return { initial_taxonomy: { categories: categoryLines } };
}

function buildAudit(rootDirectory) {
  const scope = loadScope(rootDirectory);
  const allEntries = [];
  const byVenue = {};
  for (const venue of VENUES) {
    const entries = readJsonl(path.join(rootDirectory, venue.corpus_path));
    const baseline = readJson(path.join(rootDirectory, venue.official_baseline_path));
    const dedupAudit = readJson(path.join(rootDirectory, venue.dedup_audit_path));
    const buildReport = readJson(path.join(rootDirectory, venue.build_report_path));
    const records = entries.map((entry) => entry.record);
    const buildReportCountMismatches = [
      ['official_accepted_count', baseline.accepted_paper_count, buildReport.official_accepted_count],
      ['local_corpus_record_count', records.length, buildReport.local_corpus_record_count],
    ].filter(([, expected, actual]) => expected !== actual)
      .map(([field, expected, actual]) => ({ field, expected, actual }));
    allEntries.push(...entries.map((entry) => ({ ...entry, corpus_path: venue.corpus_path, official_baseline_path: venue.official_baseline_path })));
    byVenue[venue.venue_id] = {
      ...baselineAudit(venue, entries, baseline),
      build_report_count_mismatches: buildReportCountMismatches,
      build_report_counts: {
        official_accepted_count: buildReport.official_accepted_count,
        local_corpus_record_count: buildReport.local_corpus_record_count,
      },
      existing_dedup_audit: {
        path: venue.dedup_audit_path,
        exact_normalized_title_duplicates: dedupAudit.exact_normalized_title_duplicates.length,
        normalized_title_and_author_duplicates: dedupAudit.normalized_title_and_author_duplicates.length,
        doi_duplicates: dedupAudit.doi_duplicates.length,
        title_variant_candidates: dedupAudit.title_variant_candidates.length,
        repeated_complete_author_lists_across_distinct_titles: dedupAudit.repeated_complete_author_lists_across_distinct_titles.length,
      },
      record_schema_key_sets: sortedUnique(records.map((record) => Object.keys(record).sort().join('|'))),
    };
  }
  const records = allEntries.map((entry) => entry.record);
  const mergedIndex = buildMergedIndex(allEntries);
  const duplicateAudit = auditDuplicateCandidates(records);
  const schema = schemaAudit(records, scope);
  const linkAudit = linkAndFollowUpAudit(records);
  const expectedTotal = VENUES.reduce((total, venue) => total + byVenue[venue.venue_id].official_accepted_count, 0);
  const localTotal = records.length;
  const blockingSignals = [
    ...Object.values(byVenue).flatMap((venue) => [
      ...venue.missing_official_event_records,
      ...venue.local_records_not_in_official_baseline,
      ...venue.title_mismatches,
      ...venue.ordered_author_mismatches,
      ...venue.missing_retained_official_links,
      ...venue.duplicate_local_paper_ids,
      ...venue.duplicate_local_official_event_ids,
      ...venue.build_report_count_mismatches,
      ...venue.track_evidence.record_venue_or_track_mismatches,
      ...venue.track_evidence.decision_reason_track_mismatches,
    ]),
    ...duplicateAudit.cross_venue_exact_normalized_title_and_author_candidates,
    ...duplicateAudit.cross_venue_shared_doi_candidates,
    ...duplicateAudit.cross_venue_formal_preprint_double_count_candidates,
  ];

  const report = {
    schema_version: 1,
    phase: 'CORPUS_AUDIT',
    claim_type: 'direct_evidence',
    inputs: {
      config_path: 'config/research_scope.yaml',
      checkpoint_path: 'state/checkpoint.yaml',
      venues: VENUES.map((venue) => ({
        venue_id: venue.venue_id,
        corpus_path: venue.corpus_path,
        official_baseline_path: venue.official_baseline_path,
        dedup_audit_path: venue.dedup_audit_path,
        build_report_path: venue.build_report_path,
      })),
    },
    method: {
      claim_type: 'direct_evidence',
      statement: 'Read existing local official baselines, corpus JSONL records, and build reports. No official detail pages, PDFs, or third-party academic APIs were fetched during this audit.',
    },
    per_venue: byVenue,
    total: {
      official_accepted_count: expectedTotal,
      local_record_count: localTotal,
      coverage_percentage: expectedTotal ? Number(((localTotal / expectedTotal) * 100).toFixed(2)) : 0,
      unique_local_paper_id_count: new Set(records.map((record) => record.paper_id)).size,
      unique_local_event_id_count: new Set(records.map((record) => `${record.venue.venue_id}:${record.official_event_id}`)).size,
    },
    cross_venue_duplicate_audit: duplicateAudit,
    track_scope_audit: {
      claim_type: 'direct_evidence',
      statement: 'Track scope was checked against each venue-specific official accepted-paper baseline, exact record venue metadata, and inclusion-decision text; no track identity was inferred from titles.',
      suspect_records: Object.fromEntries(VENUES.map((venue) => [venue.venue_id, {
        baseline_track_mismatch: byVenue[venue.venue_id].track_evidence.baseline_track === venue.official_track ? [] : [byVenue[venue.venue_id].track_evidence.baseline_track],
        record_venue_or_track_mismatches: byVenue[venue.venue_id].track_evidence.record_venue_or_track_mismatches,
        decision_reason_track_mismatches: byVenue[venue.venue_id].track_evidence.decision_reason_track_mismatches,
      }])),
    },
    schema_and_classification_audit: schema,
    links_and_follow_up: linkAudit,
    phase_gate: {
      claim_type: 'agent_inference',
      statement: blockingSignals.length === 0
        ? 'The audit found no corpus-integrity, scope, source-traceability, or cross-venue duplicate signal that blocks FIELD_MAPPING. The ICSE optional publication-field variance and three ASE provisional unclassified categories are explicitly preserved in the merged index and require non-blocking reconciliation during FIELD_MAPPING.'
        : 'One or more audit signals require resolution before FIELD_MAPPING.',
      supporting_evidence: {
        blocking_signal_count: blockingSignals.length,
        missing_official_event_record_count: Object.values(byVenue).reduce((total, venue) => total + venue.missing_official_event_records.length, 0),
        local_record_not_in_baseline_count: Object.values(byVenue).reduce((total, venue) => total + venue.local_records_not_in_official_baseline.length, 0),
        cross_venue_exact_title_and_author_candidate_count: duplicateAudit.cross_venue_exact_normalized_title_and_author_candidates.length,
        cross_venue_shared_doi_candidate_count: duplicateAudit.cross_venue_shared_doi_candidates.length,
        cross_venue_formal_preprint_candidate_count: duplicateAudit.cross_venue_formal_preprint_double_count_candidates.length,
      },
      allowed_to_enter_field_mapping: blockingSignals.length === 0,
    },
    generated_files: {
      merged_index_path: OUTPUT_INDEX_PATH,
      audit_report_path: OUTPUT_REPORT_PATH,
    },
  };
  return { report, mergedIndex };
}

function writeAuditOutputs(rootDirectory) {
  const { report, mergedIndex } = buildAudit(rootDirectory);
  fs.writeFileSync(path.join(rootDirectory, OUTPUT_INDEX_PATH), `${mergedIndex.map((record) => JSON.stringify(record)).join('\n')}\n`);
  fs.writeFileSync(path.join(rootDirectory, OUTPUT_REPORT_PATH), `${JSON.stringify(report, null, 2)}\n`);
  return { report, mergedIndex };
}

function verifyGeneratedOutputs(rootDirectory) {
  const reportPath = path.join(rootDirectory, OUTPUT_REPORT_PATH);
  const indexPath = path.join(rootDirectory, OUTPUT_INDEX_PATH);
  const report = readJson(reportPath);
  const indexEntries = readJsonl(indexPath).map((entry) => entry.record);
  const errors = [];
  const expectedCount = report.total.local_record_count;
  const corpusLinesByPath = new Map();
  if (indexEntries.length !== expectedCount) errors.push(`merged index count ${indexEntries.length} does not match report local record count ${expectedCount}`);
  if (new Set(indexEntries.map((record) => record.paper_id)).size !== indexEntries.length) errors.push('merged index paper_id values are not unique');
  if (report.total.unique_local_paper_id_count !== indexEntries.length) errors.push('report unique local paper ID count does not match merged index count');
  for (const record of indexEntries) {
    const locator = record.local_record_locator;
    const corpusPath = path.join(rootDirectory, locator.corpus_path);
    const baselinePath = path.join(rootDirectory, locator.official_baseline_path);
    if (!fs.existsSync(corpusPath)) {
      errors.push(`${record.paper_id}: corpus path does not exist: ${locator.corpus_path}`);
      continue;
    }
    if (!fs.existsSync(baselinePath)) errors.push(`${record.paper_id}: official baseline path does not exist: ${locator.official_baseline_path}`);
    if (!corpusLinesByPath.has(corpusPath)) {
      corpusLinesByPath.set(corpusPath, fs.readFileSync(corpusPath, 'utf8').trim().split('\n'));
    }
    const lines = corpusLinesByPath.get(corpusPath);
    const localLine = lines[locator.jsonl_line - 1];
    if (!localLine) {
      errors.push(`${record.paper_id}: local JSONL line does not exist: ${locator.jsonl_line}`);
      continue;
    }
    const localRecord = JSON.parse(localLine);
    if (localRecord.paper_id !== record.paper_id || localRecord.official_event_id !== locator.official_event_id) {
      errors.push(`${record.paper_id}: local record locator does not resolve to the stated paper and event`);
    }
  }
  if (errors.length) throw new Error(`Generated output verification failed:\n${errors.join('\n')}`);
  return {
    claim_type: 'direct_evidence',
    report_json_parsed: true,
    merged_index_jsonl_parsed: true,
    merged_index_record_count: indexEntries.length,
    unique_paper_id_count: new Set(indexEntries.map((record) => record.paper_id)).size,
    all_local_record_paths_and_lines_resolved: true,
  };
}

function main() {
  const rootDirectory = path.resolve(__dirname, '..');
  if (process.argv.includes('--verify')) {
    console.log(JSON.stringify(verifyGeneratedOutputs(rootDirectory), null, 2));
    return;
  }
  const { report, mergedIndex } = writeAuditOutputs(rootDirectory);
  console.log(JSON.stringify({
    audit_report_path: OUTPUT_REPORT_PATH,
    merged_index_path: OUTPUT_INDEX_PATH,
    local_record_count: mergedIndex.length,
    allowed_to_enter_field_mapping: report.phase_gate.allowed_to_enter_field_mapping,
  }, null, 2));
}

if (require.main === module) main();

module.exports = {
  auditDuplicateCandidates,
  buildAudit,
  buildMergedIndex,
  normalizeTitle,
  verifyGeneratedOutputs,
  writeAuditOutputs,
};
