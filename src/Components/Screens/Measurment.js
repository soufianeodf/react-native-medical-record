import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Measurment = ({navigation}) => {
  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => alert('Not implemented yet.')}>
          <View style={styles.iconView}>
            <MaterialCommunityIcons
              name={'blood-bag'}
              color={'#0b42a7'}
              size={35}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Blood pressure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => alert('Not implemented yet.')}>
          <View style={styles.iconView}>
            <Entypo name={'ruler'} color={'#0b42a7'} size={35} />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Height</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => alert('Not implemented yet.')}>
          <View style={styles.iconView}>
            <Ionicons name={'ios-pulse'} color={'#0b42a7'} size={40} />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Pulse</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => alert('Not implemented yet.')}>
          <View style={[styles.iconView, {paddingHorizontal: 17.3}]}>
            <Fontisto name={'blood'} color={'#0b42a7'} size={40} />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Sugar LEVEL</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => alert('Not implemented yet.')}>
          <View style={styles.iconView}>
            <FontAwesome5 name={'weight'} color={'#0b42a7'} size={35} />
          </View>
          <View style={styles.textView}>
            <Text style={styles.textStyle}>Weight</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Measurment;

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
