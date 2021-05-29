import { MessageSendRequest } from './MessageSendRequest';

export interface Message extends MessageSendRequest {
  fromEmail: string;
  sentAt: string;
}
