import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../../../../Navigation/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  route: RouteProp<StackParamList, 'AddNewSpecialization'>;
  navigation: StackNavigationProp<StackParamList, 'AddNewSpecialization'>;
};

const AddNewSpecialization: React.FC<Props> = ({route, navigation}) => {
  const [specializationName, setSpecializationName] = useState('');

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const _addSpecialization = () => {
    if (specializationName !== '') {
      firestore()
        .collection('specializations')
        .doc(route.params.uid)
        .collection('specializationlist')
        .add({
          key: route.params.key,
          specialization: specializationName,
        })
        .then(() => {
          setSpecializationName('');
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
          source={require('../../../../../images/specilization.png')}
        />
      </View>
      <View style={styles.modalSecondInnerView}>
        <View style={styles.modalViewMargin}>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitleText}>Add New Specialization</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name={'ios-close'} color={'grey'} size={35} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalInputTextTitle}>Name</Text>
          <TextInput
            style={styles.modalInputText}
            value={specializationName}
            onChangeText={text => setSpecializationName(text)}
          />
          <TouchableOpacity
            onPress={_addSpecialization}
            style={styles.modalButtonContainer}>
            <Text style={styles.modalButtonText}>Add Specialization</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddNewSpecialization;

const styles = StyleSheet.create({
  modalContainerView: {
    flex: 1,
    backgroundColor: '#46a7f8',
  },
  modalFirstInnerView: {
    flex: 2,
    backgroundColor: '#46a7f8',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    backgroundColor: '#46a7f8',
    borderRadius: 3,
    padding: 10,
    borderColor: '#46a7f8',
    marginTop: 20,
  },
  logoImage: {
    width: 230,
    height: 230,
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
