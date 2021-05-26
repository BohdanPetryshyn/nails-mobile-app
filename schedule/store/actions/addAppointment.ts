import { AppointmentCreateRequest } from '../../../user/entities/appointment';
import { AppDispatch, AppThunk } from '../../../common/store/types';
import { AppointmentsService } from '../../api/AppointmentsService';
import { addDayAppointment } from '../slice';
import { DateUtils } from '../../../common/utils/DateUtils';
import { selectUserEmail } from '../../../user/store/slice';

export type MasterAppointmentCreateRequest = Omit<
  AppointmentCreateRequest,
  'masterEmail'
>;
export type ClientAppointmentCreateRequest = Omit<
  AppointmentCreateRequest,
  'clientEmail'
>;

export const addMasterAppointment = (
  createRequest: MasterAppointmentCreateRequest,
): AppThunk => async (dispatch, getState) => {
  const masterEmail = selectUserEmail(getState());
  return addAppointment(
    { ...createRequest, masterEmail: masterEmail! },
    dispatch,
  );
};

export const addClientAppointment = (
  createRequest: ClientAppointmentCreateRequest,
): AppThunk => async (dispatch, getState) => {
  const clientEmail = selectUserEmail(getState());
  return addAppointment(
    { ...createRequest, clientEmail: clientEmail! },
    dispatch,
  );
};

const addAppointment = async (
  createRequest: AppointmentCreateRequest,
  dispatch: AppDispatch,
) => {
  const appointment = await AppointmentsService.createAppointment(
    createRequest,
  );

  const day = DateUtils.getStartOfDayString(new Date(appointment.from));

  dispatch(addDayAppointment({ day, appointment }));
};
