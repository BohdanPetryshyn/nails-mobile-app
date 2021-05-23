import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkingHours } from '../entities/working-hours';
import { AppState } from '../../common/store/types';

interface ScheduleState {
  workingHours?: Map<Date, WorkingHours>;
}

const initialState: ScheduleState = {};

export const scheduleState = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setDayWorkingHours(
      state,
      action: PayloadAction<{ day: Date; workingHours: WorkingHours }>,
    ) {
      const { day, workingHours } = action.payload;

      state.workingHours?.set(day, workingHours);
    },
    setWorkingHours(
      state,
      action: PayloadAction<{ workingHours: Map<Date, WorkingHours> }>,
    ) {
      const { workingHours } = action.payload;

      state.workingHours = workingHours;
    },
  },
});

export const { setDayWorkingHours, setWorkingHours } = scheduleState.actions;

export const selectScheduleState = (state: AppState) => state.schedule;
export const selectWorkingHours = (state: AppState) =>
  selectScheduleState(state).workingHours;
export const selectDayWorkingHours = (day: Date) => (state: AppState) =>
  selectWorkingHours(state)?.get(day);

export const scheduleReducer = scheduleState.reducer;
