import React, { useState } from 'react';
import { Button, ButtonProps, Calendar, Popover } from '@ui-kitten/components';

export default function ({
  date,
  onDateSelect,
  ...buttonProps
}: {
  date: Date;
  onDateSelect: (date: Date) => void;
} & ButtonProps) {
  const [visible, setVisible] = useState(false);

  const onSelect = (date: Date) => {
    onDateSelect(date);
    setVisible(false);
  };

  const renderClickableDate = () => (
    <Button
      size="giant"
      appearance="ghost"
      onPress={() => setVisible(true)}
      {...buttonProps}
    >
      {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
    </Button>
  );

  return (
    <Popover
      visible={visible}
      anchor={renderClickableDate}
      onBackdropPress={() => setVisible(false)}
    >
      <Calendar date={date} onSelect={onSelect} />
    </Popover>
  );
}
