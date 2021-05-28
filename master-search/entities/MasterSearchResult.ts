import { ServiceType } from '../../user/entities/service-type';

export interface MasterSearchResult {
  masterEmail: string;

  fullName: string;

  address: string;

  availableServices: ServiceType[];

  price: number;

  duration: number;
}
