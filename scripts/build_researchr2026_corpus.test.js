const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { parseOfficialTrackPage, parseOfficialEventDetails, classifyPaperText, duplicateAudit } = require('./build_researchr2026_corpus');
const corpusBuilder = require('./build_researchr2026_corpus');

test('exposes the shared builder through a conference-neutral entry point', () => {
  assert.equal(fs.existsSync(path.join(__dirname, 'build_researchr2026_corpus.js')), true);
});

test('parses Research Track rows and preserves official links', () => {
  const html = `
    <div id="event-overview">
      <tr class="hidable"><td><strong><a href="#" data-event-modal="event-1">Example Paper<span class="pull-right">badge</span></a></strong><div class="prog-track">Research Track</div><div class="performers"><a href="/profile/a">Ada Author</a>, <a href="/profile/b">Ben Author</a></div><a href="https://doi.org/10.1145/example" class="publication-link">DOI</a><a href="https://arxiv.org/abs/2601.00001" class="publication-link">Pre-print</a></td></tr>
      <tr class="hidable"><td><strong><a href="#" data-event-modal="event-2">Excluded Paper</a></strong><div class="prog-track">SE In Practice (SEIP)</div><div class="performers"><a href="/profile/c">Casey Author</a></div></td></tr>
    </div>
    <div id="Call-for-Papers"></div>`;

  assert.deepEqual(parseOfficialTrackPage(html), [
    {
      official_event_id: 'event-1',
      title: 'Example Paper',
      authors: ['Ada Author', 'Ben Author'],
      doi_url: 'https://doi.org/10.1145/example',
      preprint_url: 'https://arxiv.org/abs/2601.00001',
      official_links: [
        { label: 'DOI', url: 'https://doi.org/10.1145/example' },
        { label: 'Pre-print', url: 'https://arxiv.org/abs/2601.00001' },
      ],
    },
  ]);
});

test('uses an official abstract for provisional taxonomy assignment', () => {
  assert.equal(
    classifyPaperText('A Neutral Title', 'We generate regression tests and evaluate fuzzing effectiveness.'),
    'TESTING_VERIFICATION_DEBUGGING',
  );
});

test('classifies static program analysis from an official abstract', () => {
  assert.equal(
    classifyPaperText('No Shot in the Dark', 'Context-free language reachability is a framework for static program analyses.'),
    'PROGRAM_ANALYSIS_SECURITY_PRIVACY',
  );
});

test('audits title-author duplicates and co-listed formal and preprint versions', () => {
  const audit = duplicateAudit([
    { paper_id: 'P1', title: 'A Paper', authors: ['Ada Author'], publication: { doi: '10.1145/example', preprint_url: 'https://arxiv.org/abs/2601.00001' } },
    { paper_id: 'P2', title: 'A-Paper', authors: ['Ada Author'], publication: { doi: null, preprint_url: null } },
  ]);

  assert.deepEqual(audit.normalized_title_and_author_duplicates, [
    { key: 'a paper|ada author', paper_ids: ['P1', 'P2'] },
  ]);
  assert.deepEqual(audit.version_mapping.co_listed_formal_and_preprint, ['P1']);
});

test('parses an official event modal into an abstract and permanent detail URL', () => {
  const payload = JSON.stringify([
    {
      action: 'append',
      id: 'event-modals',
      value: '<div><div class="event-description"><p>First abstract paragraph.</p><p>Second abstract paragraph.</p><a href="https://doi.org/10.1145/example">DOI</a></div><a href="https://conf.researchr.org/details/icse-2026/icse-2026-research-track/1/Example-Paper"><span class="glyphicon glyphicon-new-window"></span> All Details</a></div>',
    },
  ]);

  assert.deepEqual(parseOfficialEventDetails(payload), {
    abstract: 'First abstract paragraph. Second abstract paragraph.',
    official_detail_url: 'https://conf.researchr.org/details/icse-2026/icse-2026-research-track/1/Example-Paper',
    doi_url: 'https://doi.org/10.1145/example',
    preprint_url: null,
    media_url: null,
  });
});

