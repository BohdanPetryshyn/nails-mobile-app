import React from 'react';
import { ChatPreview } from '../../messages/entities/ChatPreview';
import { Button, ButtonProps } from '@ui-kitten/components';
import { useAppDispatch } from '../../common/store/hooks';
import { addNewChatPreview } from '../../messages/store/slice';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

export default function ({
  chatPreview,
  navigation,
  ...buttonProps
}: { chatPreview: ChatPreview; navigation: NavigationProp } & ButtonProps) {
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(addNewChatPreview({ preview: chatPreview }));
    navigation.navigate('Chat', { email: chatPreview.toEmail });
  };

  return (
    <Button {...buttonProps} onPress={onPress}>
      Написати
    </Button>
  );
}

type NavigationProp = StackNavigationProp<RootStackParamList>;
