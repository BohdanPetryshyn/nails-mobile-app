import React from 'react';
import { Keyboard, Platform } from 'react-native';
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  Input,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { Message } from '../entities/Message';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import Chat from '../components/Chat';
import { KeyboardAvoidingView } from '../../common/components/KeyboardAvoidingView';

const initialMessages: Message[] = [
  {
    text: 'Hey, my name is Bohdan. I`d like to have a coating this week.',
    fromEmail: 'b.y.petryshyn@gmail.com',
    toEmail: 'elina.19.ua@gmail.com',
    sentAt: '2021-05-29T09:08:31+0000',
    isOut: false,
  },
  {
    text: 'Hey, my name is Bohdan. I`d like to have a coating this week.',
    fromEmail: 'b.y.petryshyn@gmail.com',
    toEmail: 'elina.19.ua@gmail.com',
    sentAt: '2021-05-29T09:08:31+0000',
    isOut: false,
  },
  {
    text: 'Hey, my name is Bohdan. I`d like to have a coating this week.',
    fromEmail: 'b.y.petryshyn@gmail.com',
    toEmail: 'elina.19.ua@gmail.com',
    sentAt: '2021-05-29T09:08:31+0000',
    isOut: true,
  },
  {
    text: 'Hey, my name is Bohdan. I`d like to have a coating this week.',
    fromEmail: 'b.y.petryshyn@gmail.com',
    toEmail: 'elina.19.ua@gmail.com',
    sentAt: '2021-05-29T09:08:31+0000',
    isOut: true,
  },
  {
    text: 'Hey, my name is Bohdan. I`d like to have a coating this week.',
    fromEmail: 'b.y.petryshyn@gmail.com',
    toEmail: 'elina.19.ua@gmail.com',
    sentAt: '2021-05-29T09:08:31+0000',
    isOut: false,
  },
];

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  })!;

const PaperPlaneIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="paper-plane" />
);

export default function () {
  const styles = useStyleSheet(themedStyles);

  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [message, setMessage] = React.useState<string>();

  const sendButtonEnabled = (): boolean => {
    return Boolean(message && message.length > 0);
  };

  const onSendButtonPress = (): void => {
    setMessage(undefined);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaLayout style={styles.container}>
      <Chat
        style={styles.list}
        contentContainerStyle={styles.listContent}
        followEnd={true}
        data={messages}
      />
      <KeyboardAvoidingView
        style={styles.messageInputContainer}
        offset={keyboardOffset}
      >
        <Input
          style={styles.messageInput}
          placeholder="Повідомлення..."
          value={message}
          onChangeText={setMessage}
        />
        <Button
          appearance="ghost"
          style={[styles.iconButton, styles.sendButton]}
          accessoryLeft={PaperPlaneIcon}
          disabled={!sendButtonEnabled()}
          onPress={onSendButtonPress}
        />
      </KeyboardAvoidingView>
    </SafeAreaLayout>
  );
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  messageInputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingTop: 16,
    backgroundColor: 'background-basic-color-1',
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  sendButton: {
    marginRight: 4,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
});
