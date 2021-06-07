import { Message } from './Message';
import { DateUtils } from '../../common/utils/DateUtils';

export interface ChatPreview {
  toEmail: string;
  toFullName: string;
  toProfilePhoto: string;
  lastMessage?: Message;
}

export class ChatPreviewUtils {
  static getTruncatedMessage(chatPreview: ChatPreview): string | undefined {
    if (!chatPreview.lastMessage) return undefined;
    const { text } = chatPreview.lastMessage;
    const isLong = text.length > 36;
    return isLong ? `${text.substring(0, 32)}...` : text;
  }

  static getDateString(chatPreview: ChatPreview): string | undefined {
    if (!chatPreview.lastMessage) return undefined;
    const sentAtDate = new Date(chatPreview.lastMessage.sentAt);

    return DateUtils.toLocalTimeString(sentAtDate);
  }
}
