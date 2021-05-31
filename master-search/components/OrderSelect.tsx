import React, { useState } from 'react';
import EnumSelect from '../../common/components/EnumSelect';
import { Order, ORDER_LABELS } from '../entities/Order';
import { Button, Layout, Popover } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export default function ({
  selectedOrder,
  onOrderChange,
}: {
  selectedOrder: Order;
  onOrderChange: (order: Order) => void;
}) {
  const [visible, setVisible] = useState(false);

  const renderButton = () => (
    <Button onPress={() => setVisible(true)} size="giant" appearance="ghost">
      Сортування
    </Button>
  );

  return (
    <Popover
      anchor={renderButton}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      <Layout level="2" style={styles.container}>
        <EnumSelect
          selectedValue={selectedOrder}
          onValueSelect={onOrderChange}
          enumValues={Order}
          enumLabels={ORDER_LABELS}
          label="Порядок"
          style={styles.select}
        />
      </Layout>
    </Popover>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  select: {
    width: 200,
  },
  timePicker: {
    width: 200,
  },
});
