import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-spinkit';
import {ScrollView} from 'react-native-gesture-handler';

const EmergencyContacts = ({navigation}) => {
  const [uid, setUid] = useState('');
  const [isPortrait, setIsPortrait] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        getContacts(user.uid);
      }
    });
    return subscriber;
  }, [selected]);

  const getContacts = (theUid) => {
    let theContacts = [];
    firestore()
      .collection('emergencyContacts')
      .doc(theUid)
      .collection('listContacts')
      .get()
      .then((querySnapshot) => {
        console.log('Total contacts -----> : ', querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          theContacts.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setContacts(theContacts);
        setLoading(false);
      })
      .catch((error) => Alert.alert(error));
  };

  const _deleteSelectedContact = (key) => {
    firestore()
      .collection('emergencyContacts')
      .doc(uid)
      .collection('listContacts')
      .doc(key)
      .delete()
      .then(() => setSelected(!selected));
  };

  const _setSelected = () => {
    setSelected(!selected);
  };

  const _renderWhenEmpty = () => {
    return (
      <View
        style={[
          styles.viewContainer,
          {
            marginTop: isPortrait ? '40%' : 0,
            justifyContent: isPortrait ? 'flex-start' : 'center',
          },
        ]}
        onLayout={(event) =>
          setIsPortrait(
            event.nativeEvent.layout.height >= event.nativeEvent.layout.width,
          )
        }>
        <Image
          style={styles.imageStyle}
          source={require('../../../../images/emergencycall.png')}
        />
        <Text style={styles.textStyle}>Emergency Contacts not Added</Text>
      </View>
    );
  };

  const _renderView = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1, paddingHorizontal: 10, marginTop: 10}}
          contentContainerStyle={{flexGrow: 1}}>
          {contacts.length !== 0
            ? contacts.map((value) => {
                return (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${value.phone}`)}
                    key={value.key}
                    onLongPress={() =>
                      Alert.alert(
                        'Delete chosen contact',
                        'Are you sure to delete.',
                        [
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => _deleteSelectedContact(value.key),
                          },
                        ],
                        {cancelable: false},
                      )
                    }
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                      marginVertical: 5,
                      marginHorizontal: 1,
                      padding: 8,
                      borderRadius: 3,
                      elevation: 3,
                    }}>
                    <Text style={{textAlignVertical: 'center'}}>
                      {' '}
                      {value.contactName}{' '}
                    </Text>
                    <Ionicons name={'ios-call'} size={30} />
                    <Text style={{textAlignVertical: 'center'}}>
                      {value.phone}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : _renderWhenEmpty()}
        </ScrollView>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddEmergencyContact', {_setSelected})
            }>
            <Ionicons name={'ios-add-circle'} color={'#661D54'} size={66} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="#661D54" size={70} />
      </View>
    );
  }

  return <>{_renderView()}</>;
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    marginTop: 15,
    color: '#777',
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
  imageStyle: {
    width: 150,
    height: 150,
  },
});
