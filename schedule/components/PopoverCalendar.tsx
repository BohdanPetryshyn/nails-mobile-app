import React, { useState } from 'react';
import { Button, ButtonProps, Calendar, Popover } from '@ui-kitten/components';
import { DateUtils } from '../../common/utils/DateUtils';

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
    const normalizedDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ),
    );
    onDateSelect(normalizedDate);
    setVisible(false);
  };

  const renderClickableDate = () => (
    <Button
      size="giant"
      appearance="ghost"
      onPress={() => setVisible(true)}
      {...buttonProps}
    >
      {DateUtils.toLocaleDateString(date)}
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
