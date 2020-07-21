import React, {useState} from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Diabetes = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [allergy, setAllergy] = useState('');

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
  
  const toggleModal = () => {
    console.log(isModalVisible);
    setModalVisible(!isModalVisible);
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
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{color: 'blue'}}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{color: 'blue'}}>DONE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    );
  };

    return (
      <View style={{flex: 1}}>
        <Button title="Show modal" onPress={toggleModal} />

        {_returnModalView()}
      </View>
    );

}

export default Diabetes;