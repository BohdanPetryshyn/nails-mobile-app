import { MessageSendRequest } from './MessageSendRequest';
import { DateUtils } from '../../common/utils/DateUtils';

export interface Message extends MessageSendRequest {
  fromEmail: string;
  sentAt: string;
  isOut: boolean;
}

type MessageGroup = Message[];

export class MessageUtils {
  static getDateString(message: Message): string {
    const sentAtDate = new Date(message.sentAt);

    return DateUtils.toLocalTimeString(sentAtDate);
  }

  static createMessageGroups(source: Message[]): MessageGroup[] {
    if (!source.length) {
      return [];
    }

    const result: MessageGroup[] = [];
    const [firstMessage, ...messages] = source;

    let currentGroup: MessageGroup = [firstMessage];

    messages.forEach((message: Message): void => {
      if (this.fitsGroupSafe(message, currentGroup)) {
        currentGroup.push(message);
      } else {
        result.push(currentGroup);
        currentGroup = [message];
      }
    });

    return [...result, currentGroup];
  }

  private static fitsGroupSafe(message: Message, group: MessageGroup) {
    const [firstGroupMessage] = group;

    return this.isSameGroupSafe(firstGroupMessage, message);
  }

  private static isSameGroup(lhs: Message, rhs: Message) {
    return lhs.isOut === rhs.isOut;
  }

  private static isSameGroupSafe(lhs: Message, rhs: Message) {
    if (lhs && rhs) {
      return this.isSameGroup(lhs, rhs);
    }

    return false;
  }
}
