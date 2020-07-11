import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import DatePicker from '../../utils/forms/DatePickerInput';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import Avatar from '../../utils/Avatar';
import _firebaseAuthErrorMessages from '../../utils/firebaseAuthErrorMessages';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../Navigation/Navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'Signup'>;
};

const Signup: React.FC<Props> = ({navigation}) => {
  const [isMale, setIsMale] = useState(true);
  const [birthDate, setBirthDate] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('Home');
        }
      });
    });
  }, [navigation]);

  function _toggleGenre(genre) {
    if (genre === 'male') {
      if (!isMale) {
        setIsMale(true);
      }
    } else if (genre === 'female') {
      if (isMale) {
        setIsMale(false);
      }
    }
  }

  function _radioButton(params) {
    return (
      <TouchableOpacity onPress={() => _toggleGenre(params.genre)}>
        <View
          style={{
            height: 18,
            width: 18,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#353232',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {params.selected ? (
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 6,
                backgroundColor: '#353232',
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  function _handleSignup() {
    if (
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      fullName === ''
    ) {
      setErrorMessage('Please fill up the necessary fields.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Password and Repeat password should match.');
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(credentials => {
          firestore()
            .collection('users')
            .doc(credentials.user.uid)
            .set({
              gender: isMale ? 'Male' : 'Female',
              birthDate,
              username,
              fullName,
              phone,

              fullName2: '',
              affiliationNumber: '',
              registrationNumber: '',
              cin: '',
              relationship: '',
              address: '',
              amoutOfFees: '',
              attachmentNumber: '',
            })
            .then(() => {
              firestore()
                .collection('medicalPrecedents')
                .doc(credentials.user.uid)
                .set({
                  checkBox_1: false,
                  checkBox_2: false,
                  checkBox_3: false,
                  checkBox_4: false,
                  checkBox_5: false,
                  checkBox_6: false,
                  checkBox_7: false,
                  checkBox_8: false,
                  checkBox_9: false,
                  checkBox_10: false,
                })
                .then(() => {
                  navigation.navigate('Home');
                })
                .catch(error => setErrorMessage(error.message));
            })
            .catch(error => setErrorMessage(error.message));
        })
        .catch(error =>
          setErrorMessage(_firebaseAuthErrorMessages(error.code)),
        );
    }
  }

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        {/* <Avatar /> */}

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.firstBlockContainer}>
          <View style={styles.radioContainer}>
            <View style={styles.radioContainerInnerGender}>
              <Text>Gender: </Text>
            </View>
            <View style={styles.radioContainerInnerElements}>
              <Text>Male </Text>
              {_radioButton({selected: isMale, genre: 'male'})}
            </View>
            <View style={styles.radioContainerInnerElements}>
              <Text>Female </Text>
              {_radioButton({selected: !isMale, genre: 'female'})}
            </View>
          </View>

          <DatePicker _setBirthDate={date => setBirthDate(date)} />

          <Input
            placeholder={'Username'}
            iconType={'Ionicons'}
            iconName={'md-person'}
            iconSize={18}
            onChangeText={username => {
              setUsername(username);
              setErrorMessage('');
            }}
            _action={_handleSignup}
          />
          <Input
            placeholder={'Full name*'}
            iconType={'Ionicons'}
            iconName={'md-person'}
            iconSize={18}
            onChangeText={fullName => {
              setFullName(fullName);
              setErrorMessage('');
            }}
            _action={_handleSignup}
          />
          <Input
            placeholder={'Email*'}
            keyboardType={'email-address'}
            iconType={'Zocial'}
            iconName={'email'}
            iconSize={18}
            onChangeText={email => {
              setEmail(email);
              setErrorMessage('');
            }}
            _action={_handleSignup}
          />
          <Input
            placeholder={'Phone'}
            keyboardType={'phone-pad'}
            iconType={'Foundation'}
            iconName={'telephone'}
            iconSize={18}
            onChangeText={phone => {
              setPhone(phone);
              setErrorMessage('');
            }}
            _action={_handleSignup}
          />
          <Input
            placeholder={'Password*'}
            iconType={'Ionicons'}
            iconName={'ios-lock'}
            iconSize={18}
            showOrHidePassword={true}
            onChangeText={password => {
              setPassword(password);
              setErrorMessage('');
            }}
            _action={_handleSignup}
          />
          <Input
            placeholder={'Repeat password*'}
            iconType={'Ionicons'}
            iconName={'ios-lock'}
            iconSize={18}
            showOrHidePassword={true}
            onChangeText={confirmPassword => {
              setConfirmPassword(confirmPassword);
              setErrorMessage('');
            }}
            _action={_handleSignup}
          />
          <CustomButton
            title={'sign up'}
            color={'#2db7ff'}
            _action={_handleSignup}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.textBottom}>
            Already have an account?
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signinText}> SIGN IN</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstBlockContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  radioContainerInnerGender: {
    flex: 1,
  },
  radioContainerInnerElements: {
    flex: 1,
    flexDirection: 'row',
  },
  bottomContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  textBottom: {
    color: '#888',
  },
  signinText: {
    fontWeight: 'bold',
  },
  errorContainer: {
    padding: 5,
    width: '80%',
  },
  errorLabel: {
    color: '#f44336',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
