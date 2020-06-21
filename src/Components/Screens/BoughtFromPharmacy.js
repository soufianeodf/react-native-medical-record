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

export default function BoughtFromPharmacy({navigation}) {
  const [uid, setUid] = useState('');
  const [medications, setMedications] = useState([{code: 1, nom: 'test'}]);
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
      .doc(medication.CODE)
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
    <View style={{flex: 1, position: 'relative'}}>
      <View style={{flex: 1}} >
        <Image style={{width: '100%', height: '33.5%'}} source={require('../../../images/pharmacie.jpg')} />
      </View>
      <View style={{backgroundColor: '#fff', borderTopRightRadius: 30, borderTopLeftRadius: 30, position: 'absolute', top: '29%', width: '100%', height: '100%'}} >
        <Text style={{textAlign: 'center', marginVertical: 20, fontSize: 18, fontFamily: 'serif'}}>Drugs purchased</Text>
        <View style={{height: '60%'}}>
        {medications.length === 0 ? (
          <View style={{flex: 1}}>
            <Image
              style={{width: '100%', height: '75%'}}
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
            navigation.navigate('ReferenceData', {
              _addDrugBought: _addDrugBought,
            })
          }>
          <Ionicons name={'ios-add-circle'} color={'#2529B7'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
});
