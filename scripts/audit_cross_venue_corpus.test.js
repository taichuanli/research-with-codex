const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const {
  auditDuplicateCandidates,
  buildAudit,
  buildMergedIndex,
  normalizeTitle,
} = require('./audit_cross_venue_corpus');

function record(overrides = {}) {
  return {
    paper_id: 'VENUE2026_example-paper',
    official_event_id: 'event-1',
    title: 'Example Paper',
    authors: ['Ada Author', 'Ben Author'],
    venue: {
      venue_id: 'VENUE2026',
      conference: 'VENUE',
      year: 2026,
      official_track: 'Research Papers',
    },
    publication: {
      doi: null,
      publisher_url: null,
      pdf_url: null,
      paper_url: null,
      preprint_url: null,
      artifact_url: null,
      code_urls: [],
      data_urls: [],
      media_url: null,
      officially_listed_links: [],
      unclassified_official_link_urls: [],
    },
    abstract: 'Official abstract.',
    abstract_status: 'verified_from_official_event_details',
    source_records: [
      {
        source_type: 'official_program',
        url: 'https://conference.example/track',
        accessed_at: '2026-07-24T00:00:00.000Z',
        source_locator: 'Accepted Papers / official event event-1',
        supports: 'direct_evidence: scope and metadata',
        access_status: 'accessed',
      },
      {
        source_type: 'official_detail',
        url: 'https://conference.example/details/event-1',
        accessed_at: '2026-07-24T00:00:00.000Z',
        source_locator: 'official event event-1 / All Details',
        supports: 'direct_evidence: abstract',
        access_status: 'accessed',
      },
    ],
    corpus_status: {
      inclusion_status: 'included',
      decision_reason: 'direct_evidence: listed in the official Research Papers track',
      taxonomy_categories: ['AI_FOR_SOFTWARE_ENGINEERING'],
      taxonomy_assignment: { claim_type: 'agent_inference' },
      duplicate_of: null,
    },
    access_and_verification: {
      official_listing: 'verified',
      authors: 'verified_from_official_listing',
      official_detail: 'verified',
      publication_link: 'not_listed',
      preprint_or_paper_link: 'not_listed',
      artifact_code_data: 'not_listed',
      abstract: 'verified_from_official_event_details',
    },
    notes: null,
    ...overrides,
  };
}

test('normalizes punctuation and casing in duplicate-title keys', () => {
  assert.equal(normalizeTitle('An Example: Paper!'), 'an example paper');
});

test('finds cross-venue title, DOI, and high-similarity-author candidates without calling them duplicates', () => {
  const first = record({
    paper_id: 'ICSE2026_example-paper',
    title: 'An Example: Paper',
    venue: { venue_id: 'ICSE2026', conference: 'ICSE', year: 2026, official_track: 'Research Track' },
    publication: { ...record().publication, doi: '10.1145/example' },
  });
  const second = record({
    paper_id: 'FSE2026_an-example-paper',
    title: 'An Example Paper',
    venue: { venue_id: 'FSE2026', conference: 'FSE', year: 2026, official_track: 'Research Papers' },
    publication: { ...record().publication, doi: '10.1145/example' },
  });

  const audit = auditDuplicateCandidates([first, second]);

  assert.deepEqual(audit.cross_venue_exact_normalized_title_candidates, [{
    key: 'an example paper',
    paper_ids: ['FSE2026_an-example-paper', 'ICSE2026_example-paper'],
  }]);
  assert.deepEqual(audit.cross_venue_shared_doi_candidates, [{
    key: '10.1145/example',
    paper_ids: ['FSE2026_an-example-paper', 'ICSE2026_example-paper'],
  }]);
  assert.equal(audit.cross_venue_high_similarity_author_candidates.length, 1);
  assert.equal(audit.cross_venue_high_similarity_author_candidates[0].interpretation, 'pending_review_not_a_duplicate_finding');
});

test('builds a merged row with venue, source, and JSONL location while preserving the local record identity', () => {
  const source = record({ paper_id: 'ICSE2026_example-paper' });
  const [merged] = buildMergedIndex([{
    record: source,
    corpus_path: 'corpus/icse2026-research-track.jsonl',
    jsonl_line: 7,
    official_baseline_path: 'corpus/icse2026-research-track-official-baseline.json',
  }]);

  assert.equal(merged.paper_id, 'ICSE2026_example-paper');
  assert.deepEqual(merged.local_record_locator, {
    corpus_path: 'corpus/icse2026-research-track.jsonl',
    jsonl_line: 7,
    official_baseline_path: 'corpus/icse2026-research-track-official-baseline.json',
    official_event_id: 'event-1',
  });
  assert.equal(merged.source_records.length, 2);
  assert.equal(merged.venue.official_track, 'Research Papers');
});

test('incorporates existing per-venue build and dedup audits into the cross-venue evidence', () => {
  const { report } = buildAudit(path.resolve(__dirname, '..'));
  const icse = report.per_venue.ICSE2026;

  assert.deepEqual(icse.build_report_count_mismatches, []);
  assert.equal(icse.existing_dedup_audit.exact_normalized_title_duplicates, 0);
  assert.equal(icse.existing_dedup_audit.doi_duplicates, 0);
});
