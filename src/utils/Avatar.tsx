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
  const [progressBarPercentage, setProgressBarPercentage] = useState(0.5);
  const [onUpload, setOnUpload] = useState(false);
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

  function _uploadImage(uri) {
    // set the progress bar to zero
    setProgressBarPercentage(0);
    // make the progress bar visible
    setOnUpload(true);

    // path to existing file on filesystem
    const pathToFile = uri;
    // uploads file
    reference.putFile(pathToFile).on('state_changed', task => {
      setProgressBarPercentage(task.bytesTransferred / task.totalBytes);
      if (task.state === 'success') {
        console.log('not yeeeeet');
        setOnUpload(false);
      }
    });

    _getImage();
  }

  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => _avatarClicked()}>
      <Image style={styles.avatar} source={{uri: url}} />
      {onUpload ?  <ProgressBar progress={progressBarPercentage} width={60} color={'green'} /> : null}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  touchableOpacity: {
    marginLeft: 16,
    marginTop: 42,
    marginBottom: 6,
    width: 60,
    height: 60,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 1.5,
    marginBottom: 3,
  },
});
