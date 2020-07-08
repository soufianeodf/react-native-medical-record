import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../Navigation/Navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'BoughtFromPharmacy'>;
};

const BoughtFromPharmacy: React.FC<Props> = ({navigation}) => {
  const [uid, setUid] = useState('');
  const [medications, setMedications] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        firestore()
          .collection(user.uid)
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
          })
          .catch(error => Alert.alert(error.message));
      } else {
        navigation.navigate('Login');
      }
    });
  }, [navigation, selected]);

  const _addDrugBought = medication => {
    firestore()
      .collection(uid)
      .doc(medication.key)
      .set({
        CODE: medication.CODE,
        DCI1: medication.DCI1,
        DOSAGE1: medication.DOSAGE1,
        FORME: medication.FORME,
        NOM: medication.NOM,
        PH: medication.PH,
        PPV: medication.PPV,
        PRESENTATION: medication.PRESENTATION,
        PRINCEPS_GENERIQUE: medication.PRINCEPS_GENERIQUE,
        PRIX_BR: medication.PRIX_BR,
        TAUX_REMBOURSEMENT: medication.TAUX_REMBOURSEMENT,
        UNITE_DOSAGE1: medication.UNITE_DOSAGE1,
      })
      .then(() => {
        setSelected(!selected);
      })
      .catch(error => Alert.alert(error.message));
  };

  const _deleteSelectedBoughtMedicine = item => {
    firestore()
      .collection(uid)
      .doc(item.key)
      .delete()
      .then(() => {
        setSelected(!selected);
      })
      .catch(error => Alert.alert(error.message));
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.firstInnerView}>
        <Image
          style={styles.imageStyle}
          source={require('../../../images/pharmacie.jpg')}
        />
      </View>
      <View style={styles.secondInnerView}>
        <Text style={styles.titleText}>Drugs purchased</Text>
        <View style={styles.contentView}>
          {medications.length === 0 ? (
            <View style={styles.emptyContentView}>
              <Image
                style={styles.emptyImageStyle}
                source={require('../../../images/oops.jpg')}
              />
            </View>
          ) : (
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
                        {
                          text: 'OK',
                          onPress: () => _deleteSelectedBoughtMedicine(item),
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
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MedicationDatabase', {
              _addDrugBought,
            })
          }>
          <Ionicons name={'ios-add-circle'} color={'#2529B7'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoughtFromPharmacy;

const styles = StyleSheet.create({
  itemsStyle: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15,
    margin: 8,
    marginTop: 0,
    borderRadius: 3,
    elevation: 1,
    paddingLeft: 5,
    backgroundColor: 'white',
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
  viewContainer: {
    flex: 1,
    position: 'relative',
  },
  firstInnerView: {
    flex: 1,
  },
  imageStyle: {
    width: '100%',
    height: '33.5%',
  },
  secondInnerView: {
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    top: '29%',
    width: '100%',
    height: '100%',
  },
  titleText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontFamily: 'serif',
  },
  contentView: {
    height: '60%',
  },
  emptyContentView: {
    flex: 1,
  },
  emptyImageStyle: {
    width: '100%',
    height: '75%',
  },
});
