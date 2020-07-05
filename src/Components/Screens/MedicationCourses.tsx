import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MedicationCourses = ({navigation}) => {
  const [courseTilte, setCourseTilte] = useState('');
  const [medication, setMedication] = useState('');
  const [manufacturingForm, setManufacturingForm] = useState('');

  return (
    <View style={{flex: 1, marginTop: 15}}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TextInput
            style={[styles.textInput, {width: '100%'}]}
            onChangeText={theCourseTilte => setCourseTilte(theCourseTilte)}
            placeholder={'Course title'}
            value={courseTilte}
            // onSubmitEditing={_handleUpdate}
          />
          <TextInput
            style={[styles.textInput, {width: '100%'}]}
            onTouchEnd={() => {
              navigation.navigate('MedicationDatabase', {setMedication});
              Keyboard.dismiss();
            }}
            placeholder={'Medication'}
            value={medication}
            // onSubmitEditing={_handleUpdate}
          />

          <TextInput
            style={[styles.textInput, {width: '100%'}]}
            placeholder={'Manufacturing form'}
            // onTouchEnd={() => {
            //   setIsGenderVisible(true);
            //   Keyboard.dismiss();
            // }}
            // value={gender}
            caretHidden={true}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={theManufacturingForm =>
              setManufacturingForm(theManufacturingForm)
            }
            placeholder={'Dosage'}
            value={manufacturingForm}
            keyboardType={'numeric'}
          />
          <TextInput
            style={styles.textInput}
            // onChangeText={thePhone => setPhone(thePhone)}
            placeholder={'M. unit'}
            keyboardType={'phone-pad'}
            // value={phone}
            // onSubmitEditing={_handleUpdate}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TextInput
            style={[styles.textInput, {width: '100%'}]}
            // onChangeText={theUsername => setUsername(theUsername)}
            placeholder={'From date'}
            // value={username}
            // onSubmitEditing={_handleUpdate}
          />
          <TextInput
            style={[styles.textInput, {width: '100%'}]}
            // onChangeText={fullName => setFullName_card_1(fullName)}
            placeholder={'Course duration'}
            // value={fullName_card_1}
            // onSubmitEditing={_handleUpdate}
          />

          <TextInput
            style={[styles.textInput, {width: '100%'}]}
            placeholder={'Taking interval'}
            // onTouchEnd={() => {
            //   setIsGenderVisible(true);
            //   Keyboard.dismiss();
            // }}
            // value={gender}
            caretHidden={true}
          />
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedicationCourse')}>
          <Ionicons name={'ios-add-circle'} color={'#3394ef'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicationCourses;

const styles = StyleSheet.create({
  card: {
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 5,
  },
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '48%',
    marginHorizontal: 3,
    marginVertical: 10,
    padding: 3,
  },
  touchableOpacityDatePicker: {
    width: '50%',
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
});
