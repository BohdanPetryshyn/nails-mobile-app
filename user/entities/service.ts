import { ServiceType } from './service-type';

export interface Service {
  serviceType: ServiceType;

  price: number;

  duration: number;
}

export class ServiceUtils {
  static getTotalDuration(
    serviceTypes: ServiceType[],
    services: Service[],
  ): number {
    return services
      .filter(service => serviceTypes.includes(service.serviceType))
      .map(service => service.duration)
      .reduce((duration, serviceDuration) => duration + serviceDuration, 0);
  }
}
