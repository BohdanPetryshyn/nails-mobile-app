import { ServiceType } from '../../user/entities/service-type';
import { City } from '../../user/entities/city';

export interface Filter {
  services: ServiceType[];

  from: Date;

  city: City;
}

export type FilterBlank = Partial<Filter>;

export class FilterUtils {
  static isFilled(blank: FilterBlank): boolean {
    return Boolean(blank.services && blank.from && blank.city);
  }

  static toFilter(blank: FilterBlank): Filter {
    return {
      services: blank.services!,
      from: blank.from!,
      city: blank.city!,
    };
  }
}
