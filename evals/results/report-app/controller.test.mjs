import test from 'node:test';
import assert from 'node:assert/strict';
import { createReportController } from './controller.mjs';

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

test('draft changes do not query, and exporting before the first success does nothing', async () => {
  let queries = 0;
  let exports = 0;
  const changes = [];
  const controller = createReportController({
    query: async () => { queries++; return []; },
    exportRows: async () => { exports++; }
  }, state => changes.push(state));
  controller.setDraft('active');
  controller.setDraft('disabled');
  await controller.exportVisible();
  assert.equal(queries, 0);
  assert.equal(exports, 0);
  assert.equal(changes.at(-1).draft, 'disabled');
  assert.equal(controller.getState().status, 'idle');
  assert.equal(controller.getState().canExport, false);
});

test('Apply captures the draft, and export uses the visible success rather than a later draft', async () => {
  const pending = deferred();
  const queries = [];
  const exports = [];
  const rows = [{ id: '1', name: 'Aria' }];
  const controller = createReportController({
    query: payload => { queries.push(payload); return pending.promise; },
    exportRows: async payload => { exports.push(payload); }
  });
  controller.setDraft('active');
  const applying = controller.apply();
  controller.setDraft('disabled');
  pending.resolve(rows);
  await applying;
  assert.deepEqual(queries, [{ status: 'active' }]);
  assert.equal(controller.getState().draft, 'disabled');
  assert.equal(controller.getState().applied, 'active');
  assert.deepEqual(controller.getState().rows, rows);
  await controller.exportVisible();
  assert.deepEqual(exports, [{ status: 'active' }]);
});

for (const olderOutcome of ['success', 'failure']) {
  test(`a newer success survives an older query's late ${olderOutcome}`, async () => {
    const first = deferred();
    const second = deferred();
    const pending = [first, second];
    const controller = createReportController({ query: () => pending.shift().promise });
    controller.setDraft('active');
    const older = controller.apply();
    controller.setDraft('disabled');
    const newer = controller.apply();
    const rows = [{ id: '2', name: 'Bo' }];
    second.resolve(rows);
    await newer;
    if (olderOutcome === 'success') first.resolve([{ id: '1', name: 'Aria' }]);
    else first.reject(new Error('Stale request failed'));
    await older;
    const state = controller.getState();
    assert.equal(state.applied, 'disabled');
    assert.deepEqual(state.rows, rows);
    assert.equal(state.status, 'success');
    assert.equal(state.error, null);
    assert.equal(state.pendingStatus, null);
  });
}

test('loading and failure block export; late success cannot replace the previous visible result', async () => {
  const requests = [];
  const exports = [];
  const controller = createReportController({
    query: () => {
      const request = deferred();
      requests.push(request);
      return request.promise;
    },
    exportRows: async payload => { exports.push(payload); }
  });
  const originalRows = [{ id: '1', name: 'Aria' }, { id: '2', name: 'Bo' }];
  const initial = controller.apply();
  requests[0].resolve(originalRows);
  await initial;
  controller.setDraft('active');
  const older = controller.apply();
  controller.setDraft('disabled');
  const newer = controller.apply();
  assert.equal(controller.getState().status, 'loading');
  assert.equal(controller.getState().canExport, false);
  await controller.exportVisible();
  requests[2].reject(new Error('Query unavailable'));
  await newer;
  requests[1].resolve([{ id: '1', name: 'Aria' }]);
  await older;
  await controller.exportVisible();
  const state = controller.getState();
  assert.equal(state.status, 'error');
  assert.equal(state.error, 'Query unavailable');
  assert.equal(state.applied, 'all');
  assert.equal(state.hasResult, true);
  assert.deepEqual(state.rows, originalRows);
  assert.equal(state.canExport, false);
  assert.deepEqual(exports, []);
});

test('a failed initial query can be retried, and an empty successful result is exportable', async () => {
  let queries = 0;
  const exports = [];
  const controller = createReportController({
    query: async () => {
      if (++queries === 1) throw new Error('Try later');
      return [];
    },
    exportRows: async payload => { exports.push(payload); }
  });
  await controller.apply();
  assert.equal(controller.getState().status, 'error');
  assert.equal(controller.getState().hasResult, false);
  assert.equal(controller.getState().canExport, false);
  await controller.apply();
  assert.equal(controller.getState().status, 'success');
  assert.equal(controller.getState().error, null);
  assert.equal(controller.getState().hasResult, true);
  assert.deepEqual(controller.getState().rows, []);
  await controller.exportVisible();
  assert.deepEqual(exports, [{ status: 'all' }]);
});

test('export prevents duplicate requests, reports failure, and supports retry without losing results', async () => {
  const first = deferred();
  let exports = 0;
  const rows = [{ id: '1', name: 'Aria' }];
  const controller = createReportController({
    query: async () => rows,
    exportRows: () => ++exports === 1 ? first.promise : Promise.resolve()
  });
  await controller.apply();
  const exporting = controller.exportVisible();
  assert.equal(controller.getState().exportStatus, 'loading');
  assert.equal(controller.getState().canExport, false);
  await controller.exportVisible();
  assert.equal(exports, 1);
  first.reject(new Error('Permission denied'));
  await exporting;
  assert.equal(controller.getState().exportStatus, 'error');
  assert.equal(controller.getState().exportError, 'Permission denied');
  assert.equal(controller.getState().status, 'success');
  assert.deepEqual(controller.getState().rows, rows);
  assert.equal(controller.getState().canExport, true);
  await controller.exportVisible();
  assert.equal(exports, 2);
  assert.equal(controller.getState().exportStatus, 'success');
  assert.equal(controller.getState().exportError, null);
});

test('an in-flight export retains its own condition when a new query succeeds', async () => {
  const pendingExport = deferred();
  const payloads = [];
  const controller = createReportController({
    query: async ({ status }) => [{ id: status, name: status }],
    exportRows: payload => { payloads.push(payload); return pendingExport.promise; }
  });
  await controller.apply();
  const exporting = controller.exportVisible();
  controller.setDraft('active');
  await controller.apply();
  assert.equal(controller.getState().applied, 'active');
  assert.equal(controller.getState().exportStatus, 'loading');
  assert.equal(controller.getState().canExport, false);
  pendingExport.resolve();
  await exporting;
  assert.equal(controller.getState().applied, 'active');
  assert.equal(controller.getState().exportApplied, 'all');
  assert.equal(controller.getState().canExport, true);
  assert.deepEqual(payloads, [{ status: 'all' }]);
});
