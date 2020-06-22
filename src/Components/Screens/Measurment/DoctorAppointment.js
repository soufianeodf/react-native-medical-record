import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FloatingLabelInput from '../../../utils/forms/FloatingLabelInput';

const DoctorAppointment = () => {
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentState, setAppointmentState] = useState('');
  const [treatmentProvider, setTreatmentProvider] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setdate] = useState(
    moment(Date.now())
      .utc()
      .format('YYYY/MM/DD'),
  );
  const [time, settime] = useState(
    moment(Date.now())
      .utc()
      .format('HH:mm'),
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const handleTimeConfirm = date => {
    console.warn('A time has been picked: ', date);
    hideTimePicker();
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.headerView}>
          <Text style={styles.textTitle}>Appointment</Text>
          <TouchableOpacity onPress={() => Alert.alert('button pressed')}>
            <Entypo name={'check'} size={35} />
          </TouchableOpacity>
        </View>

        <View style={styles.textSubTitlesView}>
          <Ionicons name="md-calendar" size={22} style={{marginRight: 10}} />
          <Text style={styles.text}>Date and time</Text>
        </View>

        <View style={styles.timeView}>
          <TouchableWithoutFeedback onPress={showDatePicker}>
            <Text style={styles.text}>
              {' '}
              {date} <MaterialIcons name="edit" size={16} />
            </Text>
          </TouchableWithoutFeedback>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableWithoutFeedback onPress={showTimePicker}>
            <Text style={styles.text}>
              {' '}
              {time} <MaterialIcons name={'edit'} size={16} />
            </Text>
          </TouchableWithoutFeedback>

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
        </View>

        <View style={styles.informationView}>
          <View style={[styles.textSubTitlesView, {marginVertical: 20}]}>
            <Feather name="file-text" size={22} style={{marginRight: 5}} />
            <Text style={styles.text}>Information</Text>
          </View>

          <FloatingLabelInput
            value={appointmentType}
            onChangeText={text => setAppointmentType(text)}
            label="Appointment type"
          />
          <FloatingLabelInput
            value={appointmentState}
            onChangeText={text => setAppointmentState(text)}
            label="Appointment state"
          />
          <FloatingLabelInput
            value={treatmentProvider}
            onChangeText={text => setTreatmentProvider(text)}
            label="Treatment provider"
          />
          <FloatingLabelInput
            value={doctor}
            onChangeText={text => setDoctor(text)}
            label="Doctor"
          />
          <FloatingLabelInput
            value={specialization}
            onChangeText={text => setSpecialization(text)}
            label="Specialization"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorAppointment;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#dee1f2',
  },
  scrollViewContainer: {
    flexGrow: 1,
    margin: 20,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '10%',
  },
  textTitle: {
    fontSize: 35,
  },
  textSubTitlesView: {
    flexDirection: 'row',
    opacity: 0.6,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  informationView: {
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
  },
});
