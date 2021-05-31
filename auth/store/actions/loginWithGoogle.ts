import { AppThunk } from '../../../common/store/types';
import { accessTokenReceived } from '../slice';
import { LoginService } from '../../api/LoginService';
import { SecureStoreService } from '../../device/SecureStoreService';
import { NotificationsService } from '../../../common/device/NotificationsService';

export default (
  googleAccessToken: string,
): AppThunk<Promise<void>> => async dispatch => {
  const authResponse = await LoginService.loginWithGoogleAccessToken(
    googleAccessToken,
  );
  const accessToken = authResponse.accessToken;

  await SecureStoreService.setAccessToken(accessToken);
  await NotificationsService.subscribeForNotifications(accessToken);

  dispatch(accessTokenReceived({ accessToken: authResponse.accessToken }));
};
