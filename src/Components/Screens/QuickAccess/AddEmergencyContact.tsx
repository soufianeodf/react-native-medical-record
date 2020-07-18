import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

export default function AddEmergencyContact() {
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');

  return (
    <View style={{flex: 1, paddingHorizontal: 10, marginTop: '10%'}}>
      <Text style={{fontSize: 17, marginBottom: -10, marginTop: 30}}>Contact Name</Text>
      <TextInput style={{borderBottomWidth: 1, paddingBottom: 0}} onChange={(text) => setContactName(text)} value={contactName} placeholder='Enter the contact name here' />
      <Text style={{fontSize: 17, marginBottom: -10, marginTop: 30}}>Phone</Text>
      <TextInput style={{borderBottomWidth: 1, paddingBottom: 0}} onChange={(text) => setPhone(text)} value={phone} placeholder='Enter the phone number here' />
      <Text style={{fontSize: 17, marginBottom: -10, marginTop: 30}}>City</Text>
      <TextInput style={{borderBottomWidth: 1, paddingBottom: 0}} onChange={(text) => setCity(text)} value={city} placeholder='Enter the city name here' />
      <TouchableOpacity onPress={() => alert('button pressed')} style={{backgroundColor: '#661D54', padding: 8, borderRadius: 2, marginTop: 30}} >
        <Text style={{textAlign: 'center', fontSize: 17, color: '#ddd'}}>Add contact</Text>
      </TouchableOpacity>
    </View>
  );
}
