import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  FlatList,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReferenceData = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([{code: 1, nom: 'test'}]);
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    firestore()
      .collection('medications')
      .get()
      .then(querySnapshot => {
        const users = [];
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          users.push(documentSnapshot.data());
        });
        setUsers(users);
        setLoading(false);
      })
      .catch(error => Alert.alert(error));
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOn(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOn(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: isKeyboardOn ? 1.9 : 0.8,
          backgroundColor: 'orange',
          borderBottomRightRadius: 25,
          borderBottomLeftRadius: 25,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 8,
            fontFamily: 'serif',
            marginVertical: 15,
          }}>
          Medications list
        </Text>
        <View style={{alignItems: 'center', marginBottom: 5}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 5,
            }}>
            <Ionicons name={'md-search'} color={'grey'} size={30} />
            <TextInput style={{width: 320, height: 40}}>Type Here...</TextInput>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{flex: 4, backgroundColor: 'white', padding: 5, paddingTop: 10}}>
        <FlatList
          data={users}
          keyExtractor={item => item.CODE}
          renderItem={({item}) => (
            <Text
              style={{
                borderWidth: 0.5,
                borderColor: 'white',
                paddingVertical: 15,
                margin: 8,
                borderRadius: 3,
                elevation: 1,
                paddingLeft: 5,
              }}>
              {' '}
              {item.NOM}{' '}
            </Text>
          )}
        />
      </View>
    </View>
  );
};

export default ReferenceData;

const styles = StyleSheet.create({});
