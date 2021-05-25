import { Interval } from './interval';
import { ServiceType } from './service-type';

export interface Appointment extends Interval {
  clientFullName: string;
  services: ServiceType[];
  price: number;
}
