import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../common/store/types';
import {
  WorkingHours,
  WorkingHoursUtils,
} from '../../user/entities/working-hours';
import { Client } from '../../user/entities/client';
import { Master } from '../../user/entities/master';
import { User } from '../../user/entities/user';

interface ScheduleState {
  workingHours?: Record<string, WorkingHours>;
}

const initialState: ScheduleState = {};

export const clientReceived = createAction<{ client: Client }>(
  'clientReceived',
);
export const masterReceived = createAction<{ master: Master }>(
  'masterReceived',
);
export const userReceived = createAction<{ user: User }>('userReceived');

export const scheduleState = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setDayWorkingHours(
      state,
      action: PayloadAction<{ day: string; workingHours: WorkingHours }>,
    ) {
      const { day, workingHours } = action.payload;

      if (state.workingHours) {
        state.workingHours[day] = workingHours;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(masterReceived, (state, action) => {
      const { master } = action.payload;
      const workingHours = master.masterData.workingHours;

      state.workingHours = WorkingHoursUtils.indexByDay(workingHours);
    });
  },
});

export const { setDayWorkingHours } = scheduleState.actions;

export const selectScheduleState = (state: AppState) => state.schedule;
export const selectWorkingHours = (state: AppState) =>
  selectScheduleState(state).workingHours;
export const selectDayWorkingHours = (day: Date) => (state: AppState) => {
  const workingHours = selectWorkingHours(state);
  return workingHours && workingHours[day.toUTCString()];
};

export const scheduleReducer = scheduleState.reducer;
