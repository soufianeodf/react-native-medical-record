import React, {useEffect} from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { firebaseAuth } from '../../environment/config';

const Loading = (props) => {

  useEffect(() => {
    console.log('did moutn of loading');
    props.navigation.addListener('focus', () => {
      firebaseAuth.onAuthStateChanged(user => {
        props.navigation.navigate(user ? 'Main' : 'Login');
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#2db7ff" />
    </SafeAreaView>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    "flex": 1,
    "justifyContent": 'center',
    "alignItems": 'center',
  },
});
