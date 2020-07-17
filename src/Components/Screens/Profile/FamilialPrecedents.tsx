import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FamilialPrecedents = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View>
        <TextInput
          onChange={(text) => console.log(text)}
          value={'value'}
          placeholder="value"
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.navigate('EventsList')}>
          <Ionicons name={'ios-add-circle'} color={'#3394ef'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FamilialPrecedents;

const styles = StyleSheet.create({
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
});
