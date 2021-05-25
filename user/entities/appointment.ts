import { Interval } from './interval';
import { ServiceType } from './service-type';

export interface Appointment extends Interval {
  clientFullName: string;
  services: ServiceType[];
  price: number;
}

export class AppointmentUtils {
  static isAppointment(interval: Interval): interval is Appointment {
    return 'price' in interval;
  }
}
