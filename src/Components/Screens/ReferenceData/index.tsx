import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../Navigation/Navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'ReferenceData'>;
};

const ReferenceData: React.FC<Props> = ({navigation}) => {

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name={'navicon'} color={'grey'} size={25} />
          </TouchableOpacity>
          <View style={[styles.textView, {marginLeft: '21%'}]}>
            <Text style={styles.textStyle}>Reference data</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#2c8bdb'}]}
          onPress={() => navigation.navigate('Doctors')}>
          <View style={styles.iconView}>
            <Fontisto name={'doctor'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 19}]}>
            <Text style={styles.textStyle}>DOCTORS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#2f95ea'}]}
          onPress={() => navigation.navigate('MedicationDatabase')}>
          <View style={styles.iconView}>
            <FontAwesome5 name={'book-medical'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 22.5}]}>
            <Text style={styles.textStyle}>MEDICATIONS DATABASE</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#3ba1f6'}]}
          onPress={() => navigation.navigate('NearbyHospitals')}>
          <View style={styles.iconView}>
            <FontAwesome5 name={'hospital-alt'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 16}]}>
            <Text style={styles.textStyle}>NEARBY HOSPITALS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#46a7f8'}]}
          onPress={() => navigation.navigate('Specializations')}>
          <View style={{marginLeft: 32}}>
            <FontAwesome5 name={'code-branch'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 24}]}>
            <Text style={styles.textStyle}>SPECIALIZATIONS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#55b2ff'}]}
          onPress={() => alert('Not implemented yet.')}>
          <View style={{marginLeft: 22}}>
            <FontAwesome5 name={'diagnoses'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 19}]}>
            <Text style={styles.textStyle}>DIAGNOSES</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#6dbcff'}]}
          onPress={() => alert('Not implemented yet.')}>
          <View style={styles.iconView}>
            <Fontisto name={'test-tube'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 28}]}>
            <Text style={styles.textStyle}>TESTS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#81c6ff'}]}
          onPress={() => alert('Not implemented yet.')}>
          <View style={styles.iconView}>
            <FontAwesome5 name={'file-signature'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 22}]}>
            <Text style={styles.textStyle}>RECOMMENDATIONS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.innerContainer, {backgroundColor: '#9ad0ff'}]}
          onPress={() => alert('Not implemented yet.')}>
          <View style={{marginLeft: 27}}>
            <FontAwesome5 name={'clipboard-list'} color={'white'} size={35} />
          </View>
          <View style={[styles.textView, {marginLeft: 35}]}>
            <Text style={styles.textStyle}>SYMPTOMS</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReferenceData;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: '4.82%',
  },
  iconView: {
    marginLeft: 25,
  },
  textView: {
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'serif',
  },
});
