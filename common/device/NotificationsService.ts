/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as Notifications from 'expo-notifications';
import { BackendNotificationsService } from '../api/BackendNotificationsService';
import { Message } from '../../messages/entities/Message';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export class NotificationsService {
  static async requestNotificationsPermission(): Promise<boolean> {
    const response = await Notifications.requestPermissionsAsync();

    console.log('premissions response', response);

    return response.status === 'granted';
  }

  static async subscribeForNotifications(accessToken: string): Promise<void> {
    const permissionGranted = await this.requestNotificationsPermission();

    if (!permissionGranted) {
      return;
    }

    const pushToken = await Notifications.getExpoPushTokenAsync();

    console.log('push token', pushToken);

    await BackendNotificationsService.subscribe(accessToken, pushToken.data);
  }

  static addMessagesListener(listener: (messageData: Message) => void): void {
    Notifications.addNotificationReceivedListener(notification => {
      // @ts-ignore
      listener(notification.request.content.data as Message);
    });
  }
}
