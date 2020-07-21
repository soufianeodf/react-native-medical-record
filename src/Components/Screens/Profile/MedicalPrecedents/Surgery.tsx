import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-spinkit';

const Surgery = () => {
  const [uid, setUid] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [allergies, setAllergies] = useState<{key: string, allergy: string}[]>([]);
  const [allergy, setAllergy] = useState('');
  const [isPortrait, setIsPortrait] = useState(false);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        _getAllergies(user.uid);
      }
    });
    return subscriber;
  }, [selected]);

  const items = [
    {
      label: 'Other',
      value: 'Other',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Food allergy',
      value: 'Food allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Skin allergy',
      value: 'Skin allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Dust allergy',
      value: 'Dust allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Insect Sting allergy',
      value: 'Insect Sting allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Pet allergies',
      value: 'Pet allergies',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Eye allergy',
      value: 'Eye allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Drug allergies',
      value: 'Drug allergies',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Allergic Rhinitis',
      value: 'Allergic Rhinitis',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Latex allergy',
      value: 'Latex allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Mold allergy',
      value: 'Mold allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Cockroach allergy',
      value: 'Cockroach allergy',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
  ];

  const _toggleModal = () => {
    console.log(isModalVisible);
    setModalVisible(!isModalVisible);
  };

  const _getAllergies = (theUid: string) => {
    let theAllergies: {key: string, allergy: string}[] = [];
    firestore()
      .collection('allergies')
      .doc(theUid)
      .collection('listAllergies')
      .get()
      .then((querySnapshot) => {
        console.log('Total allergies -----> : ', querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          theAllergies.push({
            key: documentSnapshot.id,
            allergy: documentSnapshot.data().allergy,
          });
        });
        setAllergies(theAllergies);
        setLoading(false);
      })
      .catch((error) => Alert.alert(error));
  };

  const _addContact = () => {
    if (allergy !== '') {
      firestore()
        .collection('allergies')
        .doc(uid)
        .collection('listAllergies')
        .add({
          allergy,
        })
        .then(() => {
          setSelected(!selected);
          _toggleModal();
        })
        .catch(() =>
          console.error('There was a problem saving your contact.'),
        );
    }
  };

  const _deleteSelectedContact = (key: string) => {
    firestore()
      .collection('allergies')
      .doc(uid)
      .collection('listAllergies')
      .doc(key)
      .delete()
      .then(() => setSelected(!selected));
  };

  const _returnModalView = () => {
    return(
      <Modal isVisible={isModalVisible} style={{alignItems: 'center'}}>
      <View style={{backgroundColor: 'white', padding: 15, height: '30%', width: '95%', borderRadius: 2, elevation: 3}}>
        <Text style={{color: 'gray', textAlign: 'center', fontSize: 16, borderBottomWidth: 1, borderBottomColor: 'gray', paddingBottom: 10}}>Allergy</Text>
        <DropDownPicker
          items={items}
          placeholder="Allergy type"
          defaultValue={allergy}
          containerStyle={{height: 40, marginVertical: 15}}
          style={{backgroundColor: '#fafafa', width: '100%'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa', width: '100%'}}
          onChangeItem={(item) => setAllergy(item.value)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10}}>
          <TouchableOpacity onPress={_toggleModal}>
            <Text style={{color: '#4994ff', fontSize: 16}}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_addContact}>
            <Text style={{color: '#4994ff', fontSize: 16}}>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    );
  };

  const _renderWhenEmpty = () => {
    return (
      <View
        style={[
          styles.viewWhenEmpty,
          {
            marginTop: isPortrait ? '30%' : 0,
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
          source={require('../../../../../images/emptyallergy.png')}
        />
        <Text style={styles.textStyle}>There were no surgeries added</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.activityIndicatorView}>
        <Spinner isVisible={true} type={'Pulse'} color="#3394ef" size={70} />
      </View>
    );
  }

    return (
      <View style={{flex: 1}}>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}>
          {allergies.length !== 0
            ? allergies.map((value) => {
                return (
                  <TouchableOpacity
                    key={value.key}
                    onLongPress={() =>
                      Alert.alert(
                        'Delete chosen allergy',
                        'Are you sure to delete.',
                        [
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => _deleteSelectedContact(value.key),
                          },
                        ],
                        {cancelable: false},
                      )
                    }
                    style={styles.contactButtonStyle}>
                    <Text style={styles.contactNumberText}>{value.allergy}</Text>
                  </TouchableOpacity>
                );
              })
            : _renderWhenEmpty()}
        </ScrollView>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={_toggleModal}>
          <Ionicons name={'ios-add-circle'} color={'#3394ef'} size={66} />
        </TouchableOpacity>
      </View>
        {_returnModalView()}
      </View>
    );

}

export default Surgery;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  viewWhenEmpty: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  textStyle: {
    fontSize: 18,
    marginTop: 15,
    color: '#777',
  },
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
  contactNumberText: {
    textAlignVertical: 'center',
  },
  contactButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 1,
    padding: 10,
    borderRadius: 3,
    elevation: 3,
  },
  activityIndicatorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});