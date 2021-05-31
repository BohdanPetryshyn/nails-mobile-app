import { DateUtils } from '../../common/utils/DateUtils';

export interface PublishedPhoto {
  photoUrl: string;
  userEmail: string;
  userFullName: string;
  userProfilePhoto: string;
  publishedDate: string;
}

export class PublishedPhotoUtils {
  static getDateString(publishedPhoto: PublishedPhoto) {
    const publishedDate = new Date(publishedPhoto.publishedDate);

    return DateUtils.toLocalDateTimeString(publishedDate);
  }
}
