import { configureStore } from '@reduxjs/toolkit';
import activityLogsReducer from './slices/activityLogsSlics';
import sidebarReducer from './slices/sidebarSlice';

const store = configureStore({
  reducer: {
    activityLogs: activityLogsReducer,
    sidebar: sidebarReducer
  }
});

export default store;
