import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

const MedicalPrecedents = () => {
  const itemInformations = [
    {
      iconType: 'FontAwesome',
      iconName: 'heartbeat',
      iconSize: 28,
      title: 'Heart condition',
    },
    {
      iconType: 'MaterialCommunityIcons',
      iconName: 'blood-bag',
      iconSize: 28,
      title: 'Diabetes',
    },
    {
      iconType: 'FontAwesome5',
      iconName: 'allergies',
      iconSize: 32,
      title: 'Allergy',
    },
    {
      iconType: 'Fontisto',
      iconName: 'injection-syringe',
      iconSize: 28,
      title: 'Vaccination',
    },
    {
      iconType: 'MaterialCommunityIcons',
      iconName: 'bed-empty',
      iconSize: 28,
      title: 'Surgery',
    },
    {
      iconType: 'FontAwesome5',
      iconName: 'smoking',
      iconSize: 23,
      title: 'Alcohol / Smoking',
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
            onPress={() => alert('Not implemented yet')}>
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
