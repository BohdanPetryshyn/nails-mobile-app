import { Role, User } from './user';
import { MasterData } from './master-data';

export interface Master extends User {
  masterData: MasterData;
}

export class MasterUtils {
  static isMaster(user: User): user is Master {
    return user.role === Role.MASTER;
  }
}
