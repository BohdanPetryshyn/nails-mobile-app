import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import ServiceInputGroup, { ServiceBlank } from './ServiceInputGroup';
import { Button, Icon, IconProps } from '@ui-kitten/components';

export default function ({
  services,
  onServicesChange,
  ...viewProps
}: {
  services: ServiceBlank[];
  onServicesChange: (services: ServiceBlank[]) => void;
} & ViewProps) {
  const onServiceChange = (index: number) => (service: ServiceBlank) => {
    const newServices = [...services];
    newServices[index] = service;
    onServicesChange(newServices);
  };

  const addService = () => {
    onServicesChange([...services, new ServiceBlank({})]);
  };

  return (
    <View {...viewProps}>
      <View style={styles.detailsContainer}>
        {services.map((service, index) => (
          <ServiceInputGroup
            service={service}
            onServiceChange={onServiceChange(index)}
            key={index}
            style={styles.serviceInput}
          />
        ))}
        <Button
          size="large"
          appearance="ghost"
          accessoryLeft={StarIcon}
          onPress={addService}
        />
      </View>
    </View>
  );
}

const StarIcon = (props: IconProps) => <Icon {...props} name="plus-outline" />;

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: 'center',
  },
  serviceInput: {
    width: '100%',
    marginBottom: 10,
  },
});
