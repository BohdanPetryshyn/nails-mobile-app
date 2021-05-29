import authenticatedClient from '../../common/api/authenticatedClient';
import { MessageSendRequest } from '../entities/MessageSendRequest';
import { ChatPreview } from '../entities/ChatPreview';
import { Message } from '../entities/Message';

const BASE_PATH = 'messages';

export class MessagesService {
  static async getChatPreviews(): Promise<ChatPreview[]> {
    const url = `${BASE_PATH}/chats`;

    const chatPreviewsResponse = await authenticatedClient.get(url);

    return chatPreviewsResponse.data;
  }

  static async getChatMessages(toEmail: string): Promise<Message[]> {
    const url = `${BASE_PATH}/chats/${toEmail}`;

    const chatMessagesResponse = await authenticatedClient.get(url);

    return chatMessagesResponse.data.map((message: any) => ({
      ...message,
      isOut: message.toEmail === toEmail,
    }));
  }

  static async sendMessage(
    toEmail: string,
    sendRequest: MessageSendRequest,
  ): Promise<Message> {
    const url = `${BASE_PATH}/chats/${toEmail}`;

    const sendMessageResponse = await authenticatedClient.post(
      url,
      sendRequest,
    );

    return { ...sendMessageResponse.data, isOut: true };
  }
}
