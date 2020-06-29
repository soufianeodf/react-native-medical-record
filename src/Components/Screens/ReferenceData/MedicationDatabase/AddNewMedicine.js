import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddNewMedicine({route, navigation}) {
  const [medicationName, setMedicationName] = useState('');

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
          route.params._setSelected();
          navigation.goBack();
        });
    } else {
      Alert.alert("You canno't enter an empty name.");
    }
  };

  return (
    <View style={styles.modalContainerView}>
      <View style={styles.modalFirstInnerView}>
        <Image
          style={styles.logoImage}
          source={require('../../../../../images/medicine.png')}
        />
      </View>
      <View style={styles.modalSecondInnerView}>
        <View style={styles.modalViewMargin}>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitleText}>Add New Medicine</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
  );
}

const styles = StyleSheet.create({
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
