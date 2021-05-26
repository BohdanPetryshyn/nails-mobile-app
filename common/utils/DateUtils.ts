export class DateUtils {
  static getDefaultFromTime(day: Date): Date {
    return this.getDayWithHours(day, 10);
  }

  static getStartOfDay(date: Date): Date {
    return DateUtils.getDayWithUTCHours(date, 0, 0, 0, 0);
  }

  static getEndOfDay(date: Date): Date {
    return DateUtils.getDayWithUTCHours(date, 23, 59, 59, 999);
  }

  static getDayWithHours(day: Date, hours: number): Date {
    const date = new Date(day.getTime());
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  static getDayWithUTCHours(
    day: Date,
    hours: number,
    minutes?: number,
    seconds?: number,
    millis?: number,
  ): Date {
    const date = new Date(day.getTime());
    date.setUTCHours(hours, minutes, seconds, millis);
    return date;
  }

  static toLocalTimeString(time: Date): string {
    return time.toLocaleTimeString('ua', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
