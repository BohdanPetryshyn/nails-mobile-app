import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { ServiceType } from './service-type';

interface ServiceConstructorParams {
  serviceType: ServiceType;
  price: number;
  duration: number;
}

@Exclude()
export class Service {
  @Expose()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @Expose()
  @IsInt()
  price: number;

  @Expose()
  @IsInt()
  duration: number;

  constructor({ serviceType, price, duration }: ServiceConstructorParams) {
    this.serviceType = serviceType;
    this.price = price;
    this.duration = duration;
  }
}
