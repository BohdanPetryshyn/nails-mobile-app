import { AppThunk } from '../../../common/store/types';
import { accessTokenReceived } from '../slice';
import * as LoginService from '../../api/LoginService';
import * as SecureStoreService from '../../device/SecureStoreService';

export default (
  googleAccessToken: string,
): AppThunk<Promise<void>> => async dispatch => {
  const authResponse = await LoginService.loginWithGoogleAccessToken(
    googleAccessToken,
  );
  const accessToken = authResponse.accessToken;

  await SecureStoreService.setAccessToken(accessToken);

  await dispatch(
    accessTokenReceived({ accessToken: authResponse.accessToken }),
  );
};
