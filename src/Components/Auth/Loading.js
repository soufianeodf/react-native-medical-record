import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-spinkit';

const Loading = ({navigation}) => {
  useEffect(() => {
    navigation.addListener('focus', () => {
      auth().onAuthStateChanged(user => {
        navigation.navigate(user ? 'Home' : 'Login');
      });
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner isVisible={true} type={'Pulse'} color="#3394ef" size={70} />
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