test('configures the shared builder for FSE 2026 Research Papers', () => {
  const fse = corpusBuilder.resolveVenueConfig?.('FSE2026');
  assert.equal(fse?.official_track, 'Research Papers');
  assert.equal(fse?.official_url, 'https://conf.researchr.org/track/fse-2026/fse-2026-research-papers');

  const html = `
    <div id="event-overview">
      <tr class="hidable"><td><strong><a href="#" data-event-modal="fse-event-1">Example FSE Paper</a></strong><div class="prog-track">Research Papers</div><div class="performers"><a href="/profile/a">Ada Author</a></div><a href="https://conf.researchr.org/details/fse-2026/fse-2026-research-papers/1/Example-FSE-Paper" class="publication-link">File Attached</a></td></tr>
      <tr class="hidable"><td><strong><a href="#" data-event-modal="fse-event-2">Excluded Paper</a></strong><div class="prog-track">Industry Papers</div><div class="performers"><a href="/profile/b">Ben Author</a></div></td></tr>
    </div>
    <div id="Call-for-Papers"></div>`;
  assert.deepEqual(parseOfficialTrackPage(html, fse?.official_track), [{
    official_event_id: 'fse-event-1',
    title: 'Example FSE Paper',
    authors: ['Ada Author'],
    doi_url: null,
    preprint_url: null,
    official_links: [{ label: 'File Attached', url: 'https://conf.researchr.org/details/fse-2026/fse-2026-research-papers/1/Example-FSE-Paper' }],
  }]);

  const record = corpusBuilder.canonicalRecord?.({
    official_event_id: 'fse-event-1',
    title: 'Example FSE Paper',
    authors: ['Ada Author'],
    doi_url: null,
    preprint_url: null,
    official_links: [{ label: 'File Attached', url: 'https://conf.researchr.org/details/fse-2026/fse-2026-research-papers/1/Example-FSE-Paper' }],
    abstract: 'An official abstract.',
    official_detail_url: 'https://conf.researchr.org/details/fse-2026/fse-2026-research-papers/1/Example-FSE-Paper',
  }, fse, '2026-07-24T00:00:00.000Z');
  assert.equal(record?.paper_id, 'FSE2026_example-fse-paper');
  assert.deepEqual(record?.venue, {
    venue_id: 'FSE2026',
    conference: 'FSE',
    year: 2026,
    official_track: 'Research Papers',
  });
  assert.equal(record?.source_records[0].url, fse?.official_url);
  assert.deepEqual(record?.publication.unclassified_official_link_urls, [
    { label: 'File Attached', url: 'https://conf.researchr.org/details/fse-2026/fse-2026-research-papers/1/Example-FSE-Paper' },
  ]);
  assert.match(record?.corpus_status.decision_reason || '', /Research Papers/);
});

test('configures the shared builder for ISSTA 2026 Research papers', () => {
  let issta;
  try {
    issta = corpusBuilder.resolveVenueConfig?.('ISSTA2026');
  } catch {
    issta = undefined;
  }
  assert.equal(issta?.official_track, 'Research papers');
  assert.equal(issta?.official_url, 'https://conf.researchr.org/track/issta-2026/issta-2026-research-papers');

  const html = `
    <div id="event-overview">
      <tr><td><a href="#" data-event-modal="issta-event-1">Included ISSTA Paper</a><div class="prog-track">Research papers</div><div class="performers"><a href="/profile/a">Ada Author</a></div></td></tr>
    </div>
    <div id="-Call-for-Papers">
      <tr><td><a href="#" data-event-modal="issta-event-2">Must Not Be Parsed</a><div class="prog-track">Research papers</div><div class="performers"><a href="/profile/b">Ben Author</a></div></td></tr>
    </div>`;
  assert.deepEqual(parseOfficialTrackPage(html, issta?.official_track), [{
    official_event_id: 'issta-event-1',
    title: 'Included ISSTA Paper',
    authors: ['Ada Author'],
    doi_url: null,
    preprint_url: null,
  }]);
});

