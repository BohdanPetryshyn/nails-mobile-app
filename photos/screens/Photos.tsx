import React, { useEffect, useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, TopNavigation } from '@ui-kitten/components';
import PublishedPhotoCard from '../components/PublishedPhotoCard';
import { PublishedPhoto } from '../entities/PublishedPhoto';
import PublishPhotoNavigationAction from '../components/PublishPhotoNavigationAction';
import { PhotosService } from '../api/PhotosService';
import ScreenLoader from '../../common/components/ScreenLoader';
import { useAppDispatch } from '../../common/store/hooks';
import publishPhoto from '../store/actions/publishPhoto';

export const TAB_TITLE = 'Роботи';

export default function () {
  const dispatch = useAppDispatch();
  const [photos, setPhotos] = useState<PublishedPhoto[]>();

  useEffect(() => {
    async function fetchPhotos() {
      const photos = await PhotosService.getAll();
      setPhotos(photos);
    }
    fetchPhotos();
  }, []);

  if (!photos) return <ScreenLoader />;

  const onPhotoSelected = async (photoUrl: string) => {
    const publishedPhoto = await dispatch(publishPhoto(photoUrl));
    setPhotos([publishedPhoto, ...photos]);
  };

  const renderItem = (item: ListRenderItemInfo<PublishedPhoto>) => (
    <PublishedPhotoCard publishedPhoto={item.item} />
  );

  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <TopNavigation
        alignment="center"
        title={TAB_TITLE}
        accessoryRight={() => (
          <PublishPhotoNavigationAction onPhotoSelected={onPhotoSelected} />
        )}
      />
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={photos}
        renderItem={renderItem}
      />
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
