import React, { useState } from 'react';
import { SafeAreaLayout } from '../../common/components/SafeAreaLayout';
import PopoverCalendar from '../components/PopoverCalendar';
import { useSelector } from 'react-redux';
import AddWorkingHoursBanner from '../components/AddWorkingHoursBanner';
import DayAppointments from '../components/DayAppointments';
import { StyleSheet } from 'react-native';
import { DateUtils } from '../../common/utils/DateUtils';
import { selectDayWorkingHours } from '../../user/store/slice';
import { useAppDispatch } from '../../common/store/hooks';
import deleteAppointment from '../store/actions/deleteAppointment';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList, RootStackParamList } from '../../navigation/types';
import { Appointment } from '../../user/entities/appointment';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export default function ({ navigation }: { navigation: NavigationProp }) {
  const dispatch = useAppDispatch();
  const [selectedDay, setDay] = useState<Date>(
    DateUtils.getStartOfDay(new Date()),
  );

  const selectedDayWorkingHours = useSelector(
    selectDayWorkingHours(selectedDay),
  );

  const onAppointmentPress = (appointment: Appointment) => {
    navigation.navigate('UserProfile', { email: appointment.clientEmail });
  };

  const onAppointmentDelete = (day: string, appointmentId: string) => {
    dispatch(deleteAppointment(day, appointmentId));
  };

  return (
    <SafeAreaLayout style={styles.container}>
      <PopoverCalendar date={selectedDay} onDateSelect={setDay} />
      {selectedDayWorkingHours ? (
        <DayAppointments
          day={selectedDay}
          workingHours={selectedDayWorkingHours}
          onAppointmentPress={onAppointmentPress}
          onAppointmentDelete={onAppointmentDelete}
        />
      ) : (
        <AddWorkingHoursBanner day={selectedDay} />
      )}
    </SafeAreaLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Schedule'>,
  StackNavigationProp<RootStackParamList>
>;
