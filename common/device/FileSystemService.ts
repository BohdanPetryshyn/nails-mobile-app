import * as FileSystem from 'expo-file-system';
import mime from 'mime-types';

const HTTP_SUCCESS = 200;

export class FileSystemService {
  static async uploadToS3(fromUri: string, toUrl: string): Promise<void> {
    const result = await FileSystem.uploadAsync(toUrl, fromUri, {
      httpMethod: 'PUT',
      headers: {
        ['Content-Type']: FileSystemService.getMimeTypeOrThrow(fromUri),
      },
    });

    if (result.status !== HTTP_SUCCESS) {
      throw new Error(`Failed to upload file ${fromUri} to ${toUrl}`);
    }
  }

  static isFileSystemUri(uri: string): boolean {
    return uri.startsWith('file://');
  }

  static getMimeTypeOrThrow(fileName: string): string {
    const type = mime.lookup(fileName);

    if (!type) {
      throw new Error(`Failed to determine mime type of file ${fileName}`);
    }

    return type;
  }
}
