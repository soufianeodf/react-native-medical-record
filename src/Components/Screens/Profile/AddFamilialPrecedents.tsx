import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddFamilialPrecedents() {
  const [country, setCountry] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const items = [
    {
      label: 'Mother',
      value: 'Mother',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Father',
      value: 'Father',
      icon: () => <MaterialIcons name={'person'} size={18} color={'gray'} />,
    },
    {
      label: 'Siblings',
      value: 'Siblings',
      icon: () => <MaterialIcons name="person" size={18} color="gray" />,
    },
    {
      label: 'Grand Parents',
      value: 'Grand_Parents',
      icon: () => <MaterialIcons name="person" size={18} color="gray" />,
    },
    {
      label: 'Children',
      value: 'Children',
      icon: () => <MaterialIcons name="person" size={18} color="gray" />,
    },
    {
      label: 'Others',
      value: 'Others',
      icon: () => <MaterialIcons name="person" size={18} color="gray" />,
    },
  ];

  return (
    <View style={styles.viewContainer}>
      <DropDownPicker
        items={items}
        placeholder="Choose A Family Member"
        defaultValue={country}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa', width: '60%'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{backgroundColor: '#fafafa', width: '60%'}}
        onChangeItem={(item) => setCountry(item.value)}
      />
      <View style={styles.textInputView}>
        <Text style={styles.textStyle}>Medical History</Text>
        <TextInput
          style={styles.textInput}
          multiline
          onChange={(text) => setMedicalHistory(text)}
          value={medicalHistory}
          placeholder="Enter the medical history here"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 20,
  },
  textInputView: {
    marginTop: 20,
    paddingLeft: 5,
  },
  textStyle: {
    fontSize: 17,
    marginBottom: -10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    marginHorizontal: 3,
    marginVertical: 10,
    padding: 3,
  },
});
