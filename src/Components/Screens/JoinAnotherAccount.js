import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const JoinAnotherAccount = () => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <MapView
        style={{height: '90%', width: '100%'}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default JoinAnotherAccount;

const styles = StyleSheet.create({});
