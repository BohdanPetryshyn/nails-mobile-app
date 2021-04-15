import { AppThunk } from '../../../common/store/types';
import { loginWithGoogleAccessToken } from '../../api/AuthService';
import { accessTokenReceived } from '../slice';

export default (
  accessToken: string,
): AppThunk<Promise<void>> => async dispatch => {
  const authResponse = await loginWithGoogleAccessToken(accessToken);

  dispatch(accessTokenReceived({ accessToken: authResponse.accessToken }));
};
