// Public controller contract: preserve these four methods and the existing
// draft, applied, rows, status, error fields returned by getState().
// api.query({ status }) -> Promise<rows>; api.exportRows({ status }) -> Promise<void>.
export function createReportController(api, onChange = () => {}) {
  const state = {
    draft: 'all', applied: 'all', rows: [], status: 'idle', error: null,
    hasResult: false, pendingStatus: null,
    exportStatus: 'idle', exportError: null, exportApplied: null
  };
  let latestQuery = 0;
  const canExport = () => state.hasResult && state.status === 'success' && state.exportStatus !== 'loading';
  const snapshot = () => ({ ...state, rows: [...state.rows], canExport: canExport() });
  const emit = () => onChange(snapshot());
  const message = (error, fallback) =>
    (typeof error === 'string' ? error : error?.message) || fallback;
  const controller = {
    getState: snapshot,
    setDraft(status) {
      state.draft = status;
      emit();
    },
    async apply() {
      const request = ++latestQuery;
      const status = state.draft;
      state.status = 'loading';
      state.pendingStatus = status;
      state.error = null;
      if (state.exportStatus !== 'loading') {
        state.exportStatus = 'idle';
        state.exportError = null;
        state.exportApplied = null;
      }
      emit();
      try {
        const rows = await api.query({ status });
        if (request !== latestQuery) return;
        // The applied condition always describes the visible successful result.
        state.rows = rows;
        state.applied = status;
        state.hasResult = true;
        state.status = 'success';
      } catch (error) {
        if (request !== latestQuery) return;
        state.status = 'error';
        state.error = message(error, 'Unable to load the report.');
      }
      state.pendingStatus = null;
      emit();
    },
    async exportVisible() {
      // Guard the action as well as the button, including before the first query.
      if (!canExport()) return;
      const status = state.applied;
      state.exportApplied = status;
      state.exportStatus = 'loading';
      state.exportError = null;
      emit();
      try {
        await api.exportRows({ status });
        state.exportStatus = 'success';
      } catch (error) {
        state.exportStatus = 'error';
        state.exportError = message(error, 'Unable to export the report.');
      }
      emit();
    }
  };
  return controller;
}
