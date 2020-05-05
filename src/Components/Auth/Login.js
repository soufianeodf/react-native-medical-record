import React from 'react';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';


const Login = props => {

    return (
        <View style={{alignItems: 'center'}}>
            <Input placeholder={"email"} keyboardType={"email-address"} />
            <Input placeholder={"password"} />
            <CustomButton title={"click me"} />
            <View style={styles.bottomContainer}>
                <TouchableWithoutFeedback onPress={() => alert('test')}>
                    <Text style={styles.textForgotPassword}>Forgot password?</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.textBottom}>Don't have an account?
                <TouchableWithoutFeedback onPress={() => alert('test')}>
                    <Text style={styles.signIn}> SIGN UP</Text>
                </TouchableWithoutFeedback>
                </Text>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    bottomContainer: {
        "position": 'relative',
        "top": 25,
        "alignItems": 'center'
      },
      textForgotPassword: {
        "color": '#2db7ff',
        "textDecorationLine": "underline",
      },
      textBottom: {
        "color": '#888'
      },
      signIn: {
        "fontWeight": "bold",
      },
  });
