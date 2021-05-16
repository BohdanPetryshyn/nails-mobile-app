import { AppThunk } from '../../../common/store/types';
import * as RolesService from '../../api/RolesService';
import { accessTokenReceived } from '../slice';
import { Role } from '../../entities/Payload';

export default (role: Role): AppThunk => async dispatch => {
  const updatedAccessToken = await RolesService.selectRole(role);

  dispatch(
    accessTokenReceived({ accessToken: updatedAccessToken.accessToken }),
  );
};
