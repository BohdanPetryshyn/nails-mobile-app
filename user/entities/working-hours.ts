import { Interval, IntervalUtils } from './interval';
import { DateUtils } from '../../common/utils/DateUtils';

export interface WorkingHours extends Interval {
  from: string;

  to: string;
}

export class WorkingHoursUtils {
  static indexByDay(
    workingHours: WorkingHours[],
  ): Record<string, WorkingHours> {
    return workingHours.reduce((result, wh) => {
      const day = IntervalUtils.getDayString(wh);

      return { ...result, [day]: wh };
    }, {} as Record<string, WorkingHours>);
  }

  static fromDates(from: Date, to: Date): WorkingHours {
    return {
      from: from.toISOString(),
      to: to.toISOString(),
    };
  }

  static getDefaultToTime(day: Date): Date {
    return DateUtils.getDayWithHours(day, 20);
  }
}
