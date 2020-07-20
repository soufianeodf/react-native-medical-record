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
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-spinkit';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../../Navigation/Navigation';
import auth from '@react-native-firebase/auth';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'Specializations'>;
};

const Specializations: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [specializations, setSpecializations] = useState<{id: string, key: string, specialization: string}[]>([]);
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(false);
  const [uid, setUid] = useState('');

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  useEffect(() => {
    console.log('--->', specializations.length);
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        firestore()
          .collection('specializations')
          .doc(user.uid)
          .collection('specializationlist')
          .where('specialization', '>=', '')
          .get()
          .then((querySnapshot) => {
            let theSpecializations: {id: string, key: string, specialization: string}[] = [];
            console.log('Total Doctors: ', querySnapshot.size);
            querySnapshot.forEach((documentSnapshot) => {
              theSpecializations.push({
                id: documentSnapshot.id,
                key: documentSnapshot.data().key,
                specialization: documentSnapshot.data().specialization,
              });
            });
            setSpecializations(theSpecializations);
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
      .collection('specializations')
      .doc(uid)
      .collection('specializationlist')
      .where('specialization', '>=', search)
      .get()
      .then((querySnapshot) => {
        let theSpecializations: {id: string, key: string, specialization: string}[] = [];
        console.log('Total Doctors ----------->: ', querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          theSpecializations.push({
            id: documentSnapshot.id,
            key: documentSnapshot.data().key,
            specialization: documentSnapshot.data().specialization,
          });
        });
        setSpecializations(theSpecializations);
      })
      .catch((error) => Alert.alert(error));
  };

  const _deleteSelectedMedicine = (id: string) => {
    firestore()
      .collection('specializations')
      .doc(uid)
      .collection('specializationlist')
      .doc(id)
      .delete()
      .then(() => setSelected(!selected));
  };

  const _getLastId = () => {
    if(specializations.length !== 0) {
      const sortedArrayByKey = specializations.sort((a, b) => parseFloat(a.key) - parseFloat(b.key));
      return (+sortedArrayByKey[sortedArrayByKey.length - 1].key + 1).toString();
    } 
    return '1';
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="#46a7f8" size={70} />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={[styles.firstInnerView, {flex: isKeyboardOn ? 1.9 : 0.8}]}>
        <View style={styles.titleView}>
          <FontAwesome5 name={'code-branch'} color={'white'} size={30} />
          <Text style={styles.titleText}>Specializations</Text>
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
        {specializations.length === 0 ? (
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
            data={specializations}
            extraData={selected}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() =>
                  Alert.alert(
                    'Delete chosen specialization',
                    'Are you sure to delete.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => _deleteSelectedMedicine(item.id),
                      },
                    ],
                    {cancelable: false},
                  )
                }>
                <View style={styles.itemsStyle}>
                  <Text>{item.specialization}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddNewSpecialization', {_setSelected, uid, key: _getLastId()})
          }>
          <Ionicons name={'ios-add-circle'} color={'#46a7f8'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Specializations;

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
    backgroundColor: '#46a7f8',
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
    paddingVertical: 15,
    paddingLeft: 5,
    margin: 8,
    borderRadius: 3,
    elevation: 1,
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
});
