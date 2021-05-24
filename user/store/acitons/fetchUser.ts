import { AppThunk } from '../../../common/store/types';
import { UsersService } from '../../api/UsersService';
import { Role } from '../../entities/user';
import { Client } from '../../entities/client';
import { Master } from '../../entities/master';
import {
  clientReceived,
  masterReceived,
  userReceived,
} from '../../../schedule/store/slice';

export default (): AppThunk => async dispatch => {
  const user = await UsersService.getUser();

  if (user.role === Role.CLIENT) {
    dispatch(clientReceived({ client: user as Client }));
  } else if (user.role === Role.MASTER) {
    dispatch(masterReceived({ master: user as Master }));
  } else {
    dispatch(userReceived({ user }));
  }
};
