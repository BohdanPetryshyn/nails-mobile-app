import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../entities/user';
import { tokenToUser } from '../utils/tokenToUser';
import { AppState } from '../../common/store/types';

interface AuthState {
  accessToken?: string | null;
  user?: User | null;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    accessTokenReceived(
      state,
      action: PayloadAction<{ accessToken: string | null }>,
    ) {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.user = accessToken == null ? null : tokenToUser(accessToken);
    },
  },
});

export const { accessTokenReceived } = authSlice.actions;

export const selectAuthState = (state: AppState) => {
  return state.auth;
};
export const selectAccessToken = (state: AppState): string | null | undefined =>
  selectAuthState(state).accessToken;
export const selectUser = (state: AppState): User | null | undefined =>
  selectAuthState(state).user;

export const authReducer = authSlice.reducer;
