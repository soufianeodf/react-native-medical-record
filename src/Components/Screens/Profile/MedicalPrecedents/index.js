import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

const MedicalPrecedents = () => {
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.iconView}>
          <FontAwesome name={'heartbeat'} size={28} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Heart condition</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.iconView}>
          <MaterialCommunityIcons name={'blood-bag'} size={28} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Diabetes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.iconView}>
          <FontAwesome5 name={'allergies'} size={32} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Allergy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.iconView}>
          <Fontisto name={'injection-syringe'} size={28} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Vaccination</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.iconView}>
          <MaterialCommunityIcons name={'bed-empty'} size={28} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Surgery</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.innerContainer}>
        <View style={styles.iconView}>
          <FontAwesome5 name={'smoking'} size={23} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.textStyle}>Alcohol / Smoking</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MedicalPrecedents;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center"
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
    backgroundColor: "#e2dede",
  },
  textView: {
    alignItems: "center",
    marginLeft: 10,
    justifyContent: "center"
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "serif",
  },
});
