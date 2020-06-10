import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';

const Avatar = ({avatar}) => {
  const [url, setUrl] = useState('gs://react-native-medical-record.appspot.com/app-images/avatar.png');

  useEffect(() => {
    storage()
      .ref('app-images/avatar.png')
      .getDownloadURL()
      .then(url => {
        setUrl(url);
      })
      .catch(error => alert(error));
  }, [url]);

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => alert('Not implemented yet')}>
      <Image style={styles.avatar} source={{uri: url}} />
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  touchableOpacity: {
    marginLeft: 16,
    marginTop: 42,
    marginBottom: 5,
    width: 60,
    height: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 1.5,
  },
});
