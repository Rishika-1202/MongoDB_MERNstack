import { configureStore } from '@reduxjs/toolkit';
import alertsReducer from './alertsSlice';  // Import the alertsSlice reducer
import userReducer from './userSlice';      // Import the userSlice reducer

// Configure the store with the slices
const store = configureStore({
  reducer: {  // Correct key is `reducer`
    alerts: alertsReducer,  // alertsSlice.reducer is registered here
    user: userReducer,      // userSlice.reducer is registered here
  },
});

export default store;
