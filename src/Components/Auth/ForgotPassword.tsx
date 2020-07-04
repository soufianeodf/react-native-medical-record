import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import _firebaseAuthErrorMessages from '../../utils/firebaseAuthErrorMessages';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function _handleForgotPassword() {
    if (email === '') {
      setErrorMessage('The email field is empty');
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.navigate('CheckEmail');
        })
        .catch(error =>
          setErrorMessage(_firebaseAuthErrorMessages(error.code)),
        );
    }
  }

  return (
    <View style={styles.viewContainer}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.firstBlockContainer}>
          <Ionicons name="ios-lock" size={50} />
          <Text style={styles.forgotText}>Forgot password?</Text>
          <Text style={styles.descriptionText}>
            We just need your registered email address to send you password
            reset
          </Text>
        </View>

        <View style={styles.secondBlockContainer}>
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorLabel}>{errorMessage}</Text>
            </View>
          ) : null}

          <Input
            placeholder={'E-mail address'}
            keyboardType={'email-address'}
            iconType={'Zocial'}
            iconName={'email'}
            iconSize={18}
            onChangeText={email => {
              setEmail(email);
              setErrorMessage('');
            }}
            _action={_handleForgotPassword}
          />
          <CustomButton
            title={'RESET PASSWORD'}
            color={'#2db7ff'}
            _action={_handleForgotPassword}
          />
        </View>

        <View style={styles.thirdBlockContainer}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>SIGN UP</Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  firstBlockContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  forgotText: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 16,
  },
  descriptionText: {
    color: '#888',
    textAlign: 'center',
    marginHorizontal: 40,
    lineHeight: 18,
  },
  bottomText: {
    color: '#888',
  },
  signupText: {
    fontWeight: 'bold',
  },
  secondBlockContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },
  thirdBlockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
