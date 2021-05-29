import { AppThunk } from '../../../common/store/types';
import { MessagesService } from '../../api/MessagesService';
import { chatMessageReceived } from '../slice';
import { MessageSendRequest } from '../../entities/MessageSendRequest';

export const sendMessage = (
  toEmail: string,
  sendRequest: MessageSendRequest,
): AppThunk => async dispatch => {
  const message = await MessagesService.sendMessage(toEmail, sendRequest);

  dispatch(chatMessageReceived({ toEmail, message }));
};
