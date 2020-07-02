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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DoctorAppointment = ({route}) => {
  const params = route.params != null ? route.params.item : null;
  const [appointmentType, setAppointmentType] = useState(params ? params.eventType : '');
  const [appointmentState, setAppointmentState] = useState('');
  const [treatmentProvider, setTreatmentProvider] = useState('');
  const [doctor, setDoctor] = useState(params ? params.title : '');
  const [specialization, setSpecialization] = useState(params ? params.description : '');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(
    moment(Date.now())
      .utc()
      .format('YYYY-MM-DD'),
  );
  const [time, setTime] = useState(
    moment(Date.now())
      .utc()
      .format('HH:mm'),
  );
  const [errorMessage, setErrorMessage] = useState('');

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
    date = moment(date)
      .utc()
      .format('YYYY-MM-DD');
    setDate(date);
    hideDatePicker();
  };

  const handleTimeConfirm = time => {
    time = moment(time)
      .utc()
      .format('HH:mm');
    setTime(time);
    hideTimePicker();
  };

  const _addAppointment = () => {
    if (appointmentType === '' || doctor === '' || specialization === '') {
      setErrorMessage('Please fill the necessary fields.');
    } else {
      auth().onAuthStateChanged(user => {
        if (user) {
          let items = [];
          firestore()
            .collection('calendar')
            .doc(user.uid)
            .collection('appointment-list')
            .get()
            .then(querySnapshot => {
              console.log('Total calendar items -----> : ', querySnapshot.size);
              querySnapshot.forEach(documentSnapshot => {
                Object.keys(documentSnapshot.data()).map(key => {
                  if (key === date) {
                    documentSnapshot.data()[key].map(value => {
                      items.push({
                        time: value.time,
                        appointmentType: value.appointmentType,
                        appointmentState: value.appointmentState,
                        treatmentProvider: value.treatmentProvider,
                        doctor: value.doctor,
                        specialization: value.specialization,
                      });
                    });
                  }
                });
              });
              let merged = {
                ...{
                  [date]: [
                    {
                      time,
                      appointmentType,
                      appointmentState,
                      treatmentProvider,
                      doctor,
                      specialization,
                    },
                    ...items,
                  ],
                },
              };
              firestore()
                .collection('calendar')
                .doc(user.uid)
                .collection('appointment-list')
                .doc(date)
                .set(merged)
                .then(() => Alert.alert('Appointment added with success.'));
            })
            .catch(error => Alert.alert(error));
        }
      });
    }
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.headerView}>
          <Text style={styles.textTitle}>Appointment</Text>
          <TouchableOpacity onPress={() => _addAppointment()}>
            <Entypo name={'check'} size={35} />
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{errorMessage}</Text>
          </View>
        ) : null}

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

        <View style={styles.notificationView}>
          <Text style={styles.text}>Notification</Text>
          <TouchableOpacity onPress={() => alert('clicked')}>
            <Text style={[styles.text, {opacity: 0.6}]}>
              Disabled  <Ionicons name={'ios-arrow-forward'} size={16} />
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.informationView}>
          <View style={[styles.textSubTitlesView, {marginVertical: 20}]}>
            <Feather name="file-text" size={22} style={{marginRight: 5}} />
            <Text style={styles.text}>Information</Text>
          </View>

          <FloatingLabelInput
            value={appointmentType}
            onChangeText={text => setAppointmentType(text)}
            label="Appointment type*"
            theValue={appointmentType}
          />
          <FloatingLabelInput
            value={appointmentState}
            onChangeText={text => setAppointmentState(text)}
            label="Appointment state"
            theValue={appointmentState}
          />
          <FloatingLabelInput
            value={treatmentProvider}
            onChangeText={text => setTreatmentProvider(text)}
            label="Treatment provider"
            theValue={treatmentProvider}
          />
          <FloatingLabelInput
            value={doctor}
            onChangeText={text => setDoctor(text)}
            label="Doctor*"
            theValue={doctor}
          />
          <FloatingLabelInput
            value={specialization}
            onChangeText={text => setSpecialization(text)}
            label="Specialization*"
            theValue={specialization}
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
  notificationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorContainer: {
    padding: 5,
    marginTop: -15,
    marginBottom: 10,
  },
  errorLabel: {
    color: '#f44336',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
