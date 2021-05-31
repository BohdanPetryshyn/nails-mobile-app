import authenticatedClient from './authenticatedClient';
import { FileSystemService } from '../device/FileSystemService';

const BASE_PATH = '/uploads';

export class UploadsService {
  static async getPhotoUploadSignedLink(): Promise<string> {
    const url = `${BASE_PATH}/photo-signed-url`;

    const uploadUrlResponse = await authenticatedClient.get(url);

    return uploadUrlResponse.data;
  }

  static async uploadPhotoFromFileSystem(fileUri: string): Promise<string> {
    const uploadUrl = await UploadsService.getPhotoUploadSignedLink();

    await FileSystemService.uploadToS3(fileUri, uploadUrl);

    return this.truncateQueryParams(uploadUrl);
  }

  private static truncateQueryParams(uploadUrl: string) {
    return uploadUrl.substring(0, uploadUrl.indexOf('?'));
  }
}
