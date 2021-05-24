import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import ServiceTypeSelect from './ServiceTypeSelect';
import { ServiceType } from '../../user/entities/service-type';
import MoneyInput from './MoneyInput';
import DurationInput from './DurationInput';

export default function ({
  service,
  onServiceChange,
  ...viewProps
}: {
  service: ServiceBlank;
  onServiceChange: (service: ServiceBlank) => void;
} & ViewProps) {
  const { serviceType, price, duration } = service;
  const onServiceTypeChange = (serviceType: ServiceType) => {
    onServiceChange(service.withServiceType(serviceType));
  };
  const onPriceChange = (price: number) => {
    onServiceChange(service.withPrice(price));
  };
  const onDurationChange = (duration: number) => {
    onServiceChange(service.withDuration(duration));
  };
  return (
    <View {...viewProps}>
      <ServiceTypeSelect
        selectedServiceType={serviceType}
        onServiceTypeSelected={onServiceTypeChange}
        label="Послуга"
        placeholder="Оберіть тип послуги"
        style={styles.select}
      />
      <View style={styles.detailsContainer}>
        <MoneyInput
          amount={price}
          onAmountChange={onPriceChange}
          label="Ціна"
          placeholder="Ціна послуги"
          style={styles.detail}
        />
        <DurationInput
          duration={duration}
          onDurationChange={onDurationChange}
          label="Тривалість"
          placeholder="Максимальна тривалість"
          style={styles.detail}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detail: {
    width: '45%',
  },
  select: {
    width: '100%',
  },
});

export class ServiceBlank {
  serviceType?: ServiceType;

  price?: number;

  duration?: number;

  constructor({
    serviceType,
    price,
    duration,
  }: {
    serviceType?: ServiceType;
    price?: number;
    duration?: number;
  }) {
    this.serviceType = serviceType;
    this.price = price;
    this.duration = duration;
  }

  withServiceType(serviceType: ServiceType) {
    return new ServiceBlank({ ...this, serviceType });
  }

  withPrice(price: number) {
    return new ServiceBlank({ ...this, price });
  }

  withDuration(duration: number) {
    return new ServiceBlank({ ...this, duration });
  }

  isFilled() {
    return Boolean(this.serviceType && this.price && this.duration);
  }

  isNotFilled() {
    return !this.isFilled();
  }

  toService() {
    return {
      serviceType: this.serviceType!,
      price: this.price!,
      duration: this.duration!,
    };
  }
}
