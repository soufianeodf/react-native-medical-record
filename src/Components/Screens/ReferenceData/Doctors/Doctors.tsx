import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Spinner from 'react-native-spinkit';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../../Navigation/Navigation';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'Doctors'>;
};

const Doctors: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        firestore()
          .collection('doctors')
          .doc(user.uid)
          .collection('doctorlist')
          .where('fullName', '>=', '')
          .get()
          .then((querySnapshot) => {
            let theDoctors = [];
            console.log('Total Doctors: ', querySnapshot.size);
            querySnapshot.forEach((documentSnapshot) => {
              theDoctors.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setDoctors(theDoctors);
            setLoading(false);
          })
          .catch((error) => Alert.alert(error));
      }
    });
    return subscriber;
  }, [selected]);

  const _keyboardDidShow = () => {
    setIsKeyboardOn(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOn(false);
  };

  const _setSelected = () => {
    setSelected(!selected);
  };

  const _search = () => {
    firestore()
      .collection('doctors')
      .doc(uid)
      .collection('doctorlist')
      .where('fullName', '>=', search)
      .get()
      .then((querySnapshot) => {
        let theDoctors = [];
        console.log('Total Doctors ----------->: ', querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          theDoctors.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setDoctors(theDoctors);
      })
      .catch((error) => Alert.alert(error));
  };

  const _deleteSelectedMedicine = (item) => {
    firestore()
      .collection('doctors')
      .doc(uid)
      .collection('doctorlist')
      .doc(item.key)
      .delete()
      .then(() => setSelected(!selected));
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="#4B8DC9" size={70} />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={[styles.firstInnerView, {flex: isKeyboardOn ? 1.9 : 0.8}]}>
        <View style={styles.titleView}>
          <Fontisto name={'doctor'} color={'white'} size={30} />
          <Text style={styles.titleText}>Your Doctors</Text>
        </View>
        <View style={styles.searchBarView}>
          <TouchableOpacity style={styles.searchBar} onPress={_search}>
            <TextInput
              style={styles.searchBarText}
              onChangeText={(text) => setSearch(text)}
              onSubmitEditing={_search}
              placeholder="Type here..."
            />
            <Ionicons name={'md-search'} color={'grey'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondInnerView}>
        {doctors.length === 0 ? (
          <View style={styles.notFoundView}>
            <Image
              style={{
                width: '100%',
                height: isKeyboardOn ? '100%' : '75%',
                borderRadius: 1000,
              }}
              source={require('../../../../../images/empty.png')}
            />
          </View>
        ) : (
          <FlatList
            data={doctors}
            extraData={selected}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() =>
                  Alert.alert(
                    'Delete chosen medication',
                    'Are you sure to delete.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => _deleteSelectedMedicine(item),
                      },
                    ],
                    {cancelable: false},
                  )
                }>
                <View style={styles.itemsStyle}>
                  <Text>{item.fullName}</Text>
                  <Text style={{color: 'gray'}}> {'  '} {item.specialization}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddNewDoctor', {_setSelected, uid})
          }>
          <Ionicons name={'ios-add-circle'} color={'#4B8DC9'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  firstInnerView: {
    backgroundColor: '#4B8DC9',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 3,
    paddingTop: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    marginLeft: 5,
    fontFamily: 'serif',
  },
  searchBarView: {
    alignItems: 'center',
    marginBottom: 5,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  searchBarText: {
    width: 320,
    height: 40,
    paddingLeft: 15,
  },
  secondInnerView: {
    flex: 4,
    backgroundColor: 'white',
    padding: 5,
    paddingTop: 10,
  },
  notFoundView: {
    flex: 1,
  },
  itemsStyle: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 5,
    margin: 8,
    borderRadius: 3,
    elevation: 1,
    paddingLeft: 5,
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
});
