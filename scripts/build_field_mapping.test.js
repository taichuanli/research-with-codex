const assert = require('node:assert/strict');
const fs = require('node:fs');

function readJsonl(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
}

const input = readJsonl('corpus/cross-venue-research-paper-index.jsonl');
const assignments = readJsonl('synthesis/field-mapping-paper-assignments.jsonl');
const summary = JSON.parse(fs.readFileSync('synthesis/field-mapping-summary.json', 'utf8'));
const evidence = JSON.parse(fs.readFileSync('synthesis/field-mapping-evidence-index.json', 'utf8'));
const matrixLines = fs.readFileSync('synthesis/cross-venue-topic-matrix.csv', 'utf8').trim().split('\n');
const checkpoint = fs.readFileSync('state/checkpoint.yaml', 'utf8');

assert.equal(input.length, 988);
assert.equal(assignments.length, 988);
assert.deepEqual(assignments.map((record) => record.paper_id), input.map((record) => record.paper_id));
assert.equal(new Set(assignments.map((record) => record.paper_id)).size, 988);

const expectedVenueCounts = { ICSE2026: 321, FSE2026: 211, ISSTA2026: 210, ASE2025: 246 };
assert.deepEqual(summary.venue_record_counts, expectedVenueCounts);
for (const [venueId, expected] of Object.entries(expectedVenueCounts)) {
  assert.equal(assignments.filter((record) => record.venue.venue_id === venueId).length, expected);
}

const allowedPrimaryDomains = new Set([
  'TESTING_QUALITY_ASSURANCE',
  'DEBUGGING_FAULT_LOCALIZATION_REPAIR',
  'PROGRAM_ANALYSIS_FORMAL_METHODS',
  'SECURITY_PRIVACY_SAFETY',
  'CODE_INTELLIGENCE_GENERATION_TRANSFORMATION',
  'MAINTENANCE_EVOLUTION_QUALITY',
  'REQUIREMENTS_DESIGN_ARCHITECTURE',
  'BUILD_RELEASE_OPERATIONS_PERFORMANCE',
  'ML_ENABLED_SYSTEMS_ENGINEERING',
  'HUMAN_SOCIAL_EDUCATION',
  'EMPIRICAL_BENCHMARKS_REPRODUCIBILITY',
  'CROSS_CUTTING_OR_UNCERTAIN',
]);

for (const record of assignments) {
  assert.equal(record.phase, 'FIELD_MAPPING');
  assert.equal(record.evidence.claim_type, 'agent_inference');
  assert.match(record.evidence.source_locator, /official event .*event description abstract/);
  assert.ok(allowedPrimaryDomains.has(record.classification.primary_domain));
  for (const key of ['secondary_domains', 'subtopics', 'objects', 'methods', 'evaluation', 'resources', 'topic_clusters', 'uncertainty']) {
    assert.ok(Array.isArray(record.classification[key]), `${record.paper_id}: ${key} must be an array`);
  }
  for (const key of ['subtopics', 'objects', 'methods', 'evaluation', 'resources']) {
    assert.ok(record.classification[key].length > 0, `${record.paper_id}: ${key} must not be empty`);
  }
  assert.ok(['high', 'medium', 'low'].includes(record.classification.confidence));
}

assert.equal(Object.values(summary.primary_domain_counts).reduce((sum, counts) => sum + counts.total, 0), 988);
for (const [domain, counts] of Object.entries(summary.primary_domain_counts)) {
  assert.equal(counts.total, assignments.filter((record) => record.classification.primary_domain === domain).length);
}

const unresolved = assignments.filter((record) => record.classification.primary_domain === 'CROSS_CUTTING_OR_UNCERTAIN');
assert.deepEqual(unresolved.map((record) => record.paper_id), ['ICSE2026_boosting-gas-revenues-of-ethereum-miners']);

const expectedReconciliations = {
  'ASE2025_improving-nlsat-for-nonlinear-real-arithmetic': 'PROGRAM_ANALYSIS_FORMAL_METHODS',
  'ASE2025_programmers-visual-attention-on-function-call-graphs-during-code-summari': 'HUMAN_SOCIAL_EDUCATION',
  'ASE2025_relia-accelerating-analysis-of-cloud-access-control-policies': 'SECURITY_PRIVACY_SAFETY',
};
for (const [paperId, domain] of Object.entries(expectedReconciliations)) {
  const record = assignments.find((candidate) => candidate.paper_id === paperId);
  assert.ok(record, `${paperId} missing`);
  assert.equal(record.classification.primary_domain, domain);
}
assert.ok(assignments.every((record) => record.classification.primary_domain !== 'UNCLASSIFIED_TITLE_AND_ABSTRACT'));
assert.ok(assignments.every((record) => !record.classification.secondary_domains.includes('UNCLASSIFIED_TITLE_AND_ABSTRACT')));

assert.equal(evidence.papers.length, 49);
assert.equal(new Set(evidence.papers.map((paper) => paper.evidence_id)).size, 49);
assert.equal(new Set(evidence.papers.map((paper) => paper.paper_id)).size, 49);
for (const paper of evidence.papers) {
  assert.ok(assignments.some((record) => record.paper_id === paper.paper_id));
  assert.match(paper.source_locator, /official event .*event description abstract/);
}

assert.equal(matrixLines[0], 'matrix,row_id,ICSE2026_count,ICSE2026_percent,FSE2026_count,FSE2026_percent,ISSTA2026_count,ISSTA2026_percent,ASE2025_count,ASE2025_percent,total,total_percent');
assert.equal(matrixLines.filter((line) => line.startsWith('primary_domain,')).length, 12);
assert.ok(matrixLines.some((line) => line.startsWith('topic_cluster,AGENTIC_SOFTWARE_ENGINEERING,')));

assert.match(checkpoint, /^  - FIELD_MAPPED$/m);
assert.match(checkpoint, /^field_mapping:$/m);
assert.match(checkpoint, /FIELD_MAPPING: classified all 988 papers/);
assert.match(checkpoint, /^  human_decisions_pending: \[\]$/m);

console.log('FIELD_MAPPING verification passed: 988 assignments, 4 venue totals, 3 ASE reconciliations, 1 explicit unresolved primary domain, and 49 evidence records.');
