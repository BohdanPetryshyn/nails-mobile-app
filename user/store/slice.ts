import { LoginData } from '../../auth/entities/LoginData';
import { MasterData } from '../entities/master-data';
import { ClientData } from '../entities/client-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../common/store/types';
import { WorkingHours, WorkingHoursUtils } from '../entities/working-hours';

export interface UserState {
  loginData?: LoginData;
  clientData?: ClientData;
  masterData?: Omit<MasterData, 'workingHours'> & {
    workingHours: Record<string, WorkingHours | null>;
  };
}

const initialState: UserState = {};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginData(state, action: PayloadAction<{ loginData: LoginData }>) {
      state.loginData = action.payload.loginData;
    },
    setClientData(state, action: PayloadAction<{ clientData: ClientData }>) {
      state.clientData = action.payload.clientData;
    },
    setMasterData(state, action: PayloadAction<{ masterData: MasterData }>) {
      const { masterData } = action.payload;
      state.masterData = {
        ...masterData,
        workingHours: WorkingHoursUtils.indexByDay(masterData.workingHours),
      };
    },
    setDayWorkingHours(
      state,
      action: PayloadAction<{ day: string; workingHours: WorkingHours }>,
    ) {
      const { day, workingHours } = action.payload;

      if (state.masterData) {
        state.masterData.workingHours[day] = workingHours;
      }
    },
  },
});

export const {
  setLoginData,
  setClientData,
  setMasterData,
  setDayWorkingHours,
} = slice.actions;

export const selectUserState = (state: AppState) => state.user;
export const selectLoginData = (state: AppState) =>
  selectUserState(state).loginData;
export const selectUserEmail = (state: AppState) =>
  selectLoginData(state)?.email;
export const selectClientData = (state: AppState) =>
  selectUserState(state).clientData;
export const selectMasterData = (state: AppState) =>
  selectUserState(state).masterData;
export const selectWorkingHours = (state: AppState) =>
  selectMasterData(state)?.workingHours;
export const selectMasterServices = (state: AppState) =>
  selectMasterData(state)?.services;
export const selectDayWorkingHours = (day: Date) => (state: AppState) => {
  const workingHours = selectWorkingHours(state);
  return workingHours && workingHours[day.toISOString()];
};

export const userReducer = slice.reducer;
