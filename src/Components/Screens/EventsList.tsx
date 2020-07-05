import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function EventsList({navigation}) {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.titleText}>
        Choose the type of the event you want to add
      </Text>
      <View style={styles.innerView}>
        <TouchableWithoutFeedback
          style={[styles.touchableWithoutFeedbackStyle, {marginRight: 10}]}
          onPress={() => navigation.navigate('DoctorAppointment')}>
          <View style={styles.iconView}>
            <Fontisto name={'doctor'} color={'#fdc92e'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>DOCTOR</Text>
          <Text style={styles.textSubTitle}>APPOINTMENT</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedbackStyle}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <Fontisto name={'test-tube'} color={'#ef7650'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>TEST</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedbackStyle}
          onPress={() => navigation.navigate('MeasurmentList')}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              name={'tape-measure'}
              color={'#ee6492'}
              size={35}
            />
          </View>
          <Text style={styles.textSubTitle}>MEASUREMENT</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedbackStyle}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <FontAwesome
              name={'thermometer-full'}
              color={'#7fdde9'}
              size={35}
            />
          </View>
          <Text style={styles.textSubTitle}>DISEASE</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedbackStyle}
          onPress={() => navigation.navigate('MedicationCourse')}>
          <View style={styles.iconView}>
            <Fontisto name={'pills'} color={'#b388fe'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>DRUGS</Text>
          <Text style={styles.textSubTitle}>RECEPTION</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name={'closecircle'} color={'white'} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#0b42a7',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    marginTop: '-15%',
    marginBottom: 20,
    fontSize: 22,
  },
  innerView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  touchableWithoutFeedbackStyle: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconView: {
    padding: 16,
    backgroundColor: 'white',
    width: 67,
    borderRadius: 1000,
    marginBottom: 10,
    alignItems: 'center',
  },

  textSubTitle: {
    color: 'white',
  },
  buttonView: {
    position: 'absolute',
    bottom: '3%',
    left: '47%',
  },
});
