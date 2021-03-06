import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../auth/store/slice';
import { scheduleReducer } from '../../schedule/store/slice';
import { userReducer } from '../../user/store/slice';
import { messagesReducer } from '../../messages/store/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
    user: userReducer,
    messages: messagesReducer,
  },
});
