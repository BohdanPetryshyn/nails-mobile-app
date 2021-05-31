import { NotificationsService } from '../../../common/device/NotificationsService';
import { store } from '../../../common/store/store';
import { messageNotificationReceived } from '../actions/messageNotificationReceived';

export default function () {
  NotificationsService.addMessagesListener(message => {
    store.dispatch(messageNotificationReceived(message));
  });
}
