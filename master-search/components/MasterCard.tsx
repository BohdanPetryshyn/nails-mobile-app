import { MasterDataUtils } from '../../user/entities/master-data';
import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { MasterSearchResult } from '../entities/MasterSearchResult';
import { View, ViewProps } from 'react-native';

function Header({
  fullName,
  address,
  ...viewProps
}: {
  fullName: string;
  address: string;
} & ViewProps) {
  return (
    <View {...viewProps}>
      <Text category="s1">{fullName}</Text>
      <Text>{address}</Text>
    </View>
  );
}

export default function ({ master }: { master: MasterSearchResult }) {
  const availableServicesString = MasterDataUtils.getServicesString(
    master.availableServices,
  );
  const priceString = MasterDataUtils.getPriceString(master.price);
  const durationString = MasterDataUtils.getMinutesString(master.duration);

  return (
    <Card
      header={props => (
        <Header
          fullName={master.fullName}
          address={master.address}
          {...props}
        />
      )}
    >
      <Text category="s1">{availableServicesString}</Text>
      <Text>{priceString}</Text>
      <Text>{durationString}</Text>
    </Card>
  );
}
