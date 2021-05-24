import { UserData } from './user-data';
import { Service } from './service';
import { WorkingHours } from './working-hours';

export interface MasterData extends UserData {
  address: string;

  services: Service[];

  workingHours: WorkingHours[];
}
