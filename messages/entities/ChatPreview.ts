import { Message } from './Message';

export interface ChatPreview {
  toEmail: string;
  toFullName: string;
  toProfilePhoto: string;
  lastMessage: Message;
}
