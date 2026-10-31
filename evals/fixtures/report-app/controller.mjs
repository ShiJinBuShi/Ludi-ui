// Public controller contract: preserve these four methods and the existing
// draft, applied, rows, status, error fields returned by getState().
// api.query({ status }) -> Promise<rows>; api.exportRows({ status }) -> Promise<void>.
export function createReportController(api, onChange = () => {}) {
  const state = { draft: 'all', applied: 'all', rows: [], status: 'idle', error: null };
  const emit = () => onChange({ ...state, rows: [...state.rows] });
  const controller = {
    getState: () => ({ ...state, rows: [...state.rows] }),
    setDraft(status) {
      state.draft = status;
      void controller.apply();
    },
    async apply() {
      state.applied = state.draft;
      state.status = 'loading';
      emit();
      state.rows = await api.query({ status: state.applied });
      state.status = 'success';
      emit();
    },
    async exportVisible() {
      return api.exportRows({ status: state.draft });
    }
  };
  return controller;
}
