// Maintainer acceptance tests; do not provide these to the forward evaluator.
// Point LUDI_UI_EVAL_TARGET at a candidate controller.mjs in an isolated copy.
import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

if (!process.env.LUDI_UI_EVAL_TARGET) throw new Error('Set LUDI_UI_EVAL_TARGET to the candidate controller.mjs');
const { createReportController } = await import(pathToFileURL(path.resolve(process.env.LUDI_UI_EVAL_TARGET)));
const row = id => [{ id, name: id }];
function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const settle = async action => { try { return await action(); } catch { return undefined; } };

test('draft edits publish state without requesting data', () => {
  const calls = [];
  const updates = [];
  const controller = createReportController({ query: parameters => { calls.push(parameters); return Promise.resolve([]); }, exportRows: async () => {} }, state => updates.push(state));
  controller.setDraft('active');
  controller.setDraft('disabled');
  assert.equal(calls.length, 0);
  assert.equal(controller.getState().draft, 'disabled');
  assert.equal(updates.at(-1).draft, 'disabled');
});

test('Apply captures criteria independently of later draft edits', async () => {
  const response = deferred();
  const calls = [];
  const controller = createReportController({ query: parameters => { calls.push(parameters); return response.promise; }, exportRows: async () => {} });
  controller.setDraft('active');
  const pending = controller.apply();
  controller.setDraft('disabled');
  response.resolve(row('active-result'));
  await pending;
  assert.deepEqual(calls, [{ status: 'active' }]);
  assert.equal(controller.getState().applied, 'active');
  assert.equal(controller.getState().draft, 'disabled');
  assert.deepEqual(controller.getState().rows, row('active-result'));
});

test('older successful responses cannot replace newer successful results', async () => {
  const responses = [deferred(), deferred()];
  let index = 0;
  const controller = createReportController({ query: () => responses[index++].promise, exportRows: async () => {} });
  controller.setDraft('active');
  const older = controller.apply();
  controller.setDraft('disabled');
  const newer = controller.apply();
  responses[1].resolve(row('newer'));
  await newer;
  responses[0].resolve(row('older'));
  await older;
  assert.deepEqual(controller.getState().rows, row('newer'));
  assert.equal(controller.getState().applied, 'disabled');
  assert.equal(controller.getState().status, 'success');
});

test('an older response cannot erase a newer query failure', async () => {
  const responses = [deferred(), deferred()];
  let index = 0;
  const controller = createReportController({ query: () => responses[index++].promise, exportRows: async () => {} });
  controller.setDraft('active');
  const older = controller.apply();
  controller.setDraft('disabled');
  const newer = settle(() => controller.apply());
  responses[1].reject(new Error('query unavailable'));
  await newer;
  responses[0].resolve(row('older'));
  await older;
  assert.equal(controller.getState().status, 'error');
  assert.ok(controller.getState().error);
});

test('export uses successful displayed criteria rather than edited draft criteria', async () => {
  const exports = [];
  const controller = createReportController({ query: async () => row('active'), exportRows: async parameters => { exports.push(parameters); } });
  controller.setDraft('active');
  await controller.apply();
  controller.setDraft('disabled');
  await controller.exportVisible();
  assert.deepEqual(exports, [{ status: 'active' }]);
});

test('idle, loading, and query-error states make no export request', async () => {
  const response = deferred();
  let exports = 0;
  const controller = createReportController({ query: () => response.promise, exportRows: async () => { exports++; } });
  await settle(() => controller.exportVisible());
  const pending = settle(() => controller.apply());
  await settle(() => controller.exportVisible());
  response.reject(new Error('failed'));
  await pending;
  await settle(() => controller.exportVisible());
  assert.equal(exports, 0);
});

test('query failure retains a recoverable error and a subsequent Apply succeeds', async () => {
  let attempts = 0;
  const controller = createReportController({ query: async () => { if (++attempts === 1) throw new Error('query failed'); return row('retry'); }, exportRows: async () => {} });
  await settle(() => controller.apply());
  assert.equal(controller.getState().status, 'error');
  assert.ok(controller.getState().error);
  await controller.apply();
  assert.equal(controller.getState().status, 'success');
  assert.deepEqual(controller.getState().rows, row('retry'));
  assert.equal(controller.getState().error, null);
});

test('export failure is observable and does not prevent a subsequent retry', async () => {
  let attempts = 0;
  let rejected = false;
  const updates = [];
  const controller = createReportController({ query: async () => row('ready'), exportRows: async () => { if (++attempts === 1) throw new Error('export unavailable'); } }, state => updates.push(state));
  await controller.apply();
  try { await controller.exportVisible(); } catch { rejected = true; }
  const visibleError = updates.some(state => Object.entries(state).some(([key, value]) => /error/i.test(key) && value));
  assert.ok(rejected || visibleError, 'export failure must be observable to its caller or subscriber');
  await controller.exportVisible();
  assert.equal(attempts, 2);
});

test('concurrent export activation creates a single job', async () => {
  const response = deferred();
  let jobs = 0;
  const controller = createReportController({ query: async () => row('ready'), exportRows: () => { jobs++; return response.promise; } });
  await controller.apply();
  const first = settle(() => controller.exportVisible());
  const second = settle(() => controller.exportVisible());
  response.resolve();
  await Promise.all([first, second]);
  assert.equal(jobs, 1);
});
