import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AddEmergencyContact({route, navigation}) {
  const [uid, setUid] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return subscriber;
  }, []);

  const _isFormValidated = () => {
    if (
      contactName !== '' &&
      contactName.trim().length > 0 &&
      phone !== '' &&
      phone.trim().length > 0 &&
      city !== '' &&
      city.trim().length > 0
    ) {
      return true;
    }
    return false;
  };

  const addContact = () => {
    if (_isFormValidated()) {
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
          route.params._setSelected();
          navigation.goBack();
        })
        .catch(() =>
          setErrorMessage('There was a problem saving your contact.'),
        );
    }
  };

  return (
    <ScrollView style={styles.viewContainer}>
      {errorMessage ? (
        <View style={styles.successMessage}>
          <View style={styles.errorMessageIcon}>
            <FontAwesome name={'exclamation-circle'} size={20} />
          </View>
          <Text style={styles.errorTextMessage}>{errorMessage}</Text>
        </View>
      ) : null}

      <Text style={styles.textStyle}>Contact Name</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => {
          setContactName(text);
          if (errorMessage !== '') {
            setErrorMessage('');
          }
        }}
        value={contactName}
        placeholder="Enter the contact name here"
      />
      <Text style={styles.textStyle}>Phone</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => {
          setPhone(text);
          if (errorMessage !== '') {
            setErrorMessage('');
          }
        }}
        value={phone}
        keyboardType={'phone-pad'}
        placeholder="Enter the phone number here"
      />
      <Text style={styles.textStyle}>City</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={(text) => {
          setCity(text);
          if (errorMessage !== '') {
            setErrorMessage('');
          }
        }}
        value={city}
        placeholder="Enter the city name here"
      />
      <TouchableOpacity
        disabled={!_isFormValidated()}
        onPress={addContact}
        style={[styles.buttonStyle, {opacity: _isFormValidated() ? 1 : 0.6}]}>
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
  successMessage: {
    alignItems: 'center',
  },
  errorMessageIcon: {
    position: 'absolute',
    top: '36%',
    left: '7%',
    zIndex: 5,
  },
  errorTextMessage: {
    textAlign: 'center',
    backgroundColor: '#D94F4F',
    alignItems: 'center',
    padding: 8,
    width: '89%',
    borderRadius: 2,
    marginTop: 8,
  },
});
