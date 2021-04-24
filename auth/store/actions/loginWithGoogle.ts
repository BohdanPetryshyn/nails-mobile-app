import { AppThunk } from '../../../common/store/types';
import { accessTokenReceived } from '../slice';
import { loginWithGoogleAccessToken } from '../../api/LoginService';

export default (
  accessToken: string,
): AppThunk<Promise<void>> => async dispatch => {
  const authResponse = await loginWithGoogleAccessToken(accessToken);

  dispatch(accessTokenReceived({ accessToken: authResponse.accessToken }));
};
