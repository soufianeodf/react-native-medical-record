import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

const Avatar = ({avatar}) => {
  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => alert("Not implemented yet")}>
      <Image style={styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
}

export default Avatar;

const styles = StyleSheet.create({
  touchableOpacity: {
    "marginLeft": 16,
    "marginTop": 42,
    "marginBottom": 5,
    "width": 60,
    "height": 60,
  },
  avatar: {
    "width": 60,
    "height": 60,
    "borderRadius": 50,
    "borderColor": "#9B9B9B",
    "borderWidth": 1.5,
  },
});
