import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Timeline from 'react-native-timeline-flatlist';
import Spinner from 'react-native-spinkit';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../Navigation/Navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'Home'>;
};

const Main: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
              setUsername(
                doc.data() != null ? doc.data().username : 'Primary',
              );
              _getDataFromFirestore(user.uid);
            })
            .catch(error => {
              console.log(error.message);
            });
        } else {
          navigation.navigate('Login');
        }
      });
    });
  }, [navigation]);

  const _getDataFromFirestore = userId => {
    let theData = [];
    firestore()
      .collection('calendar')
      .doc(userId)
      .collection('appointment-list')
      .get()
      .then(querySnapshot => {
        console.log('Total calendar items -----> : ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          Object.keys(documentSnapshot.data()).map(key => {
            documentSnapshot.data()[key].map(value => {
              theData.push({
                time: value.time,
                eventType: value.appointmentType.toUpperCase(),
                title: value.doctor,
                description: value.specialization,
              });
            });
          });
        });
        setLoading(false);
        setData(theData);
      })
      .catch(error => Alert.alert(error));
  };

  const renderDetail = (rowData, sectionID, rowID) => {
    let eventType = (
      <Text style={[styles.eventType]}>
        <Ionicons
          name={'md-checkmark-circle-outline'}
          color={'#3394ef'}
          size={18}
        />{' '}
        {rowData.eventType}
      </Text>
    );
    var desc = null;
    if (rowData.description) {
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Text style={styles.textDescription}>{rowData.description}</Text>
        </View>
      );
    }
    return (
      <>
        <View style={styles.itemStyle}>
          {eventType}
          {desc}
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            paddingRight: '4.5%',
            marginTop: 2,
            marginBottom: -10,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 11,
              width: 22,
              height: 22,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name={'bell-ring'}
              color={'grey'}
              size={13}
            />
          </View>
        </View>
      </>
    );
  };

  const _renderTimeLine = () => {
    return (
      <Timeline
        data={data}
        circleSize={20}
        circleColor="rgb(45,156,219)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={styles.timeContainerStyle}
        timeStyle={styles.timeStyle}
        descriptionStyle={styles.descriptionStyle}
        options={{
          style: styles.optionsStyle,
        }}
        onEventPress={item =>
          navigation.navigate('DoctorAppointment', {item: item})
        }
        renderDetail={renderDetail}
      />
    );
  };

  const _renderWhenTimeLineEmpty = () => {
    return (
      <View style={styles.timeLineEmptyContainer}>
        <Image
          style={styles.timeLineEmptyImage}
          source={require('../../../images/emptyList.png')}
        />
        <Text style={styles.timeLineEmptyTitleText}>Your list is empty</Text>
        <Text style={styles.timeLineEmptyDescriptionText}>
          There are no data to show!
        </Text>
        <Text style={styles.timeLineEmptyDescriptionText}>
          This window contains all kinds of events: visits to a doctor, tests,
          diseases, pills taking. In order to create a new event just click on
          the 'plus' button
        </Text>
        <Text
          style={[styles.timeLineEmptyDescriptionText, {marginVertical: 10}]}>
          If you have any difficulties with the application, we are happy to
          help!
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="#3394ef" size={70} />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.drawerButtonView}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => navigation.toggleDrawer()}>
          <FontAwesome name={'navicon'} color={'grey'} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Ionicons name={'md-search'} color={'grey'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <MaterialIcons name={'filter-list'} color={'grey'} size={25} />
        </TouchableOpacity>
      </View>
      {data.length === 0 ? _renderWhenTimeLineEmpty() : _renderTimeLine()}
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => navigation.navigate('EventsList')}>
          <Ionicons name={'ios-add-circle'} color={'#3394ef'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
  },
  drawerButtonView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  touchableOpacity: {
    alignSelf: 'flex-start',
    height: 50,
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
  eventType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {},
  title: {
    fontWeight: 'bold',
    color: 'gray',
  },
  textDescription: {
    color: 'gray',
  },
  itemStyle: {
    flex: 1,
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 2,
    elevation: 3,
    paddingVertical: 7,
    paddingLeft: 10,
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: '#3394ef',
    color: 'white',
    padding: 5,
    borderRadius: 13,
  },
  timeContainerStyle: {
    minWidth: 52,
  },
  descriptionStyle: {
    color: 'gray',
  },
  optionsStyle: {
    paddingTop: 5,
    paddingLeft: 20,
  },
  timeLineEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '13%',
    paddingHorizontal: 15,
  },
  timeLineEmptyImage: {
    width: '35%',
    height: '25%',
  },
  timeLineEmptyTitleText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#444',
    marginVertical: 15,
  },
  timeLineEmptyDescriptionText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 17,
  },
});
