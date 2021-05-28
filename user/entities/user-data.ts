import { City } from './city';
import { UploadsService } from '../../common/api/UploadsService';
import { FileSystemService } from '../../common/device/FileSystemService';

export interface UserData {
  city: City;

  bio?: string;

  profilePhoto: string;

  firstName: string;

  lastName: string;
}

export class UserDataUtils {
  static async ensureProfilePhotoUploaded(
    userData: UserData,
  ): Promise<UserData> {
    if (FileSystemService.isFileSystemUri(userData.profilePhoto)) {
      const uploadedProfilePhoto = await UploadsService.uploadPhotoFromFileSystem(
        userData.profilePhoto,
      );

      return {
        ...userData,
        profilePhoto: uploadedProfilePhoto,
      };
    }

    return userData;
  }

  static getFullName(userData: UserData): string {
    return `${userData.firstName} ${userData.lastName}`;
  }
}
