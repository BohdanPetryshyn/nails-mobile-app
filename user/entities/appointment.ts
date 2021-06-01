import { Interval } from './interval';
import { Service } from './service';
import { ServiceType } from './service-type';

export interface AppointmentCore {
  clientEmail: string;
  masterEmail: string;
}

export interface Appointment extends Interval, AppointmentCore {
  id: string;
  clientFullName: string;
  clientProfilePhoto: string;
  masterFullName: string;
  services: Service[];
  price: number;
}

export interface AppointmentCreateRequest extends AppointmentCore {
  services: ServiceType[];
  from: string;
}

export class AppointmentUtils {
  static isAppointment(interval: Interval): interval is Appointment {
    return 'price' in interval;
  }
}
