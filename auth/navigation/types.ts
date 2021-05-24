import { UserData } from '../../user/entities/user-data';
import { Role } from '../../user/entities/user';

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
