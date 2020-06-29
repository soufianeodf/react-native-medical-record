import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const JoinAnotherAccount = () => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 31.5889,
    longitude: -7.3626,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    locateCurrentPosition();
  }, []);

  const nearbyHospitals = (latitude, longitude) => {
    var places = [];
    fetch(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        latitude +
        ',' +
        longitude +
        '&radius=10000&type=hospital&key=AIzaSyBKufJtc7JQhJV_esN9vdubqz3VqMTFnHs',
    )
      .then(res => {
        return res.json();
      })
      .then(res => {
        for (let googlePlace of res.results) {
          var place = {};
          var myLat = googlePlace.geometry.location.lat;
          var myLong = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: myLat,
            longitude: myLong,
          };
          place.coordinate = coordinate;
          place.placeName = googlePlace.name;
          places.push(place);
        }
        setMarkers(places);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        nearbyHospitals(region.latitude, region.longitude);
        setInitialPosition(region);
      },
      error => Alert.alert('Please activate your location.'),
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followUserLocation
      initialRegion={initialPosition}>
      {markers.map(marker => (
        <Marker
          key={marker.coordinate.latitude}
          coordinate={marker.coordinate}
          title={marker.placeName}>
          <MaterialCommunityIcons
            name={'hospital-marker'}
            color={'red'}
            size={35}
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default JoinAnotherAccount;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});
