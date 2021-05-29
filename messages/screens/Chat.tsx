import React, { useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  IconElement,
  IconProps,
  Input,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import Chat from '../components/Chat';
import { KeyboardAvoidingView } from '../../common/components/KeyboardAvoidingView';
import { useAppDispatch, useAppSelector } from '../../common/store/hooks';
import { selectChat } from '../store/slice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { fetchChatMessages } from '../store/actions/fetchChatMessages';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenLoader from '../../common/components/ScreenLoader';
import { sendMessage } from '../store/actions/sendMessage';

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  })!;

const PaperPlaneIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="paper-plane" />
);

const ArrowIosBackIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="arrow-ios-back" />
);

export default function ({
  route,
  navigation,
}: {
  route: ChatRouteProp;
  navigation: NavigationProp;
}) {
  const email = route.params.email;

  const styles = useStyleSheet(themedStyles);
  const dispatch = useAppDispatch();
  const chatState = useAppSelector(selectChat(email))!;

  useEffect(() => {
    if (!chatState.messages) {
      dispatch(fetchChatMessages(email));
    }
  }, [email]);

  const [message, setMessage] = React.useState<string>();

  const sendButtonEnabled = (): boolean => {
    return Boolean(message && message.length > 0);
  };

  const onSendButtonPress = (): void => {
    dispatch(sendMessage(email, { text: message! }));
    setMessage(undefined);
    Keyboard.dismiss();
  };

  const onProfileActionPress = (): void => {
    navigation.navigate('UserProfile', { email });
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderProfileAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={renderProfileImage}
      onPress={onProfileActionPress}
    />
  );

  const renderProfileImage = (): React.ReactElement => (
    <Avatar size="small" source={{ uri: chatState.preview.toProfilePhoto }} />
  );

  return (
    <SafeAreaLayout style={styles.container}>
      <TopNavigation
        title={chatState.preview.toFullName}
        accessoryLeft={renderBackAction}
        accessoryRight={renderProfileAction}
      />
      {chatState.messages ? (
        <Chat
          style={styles.list}
          contentContainerStyle={styles.listContent}
          followEnd={true}
          data={chatState.messages}
        />
      ) : (
        <ScreenLoader />
      )}
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

type ChatRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type NavigationProp = StackNavigationProp<RootStackParamList>;
