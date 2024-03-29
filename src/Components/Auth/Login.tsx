import React, {useState, useEffect} from 'react';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import _firebaseAuthErrorMessages from '../../utils/firebaseAuthErrorMessages';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import firestore from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../Navigation/Navigation';

type Props = {
  navigation: StackNavigationProp<StackParamList, 'Login'>;
};

const Login: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    navigation.addListener('focus', () => {
      // set the time to one millisecond to be sure of the state of the user
      setTimeout(() => {
        auth().onAuthStateChanged(user => {
          if (user) {
            navigation.navigate('Home');
          } else {
            setEmail('');
            setPassword('');
            setErrorMessage('');
          }
        });
      }, 1);
    });
  }, [navigation]);

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  function _loginMethodButton(name, bgColor, text, signInFunction) {
    return (
      <View style={styles.loginMethodButtonContainer}>
        <Ionicons.Button
          name={name}
          backgroundColor={bgColor}
          onPress={() => signInFunction ? signInFunction().then(() => alert('you are logged in')) : alert('Not implemented yet.')}>
          <Text style={{fontSize: 15, color: '#fff'}}>{text}</Text>
        </Ionicons.Button>
      </View>
    );
  }

  function _firebasestuff() {
    auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            gender: '',
            birthDate: '',
            username: '',
            fullName: '',
            phone: '',

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
              .doc(user.uid)
              .update({
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
              .catch(error => console.log(error.message + ' 1'));
          })
          .catch(error => console.log(error.message + ' 2'));
      }
    });
  }

  function _handleLogin() {
    if (email === '' || password === '') {
      setErrorMessage('The email or password is empty');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Home');
        })
        .catch(error =>
          setErrorMessage(_firebaseAuthErrorMessages(error.code)),
        );
    }
  }

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../../images/medical.png')}
        />
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{errorMessage}</Text>
          </View>
        ) : null}

        {_loginMethodButton('logo-facebook', '#39589A', 'Login with Facebook', onFacebookButtonPress)}
        {_loginMethodButton('logo-twitter', '#50ABF1', 'Login with Twitter')}
        {_loginMethodButton('logo-google', '#DD4B39', 'Login with Google')}

        <Input
          placeholder={'Email'}
          keyboardType={'email-address'}
          iconType={'Zocial'}
          iconName={'email'}
          iconSize={18}
          onChangeText={email => {
            setEmail(email);
            setErrorMessage('');
          }}
          _action={_handleLogin}
          value={email}
        />
        <Input
          placeholder={'Password'}
          iconType={'Ionicons'}
          iconName={'ios-lock'}
          iconSize={18}
          showOrHidePassword={true}
          onChangeText={password => {
            setPassword(password);
            setErrorMessage('');
          }}
          _action={_handleLogin}
          value={password}
        />

        <CustomButton
          title={'LOG IN'}
          color={'#2db7ff'}
          _action={_handleLogin}
        />

        <View style={styles.bottomContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.bottomText}>
            Don't have an account?
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}> SIGN UP</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 215,
    height: 176,
    marginBottom: 8,
    marginLeft: 15,
  },
  loginMethodButtonContainer: {
    width: '80%',
    marginBottom: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  forgotPasswordText: {
    color: '#2db7ff',
    textDecorationLine: 'underline',
  },
  bottomText: {
    color: '#888',
  },
  signupText: {
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
