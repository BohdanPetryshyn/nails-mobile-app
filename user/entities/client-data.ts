import { UserData } from './user-data';
import { MasterDataUtils } from './master-data';

export type ClientData = UserData;

export class ClientDataUtils {
  static isClientData(userData: UserData): userData is ClientData {
    return !MasterDataUtils.isMasterData(userData);
  }
}
