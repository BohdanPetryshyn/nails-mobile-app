import { User } from './user';
import { MasterData } from './master-data';

export interface Master extends User {
  masterData: MasterData;
}
