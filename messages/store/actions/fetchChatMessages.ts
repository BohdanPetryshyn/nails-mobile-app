import { AppThunk } from '../../../common/store/types';
import { MessagesService } from '../../api/MessagesService';
import { chatMessagesReceived } from '../slice';

export const fetchChatMessages = (
  toEmail: string,
): AppThunk => async dispatch => {
  const messages = await MessagesService.getChatMessages(toEmail);

  dispatch(chatMessagesReceived({ toEmail, messages }));
};
