import { AppThunk } from '../../../common/store/types';
import { AppointmentsService } from '../../api/AppointmentsService';
import { deleteAppointment } from '../slice';

export default (
  day: string,
  appointmentId: string,
): AppThunk => async dispatch => {
  await AppointmentsService.deleteAppointment(appointmentId);

  dispatch(deleteAppointment({ day, appointmentId }));
};
