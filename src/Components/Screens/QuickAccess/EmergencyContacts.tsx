import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EmergencyContacts({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={styles.imageStyle}
        source={require('../../../../images/emergencycall.png')}
      />
      <Text style={{fontSize: 18, marginTop: 15}}>Emergency Contacts not Added</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEmergencyContact')}>
          <Ionicons name={'ios-add-circle'} color={'#661D54'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
  imageStyle: {
    width: 150,
    height: 150,
  },
});
