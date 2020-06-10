import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SugarLevel = () => {
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
      <View style={styles.validateIcon}>
        <TouchableOpacity onPress={() => alert('button pressed')}>
          <Entypo name={'check'} size={35} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.textTitle}>Sugar level</Text>

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

          <TextInput
            style={styles.textInput}
            placeholder="Sugar level"
            onChangeText={text => console.log(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SugarLevel;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#dee1f2',
  },
  validateIcon: {
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    margin: 20,
  },
  textTitle: {
    fontSize: 35,
    marginTop: '20%',
    marginBottom: '13%',
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
  textInput: {
    height: 40,
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#aa9e9e',
    borderStyle: 'solid',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
