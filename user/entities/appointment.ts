import { Interval } from './interval';
import { Service } from './service';

export interface Appointment extends Interval {
  clientFullName: string;
  masterFullName: string;
  services: Service[];
  price: number;
}

export class AppointmentUtils {
  static isAppointment(interval: Interval): interval is Appointment {
    return 'price' in interval;
  }
}
