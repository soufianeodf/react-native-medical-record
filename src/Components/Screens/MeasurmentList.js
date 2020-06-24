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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function MeasurmentList({navigation}) {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.titleText}>Choose the categeory</Text>
      <View style={styles.innerView}>
        <TouchableWithoutFeedback
          style={[styles.touchableWithoutFeedbackStyle, {marginRight: 20}]}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              name={'blood-bag'}
              color={'#0b42a7'}
              size={35}
            />
          </View>
          <Text style={styles.textSubTitle}>BLOOD</Text>
          <Text style={styles.textSubTitle}>PRESSURE</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={[styles.touchableWithoutFeedbackStyle, {marginRight: 20}]}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <Entypo name={'ruler'} color={'#0b42a7'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>HEIGHT</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedbackStyle}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <Ionicons name={'ios-pulse'} color={'#0b42a7'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>PULSE</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={[styles.touchableWithoutFeedbackStyle, {marginRight: 10}]}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <Fontisto name={'blood'} color={'#0b42a7'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>SUGAR LEVEL</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={styles.touchableWithoutFeedbackStyle}
          onPress={() => alert('clicked')}>
          <View style={styles.iconView}>
            <FontAwesome5 name={'weight'} color={'#0b42a7'} size={35} />
          </View>
          <Text style={styles.textSubTitle}>WEIGHT</Text>
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
