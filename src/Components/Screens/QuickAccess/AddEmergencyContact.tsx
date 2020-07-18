import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function AddEmergencyContact({navigation}) {
  const [uid, setUid] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('useEffect');
        setUid(user.uid);
      }
    });
    return subscriber;
  }, []);

  const addContact = () => {
    firestore()
      .collection('emergencyContacts')
      .doc(uid)
      .collection('listContacts')
      .add({
        contactName,
        phone,
        city,
      })
      .then(() => {
        console.log('Your changes have been saved.');
      })
      .catch(() => console.error('There was a problem saving your changes.'));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <Text style={styles.textStyle}>Contact Name</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setContactName(text)}
        value={contactName}
        placeholder="Enter the contact name here"
      />
      <Text style={styles.textStyle}>Phone</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setPhone(text)}
        value={phone}
        placeholder="Enter the phone number here"
      />
      <Text style={styles.textStyle}>City</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => setCity(text)}
        value={city}
        placeholder="Enter the city name here"
      />
      <TouchableOpacity onPress={addContact} style={styles.buttonStyle}>
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
