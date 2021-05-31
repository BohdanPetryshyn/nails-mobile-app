import React from 'react';
import { Icon, IconProps, TopNavigationAction } from '@ui-kitten/components';
import { ImagePickerService } from '../../common/device/ImagePickerService';

export const PlusIcon = (props: IconProps) => (
  <Icon {...props} name="plus-outline" />
);

export default function ({
  onPhotoSelected,
}: {
  onPhotoSelected: (uri: string) => void;
}) {
  const tryPickPhoto = async () => {
    const permissionsGranted = await ImagePickerService.requestMediaLibraryPermissions();
    if (!permissionsGranted) {
      return;
    }

    const pickedImageUri = await ImagePickerService.pickImageFromLibrary();
    pickedImageUri && onPhotoSelected(pickedImageUri);
  };
  return <TopNavigationAction onPress={tryPickPhoto} icon={PlusIcon} />;
}
