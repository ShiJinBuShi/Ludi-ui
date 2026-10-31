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
    document.querySelector('#feedback').textContent = `Export requested for ${status}`;
  }
};

const controller = createReportController(api, render);
function render(state) {
  document.querySelector('#feedback').textContent = state.status;
  document.querySelector('#criteria').textContent = `Report: ${state.applied}`;
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
