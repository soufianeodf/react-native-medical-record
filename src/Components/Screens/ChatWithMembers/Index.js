import React, {useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Index({navigation}) {
  useEffect(() => {
    navigation.addListener('focus', () => {
      StatusBar.setHidden(false);
    });
  }, [navigation]);

  return (
    <View style={styles.viewContainer}>
        <View style={styles.headerView}>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name={'navicon'} color={'grey'} size={25} />
          </TouchableOpacity>
          <View style={[styles.textView, {marginLeft: '21%'}]}>
            <Text style={styles.textStyle}>Select contact</Text>
          </View>
        </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => alert('clicked')}>
          <Image
            source={require('../../../../images/rostro.jpg')}
            style={{width: 60, height: 60, borderRadius: 60 / 2, margin: 10}}
          />
          <View style={{justifyContent: 'center', width: '100%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', width: '73%'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Todd Peterson</Text>
              <Text style={{color: 'gray', marginLeft: 5,}}>2 min ago</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '73%'}}>
              <Text style={{color: 'gray'}}>Lorem ipsum dolor sit amet conse</Text>
              <Text style={{color: 'gray', marginLeft: 5,}}>5</Text>
            </View>
          </View>
        </TouchableOpacity>

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
  },
  headerView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
  },
  iconView: {
    marginLeft: 25,
  },
  textView: {
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'serif',
  },
});
