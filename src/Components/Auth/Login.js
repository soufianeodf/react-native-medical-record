import React from 'react';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';


const Login = props => {

    return (
        <View style={styles.viewContainer}>
            <Input placeholder={"email"} keyboardType={"email-address"} iconType={"Zocial"} iconName={"email"} iconSize={18} />
            <Input placeholder={"password"} iconType={"Ionicons"} iconName={"ios-lock"} iconSize={18} showOrHidePassword={true} />
            <CustomButton title={"click me"} />
            <View style={styles.bottomContainer}>
                <TouchableWithoutFeedback onPress={() => alert('test')}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </TouchableWithoutFeedback>
                <Text style={styles.bottomText}>Don't have an account?
                <TouchableWithoutFeedback onPress={() => alert('test')}>
                    <Text style={styles.signupText}> SIGN UP</Text>
                </TouchableWithoutFeedback>
                </Text>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    viewContainer: {
        "flex": 1,
        "alignItems": 'center',
        "justifyContent": 'center',
    },
    bottomContainer: {
        "position": 'relative',
        "top": 25,
        "alignItems": 'center'
      },
      forgotPasswordText: {
        "color": '#2db7ff',
        "textDecorationLine": "underline",
      },
      bottomText: {
        "color": '#888'
      },
      signupText: {
        "fontWeight": "bold",
      },
  });
