import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-spinkit';

const NearbyHospitals = () => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 31.5889,
    longitude: -7.3626,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    locateCurrentPosition();
  }, []);

  const _nearbyHospitals = (
    latitude,
    longitude,
    pagetoken = '',
    places = [],
  ) => {
    let url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      latitude +
      ',' +
      longitude +
      '&radius=8000&type=hospital&key=AIzaSyBKufJtc7JQhJV_esN9vdubqz3VqMTFnHs&pagetoken=' +
      pagetoken;

    fetch(url)
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
          place.vicinity = googlePlace.vicinity;
          places.push(place);
        }
        if (res.next_page_token == null || res.next_page_token.length === 0) {
          setLoading(false);
          setMarkers(places);
          console.log('final');
        } else {
          setTimeout(() => {
            return _nearbyHospitals(
              latitude,
              longitude,
              res.next_page_token,
              places,
            );
          }, 3000);
        }
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
        _nearbyHospitals(region.latitude, region.longitude);
        setInitialPosition(region);
      },
      error => Alert.alert('Please activate your location and re-enter again.'),
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="orange" size={70} />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followUserLocation
      initialRegion={initialPosition}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          title={marker.placeName}
          description={marker.vicinity}>
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

export default NearbyHospitals;

const styles = StyleSheet.create({
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
