import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

const MedicalPrecedents = ({navigation}) => {
  const itemInformations = [
    {
      key: 1,
      iconType: 'FontAwesome',
      iconName: 'heartbeat',
      iconSize: 28,
      title: 'Heart condition',
      goToPage: 'HeartCondition',
    },
    {
      key: 2,
      iconType: 'MaterialCommunityIcons',
      iconName: 'blood-bag',
      iconSize: 28,
      title: 'Diabetes',
      goToPage: 'Diabetes',
    },
    {
      key: 3,
      iconType: 'FontAwesome5',
      iconName: 'allergies',
      iconSize: 32,
      title: 'Allergy',
      goToPage: 'Allergy',
    },
    {
      key: 4,
      iconType: 'Fontisto',
      iconName: 'injection-syringe',
      iconSize: 28,
      title: 'Vaccination',
      goToPage: 'Vaccination',
    },
    {
      key: 5,
      iconType: 'MaterialCommunityIcons',
      iconName: 'bed-empty',
      iconSize: 28,
      title: 'Surgery',
      goToPage: 'Surgery',
    },
    {
      key: 6,
      iconType: 'FontAwesome5',
      iconName: 'smoking',
      iconSize: 23,
      title: 'Alcohol / Smoking',
      goToPage: 'AlcoholSmoking',
    },
  ];

  function _renderIconType(iconType, iconName, iconSize) {
    switch (iconType) {
      case 'FontAwesome':
        return <FontAwesome name={iconName} size={iconSize} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={iconSize} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={iconSize} />;
      case 'Fontisto':
        return <Fontisto name={iconName} size={iconSize} />;
      default:
        return null;
    }
  }

  return (
    <View style={styles.viewContainer}>
      {itemInformations.map(value => {
        return (
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => navigation.navigate(value.goToPage)}
            key={value.key}
            >
            <View style={styles.iconView}>
              {_renderIconType(value.iconType, value.iconName, value.iconSize)}
            </View>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>{value.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MedicalPrecedents;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: 20,
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
