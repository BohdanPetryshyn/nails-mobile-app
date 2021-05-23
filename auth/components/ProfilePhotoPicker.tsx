import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button } from '@ui-kitten/components';
import { ImagePickerService } from '../../common/device/ImagePickerService';

export default function ({
  photoUri,
  onPhotoUriChange,
}: {
  photoUri: string;
  onPhotoUriChange: (url: string) => void;
}) {
  const tryPickPhoto = async () => {
    const permissionsGranted = await ImagePickerService.requestMediaLibraryPermissions();
    if (!permissionsGranted) {
      return;
    }

    const pickedImageUri = await ImagePickerService.pickImageFromLibrary();
    pickedImageUri && onPhotoUriChange(pickedImageUri);
  };

  return (
    <View style={styles.detailsContainer}>
      <Avatar source={{ uri: photoUri }} style={styles.avatar} />
      <Button onPress={tryPickPhoto} appearance="ghost">
        Змінити
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
});
