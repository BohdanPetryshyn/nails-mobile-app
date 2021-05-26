import { AppThunk } from '../../../common/store/types';
import { UsersService } from '../../api/UsersService';
import { ClientUtils } from '../../entities/client';
import { MasterUtils } from '../../entities/master';
import { setClientData, setLoginData, setMasterData } from '../slice';

export default (): AppThunk => async dispatch => {
  const user = await UsersService.getUser();

  dispatch(setLoginData({ loginData: user.loginData }));
  if (ClientUtils.isClient(user)) {
    dispatch(setClientData({ clientData: user.clientData }));
  }
  if (MasterUtils.isMaster(user)) {
    dispatch(setMasterData({ masterData: user.masterData }));
  }
};
