import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from '../utils/Avatar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const HeaderDrawer = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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
              setEmail(user.email);
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
      <Avatar />
      <View style={styles.textView}>
        <Text>{username}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
};

export default HeaderDrawer;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#2db7ff',
  },
  textView: {
    margin: 16,
    marginTop: 8,
  },
});
