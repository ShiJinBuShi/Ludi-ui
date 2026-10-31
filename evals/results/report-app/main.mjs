import { createReportController } from './controller.mjs';

// Local fixture services only; no production requests or actual downloads.
const records = [{ id: '1', name: 'Aria', status: 'active' }, { id: '2', name: 'Bo', status: 'disabled' }];
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const api = {
  async query({ status }) {
    await delay(status === 'all' ? 300 : 50);
    return records.filter(row => status === 'all' || row.status === status);
  },
  async exportRows({ status }) {
    await delay(100);
  }
};

const labels = { all: 'All', active: 'Active', disabled: 'Disabled' };
const controller = createReportController(api, render);
function render(state) {
  const previous = state.hasResult && state.status !== 'success';
  const feedback = {
    idle: 'Choose a status, then select Apply to load the report.',
    loading: `Loading ${labels[state.pendingStatus]}…`,
    success: state.rows.length ? `${state.rows.length} members loaded.` : 'No members match this report.',
    error: `Query failed: ${state.error} Select Apply to retry.`
  };
  const exportFeedback = {
    idle: '',
    loading: `Exporting ${labels[state.exportApplied]}…`,
    success: `Export completed for ${labels[state.exportApplied]}.`,
    error: `Export failed for ${labels[state.exportApplied]}: ${state.exportError} ${state.canExport
      ? 'Select Export to retry.' : 'Run a successful query before retrying export.'}`
  };
  document.querySelector('#status').value = state.draft;
  document.querySelector('#feedback').textContent = feedback[state.status];
  document.querySelector('#export-feedback').textContent = exportFeedback[state.exportStatus];
  document.querySelector('#criteria').textContent = state.hasResult
    ? `Report: ${labels[state.applied]}${previous ? ' (previous successful result)' : ''}`
    : 'Report: no successful query yet.';
  document.querySelector('#export').disabled = !state.canExport;
  document.querySelector('#rows').setAttribute('aria-busy', String(state.status === 'loading'));
  document.querySelector('#rows').replaceChildren(...state.rows.map(row => {
    const item = document.createElement('li');
    item.textContent = row.name;
    return item;
  }));
}
document.querySelector('#status').addEventListener('change', event => controller.setDraft(event.target.value));
document.querySelector('#apply').addEventListener('click', () => controller.apply());
document.querySelector('#export').addEventListener('click', () => controller.exportVisible());
render(controller.getState());
