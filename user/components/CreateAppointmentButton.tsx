import React, { useState } from 'react';
import { AppointmentCreateRequest } from '../entities/appointment';
import { Button, ButtonProps, Tooltip } from '@ui-kitten/components';
import { AppointmentsService } from '../../schedule/api/AppointmentsService';

export default function ({
  createRequest,
  ...buttonProps
}: {
  createRequest: AppointmentCreateRequest;
} & ButtonProps) {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => {
    setTimeout(() => setVisible(true), 200);
    setTimeout(() => setVisible(false), 1500);
  };

  const createAppointment = () => {
    showTooltip();
    return AppointmentsService.createAppointment(createRequest);
  };

  const renderButton = () => (
    <Button {...buttonProps} onPress={createAppointment}>
      Записатись
    </Button>
  );

  return (
    <Tooltip anchor={renderButton} visible={visible}>
      Ви успішно записались! 💅🏻
    </Tooltip>
  );
}
