import { AppThunk } from '../../../common/store/types';
import { chatMessageReceived } from '../slice';
import { selectUserEmail } from '../../../user/store/slice';
import { Message } from '../../entities/Message';

export const messageNotificationReceived = (
  message: Message,
): AppThunk => async (dispatch, getState) => {
  const userEmail = selectUserEmail(getState());

  if (message.fromEmail === userEmail) return;

  dispatch(chatMessageReceived({ message, toEmail: message.fromEmail }));
};
