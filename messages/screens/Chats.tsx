import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List } from '@ui-kitten/components';
import { ChatPreview } from '../entities/ChatPreview';
import ChatItem from '../components/ChatItem';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';

const initialChatPreviews: ChatPreview[] = [
  {
    toFullName: 'Богдан Петришин',
    toProfilePhoto:
      'https://lh3.googleusercontent.com/a/AATXAJwlDeEJVNqNm10H4sh6Q8DVUzzWxjhB3fQH0NvU=s96-c',
    toEmail: 'b.y.petryshyn@gmail.com',
    lastMessage: {
      text: 'Hey, my name is Bohdan. I`d like to have a coating this week.',
      fromEmail: 'b.y.petryshyn@gmail.com',
      toEmail: 'elina.19.ua@gmail.com',
      sentAt: '2021-05-29T09:08:31+0000',
    },
  },
];

export default function () {
  const renderItem = (
    info: ListRenderItemInfo<ChatPreview>,
  ): React.ReactElement => (
    <ChatItem style={styles.item} chatPreview={info.item} />
  );

  return (
    <SafeAreaLayout style={styles.container}>
      <List
        style={styles.list}
        data={initialChatPreviews}
        renderItem={renderItem}
      />
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
