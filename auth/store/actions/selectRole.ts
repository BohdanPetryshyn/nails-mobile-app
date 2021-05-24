import { AppThunk } from '../../../common/store/types';
import { RolesService } from '../../api/RolesService';
import { SecureStoreService } from '../../device/SecureStoreService';
import { accessTokenReceived } from '../slice';
import { ClientData } from '../../../user/entities/client-data';
import { MasterData } from '../../../user/entities/master-data';
import { Role } from '../../../user/entities/user';
import { AuthResponse } from '../../entities/AuthResponse';
import { UserDataUtils } from '../../../user/entities/user-data';

export default (
  role: Role,
  userData: ClientData | MasterData,
): AppThunk => async dispatch => {
  const uploadedUserData = await UserDataUtils.ensureProfilePhotoUploaded(
    userData,
  );

  const authResponse = await selectAnyRole(role, uploadedUserData);
  const updatedAccessToken = authResponse.accessToken;

  await SecureStoreService.setAccessToken(updatedAccessToken);

  dispatch(accessTokenReceived({ accessToken: updatedAccessToken }));
};

async function selectAnyRole(
  role: Role,
  userData: ClientData | MasterData,
): Promise<AuthResponse> {
  switch (role) {
    case Role.CLIENT:
      return RolesService.selectClientRole(userData as ClientData);
    case Role.MASTER:
      return RolesService.selectMasterRole(userData as MasterData);
  }
}
