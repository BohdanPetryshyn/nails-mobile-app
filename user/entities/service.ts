import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { ServiceType } from './service-type';

interface ServiceConstructorParams {
  serviceType: ServiceType;
  price: number;
}

@Exclude()
export class Service {
  @Expose()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @Expose()
  @IsInt()
  price: number;

  constructor({ serviceType, price }: ServiceConstructorParams) {
    this.serviceType = serviceType;
    this.price = price;
  }
}
