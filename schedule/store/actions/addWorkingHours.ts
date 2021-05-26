import { WorkingHours } from '../../../user/entities/working-hours';
import { AppThunk } from '../../../common/store/types';
import { MastersService } from '../../../user/api/MastersService';
import { setDayWorkingHours } from '../../../user/store/slice';
import { IntervalUtils } from '../../../user/entities/interval';

export default (workingHours: WorkingHours): AppThunk => async dispatch => {
  await MastersService.addWorkingHours(workingHours);

  const day = IntervalUtils.getDayString(workingHours);

  dispatch(setDayWorkingHours({ day, workingHours }));
};
