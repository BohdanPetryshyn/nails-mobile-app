export interface WorkingHours {
  from: string;

  to: string;
}

export class WorkingHoursUtils {
  static indexByDay(
    workingHours: WorkingHours[],
  ): Record<string, WorkingHours> {
    return workingHours.reduce((result, wh) => {
      const day = WorkingHoursUtils.getDay(wh);

      return { ...result, [day.toUTCString()]: wh };
    }, {} as Record<string, WorkingHours>);
  }

  static getDay(workingHours: WorkingHours): Date {
    const from = new Date(workingHours.from);
    from.setUTCHours(0, 0, 0, 0);
    return from;
  }
}
