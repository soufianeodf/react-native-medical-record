import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import ProgressBar from 'react-native-progress/Bar';

const Avatar = () => {
  const [url, setUrl] = useState(
    'gs://react-native-medical-record.appspot.com/app-images/avatar.png',
  );
  const [uuid, setUuid] = useState(null);
  const isInitMounted = useRef(true);
  const reference = storage().ref(`app-images/${uuid}/avatar.png`);

  useEffect(() => {
    if (isInitMounted.current) {
      console.log('form if ');
      isInitMounted.current = false;
      auth().onAuthStateChanged(user => {
        if (user) {
          setUuid(user.uid);
        }
      });
    }
    console.log('form useEffect ' + uuid);
    _getImage();
  });

  function _avatarClicked() {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log('Erreur : ', response.error);
      } else {
        console.log('Photo : ', response.uri);
        _uploadImage(response.uri);
      }
    });
  }

  function _getImage() {
    storage()
      .ref(`app-images/${uuid}/avatar.png`)
      .getDownloadURL()
      .then(theurl => {
        console.log('i am getting the image');
        setUrl(theurl);
      })
      .catch(error => console.log(error));
  }

  async function _uploadImage(uri) {
    // path to existing file on filesystem
    const pathToFile = uri;
    // uploads file
    await reference.putFile(pathToFile);
    _getImage();
  }

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => _avatarClicked()}>
      <Image style={styles.avatar} source={{uri: url}} />
      <ProgressBar progress={progressBarPercentage} width={60} color={'green'} />
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
