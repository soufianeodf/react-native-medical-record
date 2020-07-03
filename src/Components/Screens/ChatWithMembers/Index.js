import React, {useEffect, useState} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export default function Index({navigation}) {
  const [uid, setUid] = useState('');
  const [users, setUsers] = useState([]);
  const [myAvatar, setMyAvatar] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      StatusBar.setHidden(false);
    });
  }, [navigation]);

  useEffect(() => {
    var subscriber;
    auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        subscriber = firestore()
          .collection('users')
          .onSnapshot(querySnapshot => {
            if (querySnapshot) {
              var theusers = [];
              console.log('Total users: ', querySnapshot.size);
              querySnapshot.forEach(documentSnapshot => {
                storage()
                  .ref(`app-images/${documentSnapshot.id}/avatar.png`)
                  .getDownloadURL()
                  .then(theurl => {
                    if (uid !== documentSnapshot.id) {
                      theusers.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                        url: theurl,
                      });
                    } else {
                      setMyAvatar(theurl);
                    }
                  })
                  .catch(error => console.log(error));
              });
            }
            setTimeout(() => {
              if (theusers) {
                theusers.sort(compare);
                setUsers(theusers);
              }
            }, 1000);
          });
      } else {
        navigation.navigate('Login');
      }
    });
    return () => subscriber();
  }, [navigation, uid]);

  function compare(a, b) {
    a.username = a.username.toLowerCase();
    b.username = b.username.toLowerCase();
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  }

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
        {users != null
          ? users.map(value => {
              return (
                <TouchableOpacity
                  style={styles.touchableOpacityStyle}
                  onPress={() =>
                    navigation.navigate('Chat', {
                      currentUserId: uid,
                      friendUserId: value.key,
                      avatar: myAvatar,
                    })
                  }
                  key={value.key}>
                  <Image source={{uri: value.url}} style={styles.userLogo} />
                  <View style={styles.textViewContainer}>
                    <View style={styles.firstInnerView}>
                      <Text style={styles.usernameText}>{value.username}</Text>
                      <Text style={styles.timeText}>2 min ago</Text>
                    </View>
                    <View style={styles.secondInnerView}>
                      <Text style={styles.lastMessageText}>
                        Lorem ipsum dolor sit amet conse
                      </Text>
                      <Text style={styles.messagesNumberText}>5</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
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
  touchableOpacityStyle: {
    flexDirection: 'row',
  },
  userLogo: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    margin: 10,
  },
  textViewContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  firstInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '73%',
  },
  usernameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    color: 'gray',
    marginLeft: 5,
  },
  secondInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '73%',
  },
  lastMessageText: {
    color: 'gray',
  },
  messagesNumberText: {
    color: 'gray',
    marginLeft: 5,
  },
});
