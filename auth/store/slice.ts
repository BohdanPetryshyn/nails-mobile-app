import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../common/store/types';
import { Payload, PayloadUtils } from '../entities/Payload';
import { Role } from '../../user/entities/user';

interface AuthState {
  accessToken?: string | null;
  payload?: Payload | null;
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
      const payload = accessToken && PayloadUtils.fromAccessToken(accessToken);

      state.accessToken = accessToken;
      state.payload = payload || null;
    },
  },
});

export const { accessTokenReceived } = authSlice.actions;

export const selectAuthState = (state: AppState) => {
  return state.auth;
};
export const selectAccessToken = (state: AppState): string | null | undefined =>
  selectAuthState(state).accessToken;
export const selectAccessTokenPayload = (
  state: AppState,
): Payload | null | undefined => selectAuthState(state).payload;
export const selectUserRole = (state: AppState): Role | null | undefined =>
  selectAccessTokenPayload(state)?.role;
export const selectIsLoggedIn = (state: AppState): boolean =>
  Boolean(selectUserRole(state));

export const authReducer = authSlice.reducer;
