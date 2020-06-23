import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function EventsList({ navigation }) {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#0b42a7', paddingHorizontal: 10, justifyContent: 'center'}}>
      <Text style={{color: 'white', textAlign: 'center', marginTop: '-15%', marginBottom: 20, fontSize: 22}}>Choose the type of the event you want to add</Text>
      <View style={{flexWrap: 'wrap',flexDirection: 'row', justifyContent: 'space-around'}}>
        
        <TouchableWithoutFeedback style={{alignItems: 'center', marginVertical: 20, marginRight: 10}} onPress={() => navigation.navigate('DoctorAppointment')}>
          <View style={{padding: 16, backgroundColor: 'white', width: 67, hieght: 67, borderRadius: 1000, marginBottom: 10, alignItems: 'center'}}>
            <Fontisto name={'doctor'} color={'#fdc92e'} size={35} />
          </View>
          <Text style={{color: 'white'}}>DOCTOR</Text>
          <Text style={{color: 'white'}}>APPOINTMENT</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={{alignItems: 'center', marginVertical: 20}} onPress={() => alert('clicked')}>
          <View style={{padding: 16, backgroundColor: 'white', width: 67, hieght: 67, borderRadius: 1000, marginBottom: 10, alignItems: 'center'}}>
            <Fontisto name={'test-tube'} color={'#ef7650'} size={35} />
          </View>
          <Text style={{color: 'white'}}>TEST</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={{alignItems: 'center', marginVertical: 20}} onPress={() => alert('clicked')}>
          <View style={{padding: 16, backgroundColor: 'white', width: 67, hieght: 67, borderRadius: 1000, marginBottom: 10, alignItems: 'center'}}>
            <MaterialCommunityIcons name={'tape-measure'} color={'#ee6492'} size={35} />
          </View>
          <Text style={{color: 'white'}}>MEASUREMENT</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={{alignItems: 'center', marginVertical: 20}} onPress={() => alert('clicked')}>
          <View style={{padding: 16, backgroundColor: 'white', width: 67, hieght: 67, borderRadius: 1000, marginBottom: 10, alignItems: 'center'}}>
            <FontAwesome name={'thermometer-full'} color={'#7fdde9'} size={35} />
          </View>
          <Text style={{color: 'white'}}>DISEASE</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={{alignItems: 'center', marginVertical: 20}} onPress={() => alert('clicked')}>
          <View style={{padding: 16, backgroundColor: 'white', width: 67, hieght: 67, borderRadius: 1000, marginBottom: 10, alignItems: 'center'}}>
            <Fontisto name={'pills'} color={'#b388fe'} size={35} />
          </View>
          <Text style={{color: 'white'}}>DRUGS</Text>
          <Text style={{color: 'white'}}>RECEPTION</Text>
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
  buttonView: {
    position: 'absolute',
    bottom: '3%',
    left: '47%',
  },
});
