import { ServiceType } from './service-type';

export interface Service {
  serviceType: ServiceType;

  price: number;

  duration: number;
}
