import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmergencyContacts = ({navigation}) => {
  const [isPortrait, setIsPortrait] = useState(false);

  return (
    <View
      style={[
        styles.viewContainer,
        {
          marginTop: isPortrait ? '40%' : 0,
          justifyContent: isPortrait ? 'flex-start' : 'center',
        },
      ]}
      onLayout={(event) =>
        setIsPortrait(
          event.nativeEvent.layout.height >= event.nativeEvent.layout.width,
        )
      }>
      <Image
        style={styles.imageStyle}
        source={require('../../../../images/emergencycall.png')}
      />
      <Text style={styles.textStyle}>Emergency Contacts not Added</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEmergencyContact')}>
          <Ionicons name={'ios-add-circle'} color={'#661D54'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    marginTop: 15,
  },
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
