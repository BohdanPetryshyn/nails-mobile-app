import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { City } from './city';
import { UploadsService } from '../../common/api/UploadsService';
import { FileSystemService } from '../../common/device/FileSystemService';

export interface UserDataConstructorParams {
  city: City;
  bio?: string;
  profilePhoto: string;
  firstName: string;
  lastName: string;
}

@Exclude()
export class UserData {
  @Expose()
  @IsEnum(City)
  city: City;

  @Expose()
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @Expose()
  @IsUrl()
  profilePhoto: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  constructor({
    city,
    bio,
    profilePhoto,
    firstName,
    lastName,
  }: UserDataConstructorParams) {
    this.city = city;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  async ensureProfilePhotoUploaded(): Promise<void> {
    if (FileSystemService.isFileSystemUri(this.profilePhoto)) {
      this.profilePhoto = await UploadsService.uploadPhotoFromFileSystem(
        this.profilePhoto,
      );
    }
  }
}
