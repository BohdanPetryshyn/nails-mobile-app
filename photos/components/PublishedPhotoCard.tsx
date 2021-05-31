import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Card, CardProps, Text } from '@ui-kitten/components';
import {
  PublishedPhoto,
  PublishedPhotoUtils,
} from '../entities/PublishedPhoto';

export default function ({
  publishedPhoto,
  ...cardProps
}: { publishedPhoto: PublishedPhoto } & CardProps) {
  const renderItemHeader = (): React.ReactElement => (
    <ImageBackground
      style={styles.postHeader}
      source={{ uri: publishedPhoto.photoUrl }}
    />
  );

  return (
    <Card
      {...cardProps}
      style={[styles.container, cardProps.style]}
      header={renderItemHeader}
    >
      <View style={styles.body}>
        <Avatar source={{ uri: publishedPhoto.userProfilePhoto }} />
        <View style={styles.postAuthorContainer}>
          <Text category="s2">{publishedPhoto.userFullName}</Text>
          <Text appearance="hint" category="c1">
            {PublishedPhotoUtils.getDateString(publishedPhoto)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  postHeader: {
    height: 220,
  },
  body: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  postAuthorContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});
