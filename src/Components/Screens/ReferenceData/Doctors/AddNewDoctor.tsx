import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../../../../Navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  route: RouteProp<StackParamList, 'AddNewDoctor'>;
  navigation: StackNavigationProp<StackParamList, 'AddNewDoctor'>;
};

const AddNewMedicine: React.FC<Props> = ({route, navigation}) => {
  const [fullName, setFullName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  const _isFormValidated = () => {
    if (
      fullName !== '' &&
      fullName.trim().length > 0 &&
      specialization !== '' &&
      specialization.trim().length > 0
    ) {
      return true;
    }
    return false;
  };

  const _addMedicine = (theUid) => {
    if (_isFormValidated()) {
      firestore()
        .collection('doctors')
        .doc(theUid)
        .collection('doctorlist')
        .add({
          fullName,
          specialization,
          comment,
        })
        .then(() => {
          setFullName('');
          setSpecialization('');
          setComment('');
          route.params._setSelected();
          navigation.goBack();
        });
    }
  };

  return (
    <View style={styles.modalContainerView}>
      <View style={styles.modalFirstInnerView}>
        <Image
          style={styles.logoImage}
          source={require('../../../../../images/doctor.png')}
        />
      </View>
      <View style={styles.modalSecondInnerView}>
        <View style={styles.modalViewMargin}>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitleText}>Add New Doctor</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={'ios-close'} color={'grey'} size={35} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalInputTextTitle}>Doctor's name*</Text>
          <TextInput
            style={styles.modalInputText}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <Text style={styles.modalInputTextTitle}>Specialization*</Text>
          <TextInput
            style={styles.modalInputText}
            value={specialization}
            onChangeText={(text) => setSpecialization(text)}
          />
          <Text style={styles.modalInputTextTitle}>Comment</Text>
          <TextInput
            style={styles.modalInputText}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            onPress={() => _addMedicine(route.params.uid)}
            disabled={!_isFormValidated()}
            style={[
              styles.modalButtonContainer,
              {opacity: _isFormValidated() ? 1 : 0.6},
            ]}>
            <Text style={styles.modalButtonText}>Add Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddNewMedicine;

const styles = StyleSheet.create({
  modalContainerView: {
    flex: 1,
    backgroundColor: '#4B8DC9',
  },
  modalFirstInnerView: {
    flex: 2.5,
    backgroundColor: '#4B8DC9',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalSecondInnerView: {
    flex: 4,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 30,
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
    marginBottom: 30,
  },
  modalInputTextTitle: {
    color: 'grey',
    marginBottom: -5,
  },
  modalInputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginHorizontal: 3,
    marginBottom: 20,
    padding: 3,
  },
  modalButtonContainer: {
    borderWidth: 1,
    backgroundColor: '#4B8DC9',
    borderRadius: 3,
    padding: 10,
    borderColor: '#4B8DC9',
    marginTop: 10,
  },
  logoImage: {
    width: 200,
    height: 306.6,
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
