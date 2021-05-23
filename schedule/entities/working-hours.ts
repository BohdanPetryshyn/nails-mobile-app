import { Exclude, Expose } from 'class-transformer';
import { IsInt } from 'class-validator';

interface WorkingHoursConstructorParams {
  from: number;
  to: number;
}

@Exclude()
export class WorkingHours {
  @Expose()
  @IsInt()
  from: number;

  @Expose()
  @IsInt()
  to: number;

  constructor({ from, to }: WorkingHoursConstructorParams) {
    this.from = from;
    this.to = to;
  }
}
