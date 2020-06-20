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
  Modal,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-spinkit';

const ReferenceData = () => {
  const [loading, setLoading] = useState(true);
  const [medications, setMedications] = useState([{code: 1, nom: 'test'}]);
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [medicationName, setMedicationName] = useState('');
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
  }, [medicationName, selected]);

  const _keyboardDidShow = () => {
    setIsKeyboardOn(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOn(false);
  };

  const _addMedicine = () => {
    if (medicationName !== '') {
      firestore()
        .collection('medications')
        .add({
          CODE: '',
          DCI1: '',
          DOSAGE1: '',
          FORME: '',
          NOM: medicationName.toUpperCase(),
          PH: '',
          PPV: '',
          PRESENTATION: '',
          PRINCEPS_GENERIQUE: '',
          PRIX_BR: '',
          TAUX_REMBOURSEMENT: '',
          UNITE_DOSAGE1: '',
        })
        .then(() => {
          setMedicationName('');
          setIsVisible(false);
        });
    } else {
      Alert.alert("You canno't enter an empty name.");
    }
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
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name={'md-search'} color={'grey'} size={30} />
            <TextInput
              style={styles.searchBarText}
              onChangeText={text => setSearch(text)}
              onSubmitEditing={_search}
              placeholder="Type here..."
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondInnerView}>
        <FlatList
          data={medications}
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
                    {text: 'OK', onPress: () => _deleteSelectedMedicine(item)},
                  ],
                  {cancelable: false},
                )
              }>
              <Text style={styles.itemsStyle}> {item.NOM} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Ionicons name={'ios-add-circle'} color={'orange'} size={66} />
        </TouchableOpacity>
      </View>

      <Modal visible={isVisible} animationType="fade">
        <View style={styles.modalContainerView}>
          <View style={styles.modalFirstInnerView}>
            <Image
              style={styles.logoImage}
              source={require('../../../images/medicine.png')}
            />
          </View>
          <View style={styles.modalSecondInnerView}>
            <View style={styles.modalViewMargin}>
              <View style={styles.modalTitleView}>
                <Text style={styles.modalTitleText}>Add New Medicine</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Ionicons name={'ios-close'} color={'grey'} size={35} />
                </TouchableOpacity>
              </View>
              <Text style={styles.modalInputTextTitle}>Name</Text>
              <TextInput
                style={styles.modalInputText}
                value={medicationName}
                onChangeText={text => setMedicationName(text)}
              />
              <TouchableOpacity
                onPress={_addMedicine}
                style={styles.modalButtonContainer}>
                <Text style={styles.modalButtonText}>Add Medicine</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingLeft: 5,
  },
  searchBarText: {
    width: 320,
    height: 40,
  },
  secondInnerView: {
    flex: 4,
    backgroundColor: 'white',
    padding: 5,
    paddingTop: 10,
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
  // Modal style
  modalContainerView: {
    flex: 1,
    backgroundColor: 'orange',
  },
  modalFirstInnerView: {
    flex: 2,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSecondInnerView: {
    flex: 4,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 40,
  },
  modalViewMargin: {
    marginHorizontal: 25,
  },
  modalTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitleText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 50,
  },
  modalInputTextTitle: {
    color: 'grey',
  },
  modalInputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginHorizontal: 3,
    marginBottom: 10,
    padding: 3,
  },
  modalButtonContainer: {
    borderWidth: 1,
    backgroundColor: 'orange',
    borderRadius: 3,
    padding: 10,
    borderColor: 'orange',
    marginTop: 20,
  },
  logoImage: {
    width: 176,
    height: 176,
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
