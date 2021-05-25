import {
  WorkingHours,
  WorkingHoursUtils,
} from '../../../user/entities/working-hours';
import { AppThunk } from '../../../common/store/types';
import { MastersService } from '../../../user/api/MastersService';
import { setDayWorkingHours } from '../slice';

export default (workingHours: WorkingHours): AppThunk => async dispatch => {
  await MastersService.addWorkingHours(workingHours);

  const day = WorkingHoursUtils.getDayString(workingHours);

  dispatch(setDayWorkingHours({ day, workingHours }));
};
