import React, { useEffect, useState } from 'react';
import { AuthService } from '../api/AuthService';
import { City } from '../../user/entities/city';
import { UserData } from '../../user/entities/user-data';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export default function (): [
  UserDataBlank | undefined,
  React.Dispatch<React.SetStateAction<UserDataBlank | undefined>>,
] {
  const [userData, setUserData] = useState<UserDataBlank>();

  useEffect(() => {
    async function fetchLoginData() {
      const loginData = await AuthService.getMyLoginData();

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

  profilePhoto: string;

  firstName: string;

  lastName: string;

  constructor({
    city,
    bio,
    profilePhoto,
    firstName,
    lastName,
  }: {
    city?: City;
    bio?: string;
    profilePhoto: string;
    firstName: string;
    lastName: string;
  }) {
    this.city = city;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  isFilled(): boolean {
    return Boolean(this.city);
  }

  toUserData(): UserData {
    return new UserData({
      ...this,
      city: this.city!,
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

  withFirstName(firstName: string): UserDataBlank {
    return new UserDataBlank({
      ...this,
      firstName,
    });
  }

  withLastName(lastName: string): UserDataBlank {
    return new UserDataBlank({
      ...this,
      lastName,
    });
  }
}
