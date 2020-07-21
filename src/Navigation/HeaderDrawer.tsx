import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from '../utils/Avatar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HeaderDrawer = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  let isMounted = false;

  useEffect(() => {
    navigation.addListener('focus', () => {
      isMounted = true;
      auth().onAuthStateChanged((user) => {
        if (user && isMounted) {
          firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              setUsername(
                doc.data() != null ? doc.data().username : 'Primary',
              );
              setEmail(user.email);
            })
            .catch((error) => {
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
    <LinearGradient colors={['#56CCF2', '#2F80ED']} style={{flex: 1}}>
      <Avatar />
      <View style={styles.textView}>
        <Text>{username}</Text>
        <Text>{email}</Text>
      </View>
    </LinearGradient>
  );
};

export default HeaderDrawer;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  textView: {
    margin: 16,
    marginTop: 8,
  },
});
