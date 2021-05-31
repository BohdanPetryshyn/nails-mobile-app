import React from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, TopNavigation } from '@ui-kitten/components';
import PublishedPhotoCard from '../components/PublishedPhotoCard';
import { PublishedPhoto } from '../entities/PublishedPhoto';
import PublishPhotoNavigationAction from '../components/PublishPhotoNavigationAction';

const itemsStub: PublishedPhoto[] = [
  {
    photoUrl:
      'https://images.ulta.com/is/image/Ulta/2564644_prod_altimg_4?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg',
    userEmail: 'elina.19.ua@gmail.com',
    userFullName: 'Еліна Нечаєва',
    publishedDate: '2021-05-31T11:12:36+0000',
    userProfilePhoto:
      'https://salvemusic.com.ua/wp-content/uploads/2020/07/elina-nechayeva1-768x404.jpg',
  },
  {
    photoUrl:
      'https://images.ulta.com/is/image/Ulta/2564644_prod_altimg_4?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg',
    userEmail: 'elina.19.ua@gmail.com',
    userFullName: 'Еліна Нечаєва',
    publishedDate: '2021-05-31T11:12:36+0000',
    userProfilePhoto:
      'https://salvemusic.com.ua/wp-content/uploads/2020/07/elina-nechayeva1-768x404.jpg',
  },
  {
    photoUrl:
      'https://images.ulta.com/is/image/Ulta/2564644_prod_altimg_4?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg',
    userEmail: 'elina.19.ua@gmail.com',
    userFullName: 'Еліна Нечаєва',
    publishedDate: '2021-05-31T11:12:36+0000',
    userProfilePhoto:
      'https://salvemusic.com.ua/wp-content/uploads/2020/07/elina-nechayeva1-768x404.jpg',
  },
  {
    photoUrl:
      'https://images.ulta.com/is/image/Ulta/2564644_prod_altimg_4?op_sharpen=1&resMode=bilin&qlt=85&wid=800&hei=800&fmt=jpg',
    userEmail: 'elina.19.ua@gmail.com',
    userFullName: 'Еліна Нечаєва',
    publishedDate: '2021-05-31T11:12:36+0000',
    userProfilePhoto:
      'https://salvemusic.com.ua/wp-content/uploads/2020/07/elina-nechayeva1-768x404.jpg',
  },
];

export const TAB_TITLE = 'Роботи';

export default function () {
  const renderItem = (item: ListRenderItemInfo<PublishedPhoto>) => (
    <PublishedPhotoCard publishedPhoto={item.item} />
  );

  return (
    <SafeAreaLayout style={{ flex: 1 }}>
      <TopNavigation
        alignment="center"
        title={TAB_TITLE}
        accessoryRight={() => (
          <PublishPhotoNavigationAction
            onPhotoSelected={uri =>
              itemsStub.push({
                photoUrl: uri,
                userEmail: 'elina.19.ua@gmail.com',
                userFullName: 'Еліна Нечаєва',
                publishedDate: '2021-05-31T11:12:36+0000',
                userProfilePhoto:
                  'https://salvemusic.com.ua/wp-content/uploads/2020/07/elina-nechayeva1-768x404.jpg',
              })
            }
          />
        )}
      />
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={itemsStub}
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
