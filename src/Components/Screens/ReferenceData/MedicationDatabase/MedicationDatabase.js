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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-spinkit';

const ReferenceData = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([{code: 1, nom: 'test'}]);
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    firestore()
      .collection('medications')
      .where('NOM', '>=', '')
      .get()
      .then(querySnapshot => {
        let medications = [];
        console.log('Total medications: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          medications.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMedications(medications);
        setLoading(false);
      })
      .catch(error => Alert.alert(error));
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
      .collection('medications')
      .where('NOM', '>=', search.toUpperCase())
      .get()
      .then(querySnapshot => {
        let medications = [];
        console.log('Total medications ----------->: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          medications.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMedications(medications);
      })
      .catch(error => Alert.alert(error));
  };

  const _deleteSelectedMedicine = item => {
    firestore()
      .collection('medications')
      .doc(item.key)
      .delete()
      .then(() => setSelected(!selected));
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="orange" size={70} />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={[styles.firstInnerView, {flex: isKeyboardOn ? 1.9 : 0.8}]}>
        <View style={styles.titleView}>
          <MaterialCommunityIcons name={'pill'} color={'white'} size={30} />
          <Text style={styles.titleText}>Medications list</Text>
        </View>
        <View style={styles.searchBarView}>
          <TouchableOpacity style={styles.searchBar} onPress={_search}>
            <TextInput
              style={styles.searchBarText}
              onChangeText={text => setSearch(text)}
              onSubmitEditing={_search}
              placeholder="Type here..."
            />
            <Ionicons name={'md-search'} color={'grey'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondInnerView}>
        {medications.length === 0 ? (
          <View style={styles.notFoundView}>
            <Image
              style={{width: '100%', height: isKeyboardOn ? '100%' : '75%'}}
              source={require('../../../../../images/notfound.jpg')}
            />
          </View>
        ) : (
          <FlatList
            data={medications}
            extraData={selected}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  if (
                    typeof route.params !== 'undefined' &&
                    route.params !== null
                  ) {
                    route.params._addDrugBought(item);
                    route.params = null;
                    navigation.goBack();
                  }
                }}
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
                <Text style={styles.itemsStyle}> {item.NOM} </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddNewMedicine', {_setSelected: _setSelected})
          }>
          <Ionicons name={'ios-add-circle'} color={'orange'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReferenceData;

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
    backgroundColor: 'orange',
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
