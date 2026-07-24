const test = require('node:test');
const assert = require('node:assert/strict');

const { parseOfficialTrackPage, parseOfficialEventDetails, classifyPaperText, duplicateAudit } = require('./build_icse2026_corpus');

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
