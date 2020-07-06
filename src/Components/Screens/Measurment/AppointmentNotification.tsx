import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppointmentNotification({navigation, route}) {
  const {date, time} = route.params;
  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.headerViewContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="md-close" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('check')}
            style={styles.iconStyle}>
            <Ionicons name="md-checkmark" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('delete')}
            style={styles.iconStyle}>
            <MaterialCommunityIcons name="delete" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentViewContainer}>
          <View style={styles.blocViewContainer}>
            <Image
              source={require('../../../../images/exclamation.png')}
              style={styles.firstBlockImage}
            />
            <Text style={styles.firstBlockText}>
              The time of visit is less than the current time. In order to set
              up visit notification property the time of visit has to be in the
              future.
            </Text>
          </View>
          <View style={styles.blocViewContainer}>
            <Image
              source={require('../../../../images/calendar.png')}
              style={styles.secondBlockImage}
            />
            <Text style={styles.secondBlockText}>
              Your event is scheduled on {date} {time}{' '}
            </Text>
          </View>
          <View
            style={[
              styles.blocViewContainer,
              {justifyContent: 'space-around', alignItems: 'flex-start'},
            ]}>
            <TouchableOpacity onPress={() => alert('set date')}>
              <Text style={styles.thirdBlockText}>SET DATE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('set time')}>
              <Text style={styles.thirdBlockText}>SET TIME</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.blocViewContainer}>
            <Image
              source={require('../../../../images/alarm.png')}
              style={styles.fourthBockImage}
            />
            <Text style={styles.fourthBlockText}>
              Notification will be fired on {date} {time}{' '}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  headerViewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 18,
  },
  iconStyle: {
    marginLeft: 35,
  },
  contentViewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  blocViewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 25,
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  firstBlockImage: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginRight: 10,
  },
  firstBlockText: {
    color: '#fc4151',
    textAlign: 'center',
    marginRight: 10,
  },
  secondBlockImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  secondBlockText: {
    color: 'gray',
    textAlign: 'center',
    width: '88%',
    lineHeight: 23,
    fontSize: 16,
  },
  thirdBlockText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  fourthBockImage: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  fourthBlockText: {
    color: 'gray',
    textAlign: 'center',
    width: '86%',
    lineHeight: 23,
    fontSize: 16,
  },
});
