import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

const Avatar = () => {
  const [url, setUrl] = useState('gs://react-native-medical-record.appspot.com/app-images/avatar.png');
  const [avatar, setavatar] = useState('');

  useEffect(() => {
    storage()
      .ref('app-images/avatar.png')
      .getDownloadURL()
      .then(url => {
        setUrl(url);
      })
      .catch(error => alert(error));
  }, [url]);

  function _avatarClicked() {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log('Erreur : ', response.error);
      } else {
        console.log('Photo : ', response.uri);
        let requireSource = {uri: response.uri};
        setavatar(requireSource);
      }
    });
  }

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => _avatarClicked()}>
      <Image style={styles.avatar} source={avatar} />
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
