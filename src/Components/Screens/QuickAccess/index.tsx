import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';

const index = ({navigation}) => {
  const [initialPosition, setInitialPosition] = useState({
    latitude: 31.5889,
    longitude: -7.3626,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    locateCurrentPosition();
  }, []);

  const itemInformations = [
    {
      key: 1,
      iconType: 'Fontisto',
      iconName: 'doctor',
      iconSize: 28,
      title: 'Doctors',
      goToPage: () => navigation.navigate('Doctors'),
    },
    {
      key: 2,
      iconType: 'Fontisto',
      iconName: 'laboratory',
      iconSize: 28,
      title: 'Nearby laboratories',
      goToPage: () =>
        Linking.openURL(
          `geo:${initialPosition.latitude},${initialPosition.longitude}?q=laboratory`,
        ),
    },
    {
      key: 3,
      iconType: 'MaterialCommunityIcons',
      iconName: 'pharmacy',
      iconSize: 28,
      title: 'Nearby pharmacies',
      goToPage: () =>
        Linking.openURL(
          `geo:${initialPosition.latitude},${initialPosition.longitude}?q=pharmacy`,
        ),
    },
    {
      key: 4,
      iconType: 'Feather',
      iconName: 'phone-call',
      iconSize: 28,
      title: 'Emergency contacts',
      goToPage: () => navigation.navigate('EmergencyContacts'),
    },
  ];

  function _renderIconType(
    iconType: string,
    iconName: string,
    iconSize: number,
  ) {
    switch (iconType) {
      case 'FontAwesome':
        return <FontAwesome name={iconName} size={iconSize} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={iconSize} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={iconSize} />;
      case 'Fontisto':
        return <Fontisto name={iconName} size={iconSize} />;
      case 'Feather':
        return <Feather name={iconName} size={iconSize} />;
      default:
        return null;
    }
  }

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setInitialPosition(region);
      },
      (error) =>
        Alert.alert('Please activate your location and re-enter again.'),
      {enableHighAccuracy: true, timeout: 20000},
    );
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {itemInformations.map((value) => {
          return (
            <TouchableOpacity
              style={styles.innerContainer}
              onPress={() => value.goToPage()}
              key={value.key}>
              <View style={styles.iconView}>
                {_renderIconType(
                  value.iconType,
                  value.iconName,
                  value.iconSize,
                )}
              </View>
              <View style={styles.textView}>
                <Text style={styles.textStyle}>{value.title}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '86%',
    padding: 2,
    borderRadius: 2,
    elevation: 2,
    marginVertical: 8,
  },
  iconView: {
    borderRadius: 2,
    padding: 12,
    backgroundColor: '#e2dede',
  },
  textView: {
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'serif',
  },
});
