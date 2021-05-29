import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, ListProps, StyleType } from '@ui-kitten/components';
import { Message, MessageUtils } from '../entities/Message';
import ChatMessageContent from './ChatMessageContent';
import ChatMessage from './ChatMessage';
import { ChatMessageGroup } from './ChatMessageGroup';

export interface ChatProps extends Omit<ListProps, 'renderItem'> {
  data: Message[];
  followEnd: boolean;
}

export default function (props: ChatProps) {
  const listRef: React.RefObject<any> = React.useRef();
  let contentHeight = 0;

  const { followEnd, contentContainerStyle, data, ...listProps } = props;

  const shouldShowMessageIndicator = (message: Message): boolean => {
    return Boolean(message.text && message.text.length > 0);
  };

  const scrollToEnd = (params: any): void => {
    scrollToOffset({ offset: contentHeight, ...params });
  };

  const scrollToOffset = (params: any): void => {
    listRef.current.scrollToOffset(params);
  };

  const onContentSizeChange = (width: number, height: number): void => {
    contentHeight = height;

    props.followEnd && setTimeout(scrollToEnd, 0);

    listProps.onContentSizeChange &&
      listProps.onContentSizeChange(width, height);
  };

  const renderMessageContent = (
    message: Message,
    style: StyleType,
  ): React.ReactElement => (
    <ChatMessageContent style={style.container}>{message}</ChatMessageContent>
  );

  const renderMessage = (message: Message): React.ReactElement => (
    <ChatMessage
      style={styles.message}
      message={message}
      shouldShowIndicator={shouldShowMessageIndicator(message)}
    >
      {renderMessageContent}
    </ChatMessage>
  );

  const renderMessageGroup = (
    info: ListRenderItemInfo<Message[]>,
  ): React.ReactElement => (
    <ChatMessageGroup
      style={styles.group}
      data={info.item}
      renderItem={renderMessage}
    />
  );

  return (
    <List
      ref={listRef}
      {...listProps}
      data={MessageUtils.createMessageGroups(data)}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      onContentSizeChange={onContentSizeChange}
      renderItem={renderMessageGroup}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
  },
  group: {
    marginVertical: 8,
  },
  message: {
    marginVertical: 4,
  },
});
