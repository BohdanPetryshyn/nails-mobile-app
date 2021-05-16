import { UserData } from '../../user/entities/user-data';
import { Role } from '../entities/Payload';

export type LoginStackParamList = {
  Login: undefined;
  SelectRole: undefined;
  FillUserData: {
    userRole: Role;
  };
  FillMasterData: {
    userData: UserData;
  };
};
