import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../utils/Avatar';

const HeaderDrawer = () => {
  return (
    <View style={styles.viewContainer}>
      <Avatar avatar={require("../../Images/avatar.png")} />
      <View style={styles.textView}>
        <Text>Primary</Text>
        <Text>soufiane.odf@gmail.com</Text>
      </View>
    </View>
  );
}

export default HeaderDrawer;

const styles = StyleSheet.create({
  viewContainer: {
    "flex": 1,
    "backgroundColor": "#2db7ff",
  },
  textView: {
    "margin": 16,
  },
});
