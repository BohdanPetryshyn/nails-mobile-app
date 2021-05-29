import { AppThunk } from '../../../common/store/types';
import { MessagesService } from '../../api/MessagesService';
import { chatPreviewsReceived } from '../slice';

export const fetchChatPreviews = (): AppThunk => async dispatch => {
  const previews = await MessagesService.getChatPreviews();

  dispatch(chatPreviewsReceived({ previews }));
};
