import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Timeline from 'react-native-timeline-flatlist';

const Main = ({navigation}) => {
  const [username, setUsername] = useState('');

  const data = [
    {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
    {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
    {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
    {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
    {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
  ];

  useEffect(() => {
    navigation.addListener('focus', () => {
      let isMounted = true;
      auth().onAuthStateChanged(user => {
        if (user && isMounted) {
          firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
              setUsername(
                doc.data().username ? doc.data().username : 'Primary',
              );
            })
            .catch(error => {
              console.log(error.message);
            });
        } else {
          navigation.navigate('Login');
        }
      });
    });
    return () => {
      isMounted = false;
    };
  }, [navigation]);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.drawerButtonView}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.toggleDrawer()}>
          <FontAwesome name={'navicon'} color={'grey'} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Ionicons name={'md-search'} color={'grey'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <MaterialIcons name={'filter-list'} color={'grey'} size={25} />
        </TouchableOpacity>
      </View>
      <Timeline
        data={data}
        circleSize={20}
        circleColor="rgb(45,156,219)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{minWidth: 52}}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#ff9797',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{color: 'gray'}}
        options={{
          style: {paddingTop: 5, paddingLeft: 20},
        }}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.navigate('EventsList')}>
          <Ionicons name={'ios-add-circle'} color={'#2529B7'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: 20,
  },
  drawerButtonView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  touchableOpacity: {
    alignSelf: 'flex-start',
    height: 50,
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
});
