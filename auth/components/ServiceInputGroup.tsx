import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import ServiceTypeSelect from './ServiceTypeSelect';
import { ServiceType } from '../../user/entities/service-type';
import MoneyInput from './MoneyInput';
import { Service } from '../../user/entities/service';

export default function ({
  service,
  onServiceChange,
  ...viewProps
}: {
  service: ServiceBlank;
  onServiceChange: (service: ServiceBlank) => void;
} & ViewProps) {
  const { serviceType, price } = service;
  const onServiceTypeChange = (serviceType: ServiceType) => {
    onServiceChange(service.withServiceType(serviceType));
  };
  const onPriceChange = (price: number) => {
    onServiceChange(service.withPrice(price));
  };
  return (
    <View {...viewProps}>
      <View style={styles.container}>
        <ServiceTypeSelect
          selectedServiceType={serviceType}
          onServiceTypeSelected={onServiceTypeChange}
          label="Сервіс"
          placeholder="Оберіть тип сервісу"
        />
        <MoneyInput
          amount={price}
          onAmountChange={onPriceChange}
          label="Ціна"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export class ServiceBlank {
  serviceType?: ServiceType;

  price?: number;

  constructor({
    serviceType,
    price,
  }: {
    serviceType?: ServiceType;
    price?: number;
  }) {
    this.serviceType = serviceType;
    this.price = price;
  }

  withServiceType(serviceType: ServiceType) {
    return new ServiceBlank({ ...this, serviceType });
  }

  withPrice(price: number) {
    return new ServiceBlank({ ...this, price });
  }

  toService() {
    return new Service({ serviceType: this.serviceType!, price: this.price! });
  }
}
