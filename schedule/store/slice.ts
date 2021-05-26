import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../common/store/types';
import { Appointment } from '../../user/entities/appointment';

interface ScheduleState {
  appointments: Record<string, Appointment[]>;
}

const initialState: ScheduleState = {
  appointments: {},
};

export const scheduleState = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setDayAppointments(
      state,
      action: PayloadAction<{ day: string; appointments: Appointment[] }>,
    ) {
      const { day, appointments } = action.payload;

      state.appointments[day] = appointments;
    },
    addDayAppointment(
      state,
      action: PayloadAction<{ day: string; appointment: Appointment }>,
    ) {
      const { day, appointment } = action.payload;

      if (state.appointments[day]) {
        state.appointments[day]?.push(appointment);
      } else {
        state.appointments[day] = [appointment];
      }
    },
  },
});

export const { setDayAppointments, addDayAppointment } = scheduleState.actions;

export const selectScheduleState = (state: AppState) => state.schedule;
export const selectAppointments = (state: AppState) =>
  selectScheduleState(state).appointments;
export const selectDayAppointments = (day: Date) => (state: AppState) =>
  selectAppointments(state)[day.toISOString()];

export const scheduleReducer = scheduleState.reducer;
