export interface WorkingHours {
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
    return this.getStartOfDay(from);
  }

  static fromDates(from: Date, to: Date): WorkingHours {
    return {
      from: from.toUTCString(),
      to: to.toUTCString(),
    };
  }

  static getDefaultFromTime(day: Date): Date {
    return WorkingHoursUtils.getDayWithHours(day, 10);
  }

  static getDefaultToTime(day: Date): Date {
    return WorkingHoursUtils.getDayWithHours(day, 20);
  }

  static getStartOfDay(date: Date): Date {
    return WorkingHoursUtils.getDayWithUTCHours(date, 0);
  }

  static getDayWithHours(day: Date, hours: number): Date {
    const date = new Date(day.getTime());
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  static getDayWithUTCHours(day: Date, hours: number): Date {
    const date = new Date(day.getTime());
    date.setUTCHours(hours, 0, 0, 0);
    return date;
  }
}
