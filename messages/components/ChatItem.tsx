import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { ChatPreview, ChatPreviewUtils } from '../entities/ChatPreview';
import { MessageUtils } from '../entities/Message';

export default function ({
  chatPreview,
  ...listItemProps
}: { chatPreview: ChatPreview } & ListItemProps) {
  const renderMessageDate = (): React.ReactElement => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText} appearance="hint" category="c1">
        {MessageUtils.getDateString(chatPreview.lastMessage)}
      </Text>
    </View>
  );

  const renderProfileAvatar = (): React.ReactElement => (
    <Avatar
      style={styles.avatar}
      source={{ uri: chatPreview.toProfilePhoto }}
    />
  );

  return (
    <ListItem
      {...listItemProps}
      title={chatPreview.toFullName}
      description={ChatPreviewUtils.getTruncatedMessage(chatPreview)}
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderMessageDate}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
});
