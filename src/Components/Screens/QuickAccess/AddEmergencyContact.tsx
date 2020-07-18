import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function AddEmergencyContact() {
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  return (
    <ScrollView style={styles.viewContainer}>
      <Text style={styles.textStyle}>Contact Name</Text>
      <TextInput
        style={styles.textInputStyle}
        onChange={(text) => setContactName(text)}
        value={contactName}
        placeholder="Enter the contact name here"
      />
      <Text style={styles.textStyle}>Phone</Text>
      <TextInput
        style={styles.textInputStyle}
        onChange={(text) => setPhone(text)}
        value={phone}
        placeholder="Enter the phone number here"
      />
      <Text style={styles.textStyle}>City</Text>
      <TextInput
        style={styles.textInputStyle}
        onChange={(text) => setCity(text)}
        value={city}
        placeholder="Enter the city name here"
      />
      <TouchableOpacity
        onPress={() => alert('button pressed')}
        style={styles.buttonStyle}>
        <Text style={styles.textButton}>Add contact</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: '10%',
  },
  textStyle: {
    fontSize: 17,
    marginBottom: -10,
    marginTop: 30,
  },
  textInputStyle: {
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  buttonStyle: {
    backgroundColor: '#661D54',
    padding: 8,
    borderRadius: 2,
    marginTop: 30,
    marginBottom: 15,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 17,
    color: '#ddd',
  },
});
