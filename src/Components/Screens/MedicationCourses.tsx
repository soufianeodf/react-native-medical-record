import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

const MedicationCourses = () => {
  return (
    <View style={{flex: 1, marginTop: 15}}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TextInput
            style={styles.textInput}
            // onChangeText={theUsername => setUsername(theUsername)}
            placeholder={'Username'}
            // value={username}
            // onSubmitEditing={_handleUpdate}
          />
          <TextInput
            style={styles.textInput}
            // onChangeText={fullName => setFullName_card_1(fullName)}
            placeholder={'Full Name'}
            // value={fullName_card_1}
            // onSubmitEditing={_handleUpdate}
          />

          <TouchableOpacity
            style={styles.touchableOpacityDatePicker}
            // onPress={_showDatePicker}
            >
            <TextInput
              style={[styles.textInput, {width: '96%'}]}
              editable={false}
              placeholder={'Date of birth'}
              // value={birthDate}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder={'Gender'}
            // onTouchEnd={() => {
            //   setIsGenderVisible(true);
            //   Keyboard.dismiss();
            // }}
            // value={gender}
            caretHidden={true}
          />
          <TextInput
            style={styles.textInput}
            editable={false}
            placeholder={'Email'}
            // value={email}
          />
          <TextInput
            style={styles.textInput}
            // onChangeText={thePhone => setPhone(thePhone)}
            placeholder={'Phone'}
            keyboardType={'phone-pad'}
            // value={phone}
            // onSubmitEditing={_handleUpdate}
          />
        </View>
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
});
