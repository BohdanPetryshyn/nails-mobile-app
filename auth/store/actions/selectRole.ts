import { AppThunk } from '../../../common/store/types';
import { RolesService } from '../../api/RolesService';
import { SecureStoreService } from '../../device/SecureStoreService';
import { accessTokenReceived } from '../slice';
import { Role } from '../../entities/Payload';
import { ClientData } from '../../../user/entities/client-data';
import { MasterData } from '../../../user/entities/master-data';

export default (
  role: Role,
  userData: ClientData | MasterData,
): AppThunk => async dispatch => {
  await userData.ensureProfilePhotoUploaded();

  const authResponse = await RolesService.selectRole(role, userData);
  const updatedAccessToken = authResponse.accessToken;

  await SecureStoreService.setAccessToken(updatedAccessToken);

  dispatch(accessTokenReceived({ accessToken: updatedAccessToken }));
};
