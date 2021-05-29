import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import {
  StyleService,
  StyleType,
  Text,
  TextElement,
  useStyleSheet,
} from '@ui-kitten/components';
import { Message, MessageUtils } from '../entities/Message';
import { ChatMessageIndicator } from './ChatMessageIndicator';

export interface ChatMessageProps extends ViewProps {
  message: Message;
  shouldShowIndicator: boolean;
  children: (message: Message, style: StyleType) => React.ReactElement;
}

export type ChatMessageElement = React.ReactElement<ChatMessageProps>;

export default function ({
  message,
  shouldShowIndicator,
  children,
  ...viewProps
}: ChatMessageProps) {
  const styles = useStyleSheet(themedStyles);

  const renderDateElement = (): TextElement => (
    <Text style={styles.date} appearance="hint" category="c2">
      {MessageUtils.getDateString(message)}
    </Text>
  );

  const renderContentElement = (): React.ReactElement => {
    return children(message, {
      container: [message.isOut ? styles.contentOut : styles.contentIn],
    });
  };

  const renderIndicator = (): React.ReactElement => (
    <ChatMessageIndicator
      style={[
        message.isOut ? styles.indicatorOut : styles.indicatorIn,
        styles.indicator,
      ]}
      reverse={message.isOut}
    />
  );

  return (
    <View
      {...viewProps}
      style={[
        message.isOut ? styles.containerOut : styles.containerIn,
        styles.container,
        viewProps.style,
      ]}
    >
      {shouldShowIndicator && renderIndicator()}
      {renderContentElement()}
      {renderDateElement()}
    </View>
  );
}

const themedStyles = StyleService.create({
  container: {
    alignItems: 'center',
  },
  containerIn: {
    flexDirection: 'row',
  },
  containerOut: {
    flexDirection: 'row-reverse',
  },
  contentIn: {
    backgroundColor: 'color-basic-600',
  },
  contentOut: {
    backgroundColor: 'color-primary-default',
  },
  date: {
    marginHorizontal: 18,
  },
  indicator: {
    width: 6,
    height: 8,
  },
  indicatorIn: {
    backgroundColor: 'color-basic-600',
    transform: [{ rotate: '-90deg' }, { translateY: 3 }, { translateX: -12 }],
  },
  indicatorOut: {
    backgroundColor: 'color-primary-default',
    transform: [{ rotate: '90deg' }, { translateY: 3 }, { translateX: 12 }],
  },
});
