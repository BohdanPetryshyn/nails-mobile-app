import { WorkingHours } from './working-hours';
import { DateUtils } from '../../common/utils/DateUtils';

export interface Interval {
  from: string;

  to: string;
}

export class IntervalUtils {
  static compare(interval1: Interval, interval2: Interval): number {
    const fromDate1 = new Date(interval1.from);
    const fromDate2 = new Date(interval2.from);

    return fromDate1.getTime() - fromDate2.getTime();
  }

  static getDayString(interval: Interval): string {
    return this.getDay(interval).toISOString();
  }

  static getDay(interval: Interval): Date {
    const from = new Date(interval.from);
    return DateUtils.getStartOfDay(from);
  }

  static toWorkingHoursIntervals(
    workingHours: WorkingHours,
    appointments: Interval[],
  ): Interval[] {
    const intervals = [...appointments]
      .sort(IntervalUtils.compare)
      .reduce((intervals, nextAppointment) => {
        const from = this.last(intervals)?.to || workingHours.from;
        const to = nextAppointment.from;
        const interval = { from, to };
        return this.isEmpty(interval)
          ? [...intervals, nextAppointment]
          : [...intervals, interval, nextAppointment];
      }, new Array<Interval>());

    const lastIntervalEnd = this.last(intervals)?.to || workingHours.from;
    intervals.push({ from: lastIntervalEnd, to: workingHours.to });

    return intervals;
  }

  static getDurationMillis(interval: Interval): number {
    const fromDate = new Date(interval.from);
    const toDate = new Date(interval.to);

    return toDate.getTime() - fromDate.getTime();
  }

  static isEmpty(interval: Interval): boolean {
    const fromTime = new Date(interval.from).getTime();
    const toTime = new Date(interval.to).getTime();

    return toTime <= fromTime;
  }

  private static last<T>(array: T[]): T | null {
    const lastIndex = array.length - 1;

    return array[lastIndex] || null;
  }
}
