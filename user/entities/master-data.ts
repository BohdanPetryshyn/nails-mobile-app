import { UserData } from './user-data';
import { Service } from './service';
import { WorkingHours } from './working-hours';
import { SERVICE_TYPE_LABELS, ServiceType } from './service-type';

export interface MasterData extends UserData {
  address: string;

  services: Service[];

  workingHours: WorkingHours[];
}

export class MasterDataUtils {
  static getServicesString(services: ServiceType[]): string {
    return services.map(service => SERVICE_TYPE_LABELS[service]).join(', ');
  }

  static getPriceString(price: number): string {
    return `₴${price}`;
  }

  static getMinutesString(duration: number): string {
    return `${duration} хв`;
  }
}
