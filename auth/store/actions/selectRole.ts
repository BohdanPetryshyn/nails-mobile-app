import { AppThunk } from '../../../common/store/types';
import * as RolesService from '../../api/RolesService';
import { accessTokenReceived } from '../slice';
import { Role } from '../../entities/Payload';
import { ClientData } from '../../../user/entities/client-data';
import { MasterData } from '../../../user/entities/master-data';

export default (
  role: Role,
  userData: ClientData | MasterData,
): AppThunk => async dispatch => {
  const updatedAccessToken = await RolesService.selectRole(role, userData);

  dispatch(
    accessTokenReceived({ accessToken: updatedAccessToken.accessToken }),
  );
};
