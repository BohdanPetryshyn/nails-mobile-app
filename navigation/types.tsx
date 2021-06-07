import { AppointmentCreateRequest } from '../user/entities/appointment';

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  UserProfile: {
    email: string;
    appointmentCreateRequest?: AppointmentCreateRequest;
  };
  Chat: {
    email: string;
  };
  NotFound: undefined;
};

export type BottomTabParamList = {
  Schedule: undefined;
  MasterSearch: undefined;
  Chats: undefined;
  Photos: undefined;
  UpdateProfile: undefined;
};
