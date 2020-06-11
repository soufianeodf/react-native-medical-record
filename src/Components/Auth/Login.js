import React, {useState, useEffect} from 'react';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import _firebaseAuthErrorMessages from '../../utils/firebaseAuthErrorMessages.js';

const Login = ({navigation}) => {
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

  function _loginMethodButton(name, bgColor, text) {
    return (
      <View style={styles.loginMethodButtonContainer}>
        <Ionicons.Button
          name={name}
          backgroundColor={bgColor}
          onPress={() => alert('Not implemented yet')}>
          <Text style={{fontSize: 15, color: '#fff'}}>{text}</Text>
        </Ionicons.Button>
      </View>
    );
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
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>{errorMessage}</Text>
          </View>
        ) : null}

        {_loginMethodButton('logo-facebook', '#39589A', 'Login with Facebook')}
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
    marginTop: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
