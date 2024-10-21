import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

// Exporting the actions to be used in your components
export const { showLoading, hideLoading } = alertsSlice.actions;

// Exporting the reducer to be combined in store.js
export default alertsSlice.reducer;
