import { MasterDataUtils } from '../../user/entities/master-data';
import { Card, CardProps, Text } from '@ui-kitten/components';
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

export default function ({
  master,
  onMasterPress,
  ...cardProps
}: {
  master: MasterSearchResult;
  onMasterPress: (masterEmail: string) => void;
} & CardProps) {
  const availableServicesString = MasterDataUtils.getServicesString(
    master.availableServices,
  );
  const priceString = MasterDataUtils.getPriceString(master.price);
  const durationString = MasterDataUtils.getMinutesString(master.duration);

  return (
    <Card
      {...cardProps}
      header={props => (
        <Header
          fullName={master.fullName}
          address={master.address}
          {...props}
        />
      )}
      onPress={() => onMasterPress(master.masterEmail)}
    >
      <Text category="s1">{availableServicesString}</Text>
      <Text>{priceString}</Text>
      <Text>{durationString}</Text>
    </Card>
  );
}
