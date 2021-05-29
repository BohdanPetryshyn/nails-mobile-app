import { ChatPreview } from '../entities/ChatPreview';
import { Message } from '../entities/Message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../common/store/types';

interface ChatState {
  preview: ChatPreview;
  messages?: Message[];
}

interface MessagesState {
  chats?: Record<string, ChatState>;
}

const initialState: MessagesState = {};

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    chatPreviewsReceived(
      state,
      action: PayloadAction<{ previews: ChatPreview[] }>,
    ) {
      const { previews } = action.payload;

      state.chats = previews.reduce((resultPreviews, preview) => {
        return { ...resultPreviews, [preview.toEmail]: { preview } };
      }, {} as Record<string, ChatState>);
    },
    chatMessagesReceived(
      state,
      action: PayloadAction<{ toEmail: string; messages: Message[] }>,
    ) {
      const { toEmail, messages } = action.payload;

      if (state.chats) {
        state.chats[toEmail].messages = messages;
      }
    },
    chatMessageReceived(
      state,
      action: PayloadAction<{ toEmail: string; message: Message }>,
    ) {
      const { toEmail, message } = action.payload;

      if (state.chats) {
        state.chats[toEmail].messages?.push(message);
      }
    },
  },
});

export const {
  chatMessageReceived,
  chatMessagesReceived,
  chatPreviewsReceived,
} = slice.actions;

export const selectMessagesState = (state: AppState) => state.messages;
export const selectChatStates = (state: AppState) =>
  selectMessagesState(state).chats;
export const selectChatStatesArray = (state: AppState) => {
  const chats = selectChatStates(state);
  return chats && Object.values(chats);
};
export const selectChatPreviews = (state: AppState) =>
  selectChatStatesArray(state)?.map(chat => chat.preview);
export const selectChat = (toEmail: string) => (state: AppState) => {
  const chats = selectChatStates(state);
  return chats && chats[toEmail];
};

export const messagesReducer = slice.reducer;
