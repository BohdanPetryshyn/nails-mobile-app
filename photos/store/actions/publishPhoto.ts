import { AppThunk } from '../../../common/store/types';
import { PublishedPhoto } from '../../entities/PublishedPhoto';
import {
  selectUserEmail,
  selectUserFirstName,
  selectUserLastName,
  selectUserProfilePhoto,
} from '../../../user/store/slice';
import { PhotosService } from '../../api/PhotosService';
import { UploadsService } from '../../../common/api/UploadsService';

export default (
  localPhotoUri: string,
): AppThunk<Promise<PublishedPhoto>> => async (dispatch, getState) => {
  const photoUrl = await UploadsService.uploadPhotoFromFileSystem(
    localPhotoUri,
  );
  await PhotosService.create(photoUrl);

  const state = getState();
  const userEmail = selectUserEmail(state);
  const userFullName = `${selectUserFirstName(state)} ${selectUserLastName(
    state,
  )}`;
  const userProfilePhoto = selectUserProfilePhoto(state);
  return {
    photoUrl,
    userEmail: userEmail!,
    userFullName: userFullName!,
    userProfilePhoto: userProfilePhoto!,
    publishedDate: new Date().toISOString(),
  };
};
