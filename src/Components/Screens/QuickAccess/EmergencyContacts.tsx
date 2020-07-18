import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const EmergencyContacts = ({navigation}) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        getContacts(user.uid);
      }
    });
    return subscriber;
  }, []);

  const getContacts = (uid) => {
    let theContacts = [];
    firestore()
      .collection('emergencyContacts')
      .doc(uid)
      .collection('listContacts')
      .get()
      .then((querySnapshot) => {
        console.log('Total contacts -----> : ', querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          theContacts.push(documentSnapshot.data());
        });
        setContacts(theContacts);
      })
      .catch((error) => Alert.alert(error));
  };

  const _renderButtonView = () => {
    return (
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEmergencyContact')}>
          <Ionicons name={'ios-add-circle'} color={'#661D54'} size={66} />
        </TouchableOpacity>
      </View>
    );
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
      <View style={{flex: 1, paddingHorizontal: 10}}>
        {contacts.length !== 0
          ? contacts.map((value) => {
              return (
                <TouchableOpacity
                  onPress={() => alert('clicked')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    marginTop: 10,
                    padding: 8,
                    borderRadius: 3,
                    elevation: 3,
                  }}>
                  <Text style={{textAlignVertical: 'center'}}> {value.contactName} </Text>
                  <Ionicons name={'ios-call'} size={30} />
                  <Text style={{textAlignVertical: 'center'}}>
                    {value.phone}
                  </Text>
                </TouchableOpacity>
              );
            })
          : _renderWhenEmpty()}
        {_renderButtonView()}
      </View>
    );
  };

  return <>{_renderView()}</>;
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    marginTop: 15,
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
