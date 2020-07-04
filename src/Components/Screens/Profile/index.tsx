import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Avatar from '../../../utils/Avatar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomModal from '../../../utils/CustomModal';

const Profile = ({navigation}) => {
  const [uid, setUid] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // first card
  const [username, setUsername] = useState('');
  const [fullName_card_1, setFullName_card_1] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // second card
  const [fullName_card_2, setFullName_card_2] = useState('');
  const [affiliationNumber, setAffiliationNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [cin, setCin] = useState('');
  const [relationship, setRelationship] = useState('');
  const [address, setAddress] = useState('');
  const [amoutOfFees, setAmoutOfFees] = useState('');
  const [attachmentNumber, setAttachmentNumber] = useState('');
  // modals
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const [isRelationshipVisible, setIsRelationshipVisible] = useState(false);

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    navigation.addListener('focus', () => {
      let isMounted = true;
      setSuccessMessage('');
      auth().onAuthStateChanged(user => {
        if (user && isMounted) {
          setUid(user.uid);
          firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
              // card 1
              setUsername(
                doc.data().username ? doc.data().username : 'Primary',
              );
              setFullName_card_1(doc.data().fullName);
              setBirthDate(doc.data().birthDate);
              setGender(doc.data().gender);
              setEmail(user.email);
              setPhone(doc.data().phone);
              // card 2
              setFullName_card_2(doc.data().fullName2);
              setAffiliationNumber(doc.data().affiliationNumber);
              setRegistrationNumber(doc.data().registrationNumber);
              setCin(doc.data().cin);
              setRelationship(doc.data().relationship);
              setAddress(doc.data().address);
              setAmoutOfFees(doc.data().amoutOfFees);
              setAttachmentNumber(doc.data().attachmentNumber);
            })
            .catch(error => setErrorMessage(error.message));
        } else {
          navigation.navigate('Login');
        }
      });
    });
    return () => {
      isMounted = false;
    };
  }, [navigation, refresh]);

  const _showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const _hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const _handleConfirm = date => {
    date = moment(date)
      .utc()
      .format('YYYY-MM-DD');
    _hideDatePicker();
    setBirthDate(date);
  };

  function _handleUpdate() {
    firestore()
      .collection('users')
      .doc(uid)
      .set({
        // card 1
        gender,
        birthDate,
        username,
        fullName: fullName_card_1,
        phone,
        // card 2
        fullName2: fullName_card_2,
        affiliationNumber,
        registrationNumber,
        cin,
        relationship,
        address,
        amoutOfFees,
        attachmentNumber,
      })
      .then(() => {
        setSuccessMessage('Your changes have been saved.');
      })
      .catch(() => setErrorMessage('There was a problem saving your changes.'));
  }

  const _clearMessage = () => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.scrollViewContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.iconCheck}>
          <TouchableOpacity onPress={_handleUpdate}>
            <MaterialIcons name={'check'} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconRefresh}>
          <TouchableOpacity onPress={() => setRefresh(value => ++value)}>
            <MaterialIcons name={'refresh'} size={30} />
          </TouchableOpacity>
        </View>
        <Avatar />
        <View style={styles.icon}>
          <MaterialIcons name={'edit'} size={25} />
        </View>
        <Text style={styles.headerText}>Profile information</Text>
      </View>

      <View style={styles.helperDesignView} />

      <View style={styles.formContainer}>
        {successMessage ? (
          <View style={styles.successMessage}>
            <View style={styles.successMessageIcon}>
              <Entypo name={'check'} size={20} />
            </View>
            <Text style={styles.successTextMessage}>{successMessage}</Text>
          </View>
        ) : null}

        {errorMessage ? (
          <View style={styles.successMessage}>
            <View style={styles.errorMessageIcon}>
              <FontAwesome name={'exclamation-circle'} size={20} />
            </View>
            <Text style={styles.errorTextMessage}>{errorMessage}</Text>
          </View>
        ) : null}

        {_clearMessage()}

        <Text style={styles.cardTitle}>Main info</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TextInput
              style={styles.textInput}
              onChangeText={theUsername => setUsername(theUsername)}
              placeholder={'Username'}
              value={username}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={fullName => setFullName_card_1(fullName)}
              placeholder={'Full Name'}
              value={fullName_card_1}
              onSubmitEditing={_handleUpdate}
            />

            <TouchableOpacity
              style={styles.touchableOpacityDatePicker}
              onPress={_showDatePicker}>
              <TextInput
                style={[styles.textInput, {width: '96%'}]}
                editable={false}
                placeholder={'Date of birth'}
                value={birthDate}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              placeholder={'Gender'}
              onTouchEnd={() => {
                setIsGenderVisible(true);
                Keyboard.dismiss();
              }}
              value={gender}
              caretHidden={true}
            />
            <TextInput
              style={styles.textInput}
              editable={false}
              placeholder={'Email'}
              value={email}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={thePhone => setPhone(thePhone)}
              placeholder={'Phone'}
              keyboardType={'phone-pad'}
              value={phone}
              onSubmitEditing={_handleUpdate}
            />
          </View>
        </View>

        <Text style={styles.cardTitle}>Health insurance</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TextInput
              style={styles.textInput}
              onChangeText={fullName => setFullName_card_2(fullName)}
              placeholder={'Full Name'}
              value={fullName_card_2}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={theAffiliationNumber =>
                setAffiliationNumber(theAffiliationNumber)
              }
              placeholder={'Affiliation number'}
              keyboardType={'numeric'}
              value={affiliationNumber}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={theRegistrationNumber =>
                setRegistrationNumber(theRegistrationNumber)
              }
              placeholder={'Registration number'}
              keyboardType={'numeric'}
              value={registrationNumber}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={theCin => setCin(theCin)}
              placeholder={'CIN'}
              value={cin}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={[styles.textInput, {width: '100%'}]}
              placeholder={'Relationship of the beneficiary to the insured'}
              onTouchEnd={() => {
                setIsRelationshipVisible(true);
                Keyboard.dismiss();
              }}
              value={relationship}
              caretHidden={true}
            />
            <TextInput
              style={[styles.textInput, {width: '100%'}]}
              onChangeText={theAddress => setAddress(theAddress)}
              placeholder={'Address'}
              value={address}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={theAmoutOfFees => setAmoutOfFees(theAmoutOfFees)}
              placeholder={'Amount of fees (Dhs)'}
              keyboardType={'decimal-pad'}
              value={amoutOfFees}
              onSubmitEditing={_handleUpdate}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={theAttachmentNumber =>
                setAttachmentNumber(theAttachmentNumber)
              }
              placeholder={'Number of attachments'}
              keyboardType={'numeric'}
              value={attachmentNumber}
              onSubmitEditing={_handleUpdate}
            />
          </View>
        </View>

        <CustomModal
          isItVisible={isGenderVisible}
          _onRequestClose={() => setIsGenderVisible(!isGenderVisible)}
          title={'Gender'}
          _onPress_1={() => {
            setGender('MALE');
            setIsGenderVisible(!isGenderVisible);
          }}
          variable_1={'MALE'}
          _onPress_2={() => {
            setGender('FEMALE');
            setIsGenderVisible(!isGenderVisible);
          }}
          variable_2={'FEMALE'}
          _onPress_3={() => {
            setGender('');
            setIsGenderVisible(!isGenderVisible);
          }}
          variable_3={"I'M NOT SURE"}
        />

        <CustomModal
          isItVisible={isRelationshipVisible}
          _onRequestClose={() =>
            setIsRelationshipVisible(!isRelationshipVisible)
          }
          title={'Relationship of the beneficiary'}
          _onPress_1={() => {
            setRelationship('CHILD');
            setIsRelationshipVisible(!isRelationshipVisible);
          }}
          variable_1={'CHILD'}
          _onPress_2={() => {
            setRelationship('SPOUSE');
            setIsRelationshipVisible(!isRelationshipVisible);
          }}
          variable_2={'SPOUSE'}
          _onPress_3={() => {
            setRelationship('');
            setIsRelationshipVisible(!isRelationshipVisible);
          }}
          variable_3={"I'M NOT SURE"}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={_handleConfirm}
          onCancel={_hideDatePicker}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#54a0ff',
  },
  headerContainer: {
    borderBottomLeftRadius: 40,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#54a0ff',
    paddingBottom: 20,
  },
  helperDesignView: {
    position: 'absolute',
    top: '15%',
    height: '20%',
    backgroundColor: 'white',
    zIndex: 0,
    width: '20%',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 35,
    width: '98%',
    paddingBottom: 8,
    marginBottom: 5,
  },
  iconCheck: {
    position: 'absolute',
    top: '18%',
    right: '5%',
  },
  iconRefresh: {
    position: 'absolute',
    top: '18%',
    left: '5%',
  },
  icon: {
    position: 'absolute',
    top: '56%',
    left: '59%',
  },
  headerText: {
    fontSize: 25,
  },
  cardTitle: {
    marginTop: 7,
    marginLeft: 15,
    marginBottom: 2,
    fontSize: 16,
  },
  card: {
    borderRadius: 3,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 5,
  },
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '48%',
    marginHorizontal: 3,
    marginVertical: 10,
    padding: 3,
  },
  touchableOpacityDatePicker: {
    width: '50%',
  },
  successMessage: {
    alignItems: 'center',
  },
  successMessageIcon: {
    position: 'absolute',
    top: '35%',
    left: '16%',
    zIndex: 5,
  },
  successTextMessage: {
    textAlign: 'center',
    backgroundColor: '#4AB866',
    alignItems: 'center',
    padding: 8,
    width: '85%',
    borderRadius: 2,
    marginTop: 8,
  },
  errorMessageIcon: {
    position: 'absolute',
    top: '36%',
    left: '7%',
    zIndex: 5,
  },
  errorTextMessage: {
    textAlign: 'center',
    backgroundColor: '#D94F4F',
    alignItems: 'center',
    padding: 8,
    width: '89%',
    borderRadius: 2,
    marginTop: 8,
  },
});
