import React, { useEffect, useState } from 'react';
import { AuthService } from '../api/AuthService';
import { City } from '../../user/entities/city';
import { UserData } from '../../user/entities/user-data';

export default function (): [
  UserDataBlank | undefined,
  React.Dispatch<React.SetStateAction<UserDataBlank | undefined>>,
] {
  const [userData, setUserData] = useState<UserDataBlank>();

  useEffect(() => {
    async function fetchLoginData() {
      const loginData = await AuthService.getMe();

      setUserData(
        new UserDataBlank({
          ...loginData,
        }),
      );
    }

    fetchLoginData();
  }, []);

  return [userData, setUserData];
}

class UserDataBlank {
  city?: City;

  bio?: string;

  profilePhoto?: string;

  constructor({
    city,
    bio,
    profilePhoto,
  }: {
    city?: City;
    bio?: string;
    profilePhoto?: string;
  }) {
    this.city = city;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
  }

  isFilled(): boolean {
    return Boolean(this.city && this.profilePhoto);
  }

  toUserData(): UserData {
    return new UserData({
      ...this,
      city: this.city!,
      profilePhoto: this.profilePhoto!,
    });
  }

  withCity(city: City): UserDataBlank {
    return new UserDataBlank({
      ...this,
      city,
    });
  }

  withProfilePhoto(profilePhoto: string): UserDataBlank {
    return new UserDataBlank({
      ...this,
      profilePhoto,
    });
  }
}
