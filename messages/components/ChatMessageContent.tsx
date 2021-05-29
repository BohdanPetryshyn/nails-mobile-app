import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Message } from '../entities/Message';

export interface ChatMessageContentProps extends ViewProps {
  children: Message;
}

export type ChatMessageContentElement = React.ReactElement<ChatMessageContentProps>;

export default function (props: ChatMessageContentProps) {
  const { style, children, ...viewProps } = props;

  const renderText = (): React.ReactElement => (
    <Text style={styles.text} status="control">
      {children.text}
    </Text>
  );

  return (
    <View {...viewProps} style={[styles.container, style]}>
      {children.text && renderText()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 48,
    minWidth: 48,
    maxWidth: 276,
    borderRadius: 4,
  },
  text: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  attachmentImage: {
    width: 124,
    height: 124,
  },
});