test('retains only explicitly labelled paper, artifact, code, and data links', () => {
  const fse = corpusBuilder.resolveVenueConfig?.('FSE2026');
  const record = corpusBuilder.canonicalRecord?.({
    official_event_id: 'fse-event-2',
    title: 'Explicit Links',
    authors: ['Ada Author'],
    doi_url: null,
    preprint_url: null,
    abstract: null,
    official_links: [
      { label: 'Paper', url: 'https://example.test/paper.pdf' },
      { label: 'Link to publication', url: 'https://example.test/publication' },
      { label: 'Artifact', url: 'https://example.test/artifact' },
      { label: 'Code', url: 'https://example.test/code' },
      { label: 'Data', url: 'https://example.test/data' },
      { label: 'Media Attached', url: 'https://example.test/media' },
      { label: 'File Attached', url: 'https://example.test/unknown' },
    ],
  }, fse, '2026-07-24T00:00:00.000Z');

  assert.equal(record?.publication.pdf_url, 'https://example.test/paper.pdf');
  assert.equal(record?.publication.paper_url, 'https://example.test/publication');
  assert.equal(record?.publication.artifact_url, 'https://example.test/artifact');
  assert.deepEqual(record?.publication.code_urls, ['https://example.test/code']);
  assert.deepEqual(record?.publication.data_urls, ['https://example.test/data']);
  assert.equal(record?.publication.media_url, 'https://example.test/media');
  assert.deepEqual(record?.publication.unclassified_official_link_urls, [
    { label: 'File Attached', url: 'https://example.test/unknown' },
  ]);
});

test('does not classify a DOI-form preprint URL as a formal DOI', () => {
  const html = `
    <div id="event-overview">
      <tr class="hidable"><td><strong><a href="#" data-event-modal="event-1">Example Paper</a></strong><div class="prog-track">Research Papers</div><div class="performers"><a href="/profile/a">Ada Author</a></div><a href="https://doi.org/10.48550/arXiv.2604.16756" class="publication-link">Pre-print</a></td></tr>
    </div>
    <div id="Call-for-Papers"></div>`;

  assert.deepEqual(parseOfficialTrackPage(html, 'Research Papers'), [{
    official_event_id: 'event-1',
    title: 'Example Paper',
    authors: ['Ada Author'],
    doi_url: null,
    preprint_url: 'https://doi.org/10.48550/arXiv.2604.16756',
    official_links: [{ label: 'Pre-print', url: 'https://doi.org/10.48550/arXiv.2604.16756' }],
  }]);
});

test('audits official-list coverage and official-link field conflicts', () => {
  const audit = corpusBuilder.coverageAudit?.([
    {
      official_event_id: 'event-1',
      title: 'Official Title',
      authors: ['Ada Author'],
      official_links: [
        { label: 'DOI', url: 'https://doi.org/10.1145/official' },
        { label: 'Pre-print', url: 'https://example.test/preprint' },
      ],
    },
    { official_event_id: 'event-2', title: 'Missing Local', authors: ['Ben Author'], official_links: [] },
  ], [
    {
      paper_id: 'P1',
      official_event_id: 'event-1',
      title: 'Changed Title',
      authors: ['Casey Author'],
      publication: { publisher_url: 'https://doi.org/10.1145/different', preprint_url: null },
    },
    {
      paper_id: 'P3',
      official_event_id: 'event-3',
      title: 'Unexpected Local',
      authors: ['Dee Author'],
      publication: { publisher_url: null, preprint_url: null },
    },
  ]);

  assert.deepEqual(audit?.missing_official_event_records, [{ official_event_id: 'event-2', title: 'Missing Local' }]);
  assert.deepEqual(audit?.local_records_not_in_official_baseline, [{ paper_id: 'P3', official_event_id: 'event-3', title: 'Unexpected Local' }]);
  assert.equal(audit?.title_mismatches.length, 1);
  assert.equal(audit?.author_mismatches.length, 1);
  assert.deepEqual(audit?.source_conflicts, [
    { paper_id: 'P1', field: 'publisher_url', official_value: 'https://doi.org/10.1145/official', local_value: 'https://doi.org/10.1145/different' },
    { paper_id: 'P1', field: 'preprint_url', official_value: 'https://example.test/preprint', local_value: null },
  ]);
  assert.deepEqual(audit?.missing_official_links, [
    { paper_id: 'P1', links: [
      { label: 'DOI', url: 'https://doi.org/10.1145/official' },
      { label: 'Pre-print', url: 'https://example.test/preprint' },
    ] },
  ]);
});
