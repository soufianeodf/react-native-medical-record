import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from '../../environment/config';

export const Logout = () => {
  return (
    <View style={styles.viewContainer}>
        <FontAwesome5 name="power-off" size={18} />
        <Text style={styles.text}> Quit</Text>
    </View>
  );
}

export function _handleLogout(gotToLogin) {
  firebase.auth().signOut()
  .then(() => gotToLogin);
}

const styles = StyleSheet.create({
  viewContainer: {
    "flex": 1,
    "flexDirection": "row",
  },
  text: {
    "marginLeft": 32,
  },
});
