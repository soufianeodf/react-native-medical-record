import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../Navigation/Navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'MedicationCourses'>;
};

const MedicationCourses: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, marginTop: 15}}>
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
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
});
