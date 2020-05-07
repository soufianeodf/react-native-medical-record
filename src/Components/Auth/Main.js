import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { firebaseAuth } from '../../environment/config';

const Main = (props) => {

  function _handleLogout() {
    firebaseAuth.signOut()
    .then(() => props.navigation.navigate("Login"));
  }

  return (
    <View style={styles.buttonView}>
      <Text>Welcome to the Main page</Text>
      <Button title="sign out" onPress={_handleLogout} />
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  buttonView: {
    "flex": 1,
    "justifyContent": "center",
    "alignItems": "center",
  },
});