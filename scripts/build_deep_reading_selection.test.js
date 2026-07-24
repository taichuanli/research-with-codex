const assert = require('node:assert/strict');
const fs = require('node:fs');

function readJsonl(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
}

const corpus = readJsonl('corpus/cross-venue-research-paper-index.jsonl');
const assignments = readJsonl('synthesis/field-mapping-paper-assignments.jsonl');
const selection = JSON.parse(fs.readFileSync('synthesis/deep-reading-selection.json', 'utf8'));
const report = fs.readFileSync('reports/deep-reading-selection-report.md', 'utf8');
const checkpoint = fs.readFileSync('state/checkpoint.yaml', 'utf8');
const config = fs.readFileSync('config/research_scope.yaml', 'utf8');

const corpusById = new Map(corpus.map((paper) => [paper.paper_id, paper]));
const assignmentById = new Map(assignments.map((paper) => [paper.paper_id, paper]));
const allowedClaimTypes = new Set(['author_claim', 'direct_evidence', 'agent_inference']);
const allowedFullTextStatuses = new Set([
  'OPEN_FULL_TEXT_CONFIRMED',
  'PUBLISHER_RECORD_ONLY',
  'NOT_LOCATED_AFTER_TARGETED_SEARCH',
]);
const requiredCoverageRoles = new Set([
  'EMPIRICAL_STUDY',
  'METHOD_WORK',
  'TRAINING_WORK',
  'COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE',
]);

assert.equal(selection.schema_version, 1);
assert.equal(selection.phase, 'DEEP_READING_SELECTION');
assert.equal(selection.status, 'DEEP_READING_SELECTED');
assert.equal(selection.input.record_count, 988);
assert.equal(corpus.length, 988);
assert.equal(assignments.length, 988);
assert.equal(selection.selected_papers.length, 42);
assert.ok(selection.selected_papers.length >= 36 && selection.selected_papers.length <= 45);
assert.equal(new Set(selection.selected_papers.map((paper) => paper.paper_id)).size, 42);

const mechanismIds = Object.keys(selection.mechanism_clusters);
assert.equal(mechanismIds.length, 7);
for (const mechanismId of mechanismIds) {
  assert.equal(selection.mechanism_clusters[mechanismId].primary_selected_count, 6, mechanismId);
}

const batchCounts = { DEEP_READING_BATCH_1: 0, DEEP_READING_BATCH_2: 0 };
const perBatchMechanismCounts = Object.fromEntries(Object.keys(batchCounts).map((batch) => [
  batch,
  Object.fromEntries(mechanismIds.map((mechanism) => [mechanism, 0])),
]));
const authorPaperCounts = new Map();
const benchmarkFamilyCounts = new Map();

for (const paper of selection.selected_papers) {
  const corpusPaper = corpusById.get(paper.paper_id);
  assert.ok(corpusPaper, `${paper.paper_id}: missing from corpus`);
  assert.ok(assignmentById.has(paper.paper_id), `${paper.paper_id}: missing field mapping`);
  assert.equal(paper.title, corpusPaper.title);
  assert.equal(paper.venue_id, corpusPaper.venue.venue_id);
  assert.ok(mechanismIds.includes(paper.primary_mechanism_cluster));
  assert.ok(Array.isArray(paper.secondary_mechanism_clusters));
  assert.ok(batchCounts[paper.reading_batch] !== undefined);
  batchCounts[paper.reading_batch] += 1;
  perBatchMechanismCounts[paper.reading_batch][paper.primary_mechanism_cluster] += 1;

  for (const key of ['selection_reason', 'main_mechanism', 'topic_role']) {
    assert.ok(paper[key] && paper[key].statement, `${paper.paper_id}: missing ${key}`);
    assert.ok(allowedClaimTypes.has(paper[key].claim_type), `${paper.paper_id}: invalid ${key} claim type`);
    assert.ok(paper[key].source_locator, `${paper.paper_id}: missing ${key} locator`);
  }
  assert.ok(Array.isArray(paper.deep_read_questions) && paper.deep_read_questions.length >= 3);
  assert.ok(paper.deep_read_questions.every((question) => question.endsWith('?')));
  assert.ok(Array.isArray(paper.coverage_roles) && paper.coverage_roles.length > 0);
  assert.ok(paper.coverage_roles.every((role) => requiredCoverageRoles.has(role)));
  assert.ok(Array.isArray(paper.evaluation_families) && paper.evaluation_families.length > 0);
  assert.ok(allowedFullTextStatuses.has(paper.full_text.status));
  assert.ok(allowedClaimTypes.has(paper.full_text.claim_type));
  assert.ok(paper.full_text.checked_at);
  if (paper.full_text.status === 'OPEN_FULL_TEXT_CONFIRMED') assert.ok(paper.full_text.url);
  if (paper.reading_batch === 'DEEP_READING_BATCH_1') {
    assert.equal(paper.full_text.status, 'OPEN_FULL_TEXT_CONFIRMED', `${paper.paper_id}: batch 1 full text`);
  }
  assert.ok(['SUFFICIENT_FROM_TITLE_AND_ABSTRACT', 'SUFFICIENT_AFTER_TARGETED_METADATA_CHECK'].includes(paper.selection_basis.status));
  assert.equal(paper.selection_basis.claim_type, 'agent_inference');

  for (const author of corpusPaper.authors) {
    authorPaperCounts.set(author, (authorPaperCounts.get(author) || 0) + 1);
  }
  for (const family of paper.evaluation_families.filter((name) => name !== 'NOT_STATED_IN_ABSTRACT')) {
    benchmarkFamilyCounts.set(family, (benchmarkFamilyCounts.get(family) || 0) + 1);
  }
}

