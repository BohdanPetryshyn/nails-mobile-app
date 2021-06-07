import React, { useEffect } from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { ChatPreview } from '../entities/ChatPreview';
import ChatItem from '../components/ChatItem';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../common/store/hooks';
import { selectChatPreviews } from '../store/slice';
import { fetchChatPreviews } from '../store/actions/fetchChatPreviews';
import ScreenLoader from '../../common/components/ScreenLoader';

export default function ({ navigation }: { navigation: NavigationProp }) {
  const dispatch = useAppDispatch();

  const chats = useAppSelector(selectChatPreviews);

  useEffect(() => {
    dispatch(fetchChatPreviews());
  }, []);

  if (chats === undefined) {
    return <ScreenLoader />;
  }

  const renderItem = (
    info: ListRenderItemInfo<ChatPreview>,
  ): React.ReactElement => {
    const chat = info.item;
    return (
      <ChatItem
        style={styles.item}
        chatPreview={chat}
        onPress={() => navigation.navigate('Chat', { email: chat.toEmail })}
      />
    );
  };

  return (
    <SafeAreaLayout style={styles.container}>
      <List style={styles.list} data={chats} renderItem={renderItem} />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#c0c2ce',
  },
});

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Chats'>,
  StackNavigationProp<RootStackParamList>
>;
