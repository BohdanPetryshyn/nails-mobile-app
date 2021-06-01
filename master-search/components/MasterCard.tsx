import { MasterDataUtils } from '../../user/entities/master-data';
import { Avatar, Card, CardProps, Text } from '@ui-kitten/components';
import React from 'react';
import { MasterSearchResult } from '../entities/MasterSearchResult';
import { View, ViewProps } from 'react-native';

function Header({
  fullName,
  address,
  profilePhoto,
  ...viewProps
}: {
  fullName: string;
  address: string;
  profilePhoto: string;
} & ViewProps) {
  return (
    <View {...viewProps} style={[viewProps.style, { flexDirection: 'row' }]}>
      <Avatar source={{ uri: profilePhoto }} style={{ marginRight: 15 }} />
      <View>
        <Text category="s1">{fullName}</Text>
        <Text>{address}</Text>
      </View>
    </View>
  );
}

export default function ({
  master,
  ...cardProps
}: {
  master: MasterSearchResult;
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
          profilePhoto={master.profilePhoto}
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
