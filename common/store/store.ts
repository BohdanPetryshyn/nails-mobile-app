import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../auth/store/slice';
import { scheduleReducer } from '../../schedule/store/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
});
