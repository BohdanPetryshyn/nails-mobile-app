import { ServiceType } from '../../user/entities/service-type';

export interface MasterSearchResult {
  masterEmail: string;

  profilePhoto: string;

  fullName: string;

  address: string;

  availableServices: ServiceType[];

  price: number;

  duration: number;
}
