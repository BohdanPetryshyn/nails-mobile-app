import { AppThunk } from '../../../common/store/types';
import { DateUtils } from '../../../common/utils/DateUtils';
import { AppointmentsService } from '../../api/AppointmentsService';
import { setDayAppointments } from '../slice';
import { selectUserEmail } from '../../../user/store/slice';
import { selectUserRole } from '../../../auth/store/slice';
import { Role } from '../../../user/entities/user';

export default (day: Date): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const userEmail = selectUserEmail(state);
  const userRole = selectUserRole(state);

  const from = DateUtils.getStartOfDay(day);
  const to = DateUtils.getEndOfDay(day);

  const appointments =
    userRole === Role.CLIENT
      ? await AppointmentsService.getAppointmentsByClientEmail(
          userEmail!,
          from,
          to,
        )
      : await AppointmentsService.getAppointmentsByMasterEmail(
          userEmail!,
          from,
          to,
        );

  dispatch(setDayAppointments({ appointments, day: day.toUTCString() }));
};
