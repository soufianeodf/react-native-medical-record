import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const JoinAnotherAccount = () => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 31.5889,
    longitude: -7.3626,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    locateCurrentPosition();
  }, []);

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('------>', position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setInitialPosition(region);
      },
      error => console.error(error.message),
      {
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <MapView
        style={{height: '90%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followUserLocation
        initialRegion={initialPosition}
      />
    </View>
  );
};

export default JoinAnotherAccount;

const styles = StyleSheet.create({});
