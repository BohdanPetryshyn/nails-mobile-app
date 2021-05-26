import { Interval } from './interval';
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
      const day = WorkingHoursUtils.getDayString(wh);

      return { ...result, [day]: wh };
    }, {} as Record<string, WorkingHours>);
  }

  static getDayString(workingHours: WorkingHours): string {
    return WorkingHoursUtils.getDay(workingHours).toUTCString();
  }

  static getDay(workingHours: WorkingHours): Date {
    const from = new Date(workingHours.from);
    return DateUtils.getStartOfDay(from);
  }

  static fromDates(from: Date, to: Date): WorkingHours {
    return {
      from: from.toUTCString(),
      to: to.toUTCString(),
    };
  }

  static getDefaultToTime(day: Date): Date {
    return DateUtils.getDayWithHours(day, 20);
  }
}