assert.deepEqual(batchCounts, { DEEP_READING_BATCH_1: 21, DEEP_READING_BATCH_2: 21 });
for (const batch of Object.keys(batchCounts)) {
  for (const mechanism of mechanismIds) {
    assert.equal(perBatchMechanismCounts[batch][mechanism], 3, `${batch}/${mechanism}`);
  }
}
assert.ok(Math.max(...authorPaperCounts.values()) <= 2, 'No author may dominate more than two selected papers');
assert.ok((benchmarkFamilyCounts.get('SWE_BENCH_FAMILY') || 0) <= 14, 'SWE-bench family must not dominate the selection');

const computedRoleCounts = Object.fromEntries([...requiredCoverageRoles].map((role) => [
  role,
  selection.selected_papers.filter((paper) => paper.coverage_roles.includes(role)).length,
]));
assert.deepEqual(selection.summary.coverage_role_counts, computedRoleCounts);
assert.ok(computedRoleCounts.EMPIRICAL_STUDY >= 12);
assert.ok(computedRoleCounts.METHOD_WORK >= 28);
assert.ok(computedRoleCounts.TRAINING_WORK >= 7);
assert.ok(computedRoleCounts.COUNTEREXAMPLE_OR_CONTRADICTORY_EVIDENCE >= 7);

assert.ok(selection.important_exclusions.length >= 15);
assert.equal(new Set(selection.important_exclusions.map((paper) => paper.paper_id)).size, selection.important_exclusions.length);
for (const exclusion of selection.important_exclusions) {
  assert.ok(corpusById.has(exclusion.paper_id), `${exclusion.paper_id}: excluded paper missing from corpus`);
  assert.equal(exclusion.reason.claim_type, 'agent_inference');
  assert.ok(exclusion.reason.statement);
  assert.ok(exclusion.reason.source_locator);
  assert.ok(exclusion.exclusion_category);
  assert.ok(!selection.selected_papers.some((paper) => paper.paper_id === exclusion.paper_id));
}

assert.equal(selection.human_decisions_pending.length, 0);
assert.match(report, /# Deep-Reading Selection Report/);
assert.match(report, /No full-paper deep reading, research-idea generation, or direction confirmation was performed/);
assert.match(checkpoint, /^  - DEEP_READING_SELECTED$/m);
assert.match(checkpoint, /^deep_reading_selection:$/m);
assert.match(checkpoint, /^  selected_count: 42$/m);
assert.match(checkpoint, /^  human_decisions_pending: \[\]$/m);
assert.match(config, /^deep_reading_selection:$/m);
assert.match(config, /^  status: selected$/m);
assert.match(config, /^  selected_count: 42$/m);

console.log('DEEP_READING_SELECTION verification passed: 42 papers, seven 6-paper mechanism clusters, two balanced 21-paper batches, and a complete exclusion ledger.');
