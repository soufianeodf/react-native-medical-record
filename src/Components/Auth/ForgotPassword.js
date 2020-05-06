import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgotPassword = props => {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.firstBlockContainer}>
        <Ionicons
          name="ios-lock"
          size={50}
        />
        <Text style={styles.forgotText}>Forgot password?</Text>
        <Text style={styles.descriptionText}>We just need your registered email address to send you password reset</Text>
      </View>

      <View style={styles.secondBlockContainer}>
        <Input placeholder={"E-mail address"} keyboardType={"email-address"} iconType={"Zocial"} iconName={"email"} iconSize={18} />
        <CustomButton title={"RESET PASSWORD"} color={"#2db7ff"} navigate={() => props.navigation.navigate("CheckEmail")} />
      </View>

      <View style={styles.thirdBlockContainer}>
        <Text style={styles.bottomText}>Don't have an account?</Text>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Signup")}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default ForgotPassword

const styles = StyleSheet.create({
  viewContainer: {
    "flex": 1,
    "alignItems": "center",
  },
  firstBlockContainer: {
    "flex": 1,
    "alignItems": "center",
    "marginTop": 40,
  },
  forgotText: {
    "fontWeight": "bold",
    "marginVertical": 10,
    "fontSize": 16,
  },
  descriptionText: {
    "color": "#888",
    "textAlign": "center",
    "marginHorizontal": 40,
    "lineHeight": 18,
    },
  bottomText: {
    "color": "#888",
  },
  signupText: {
    "fontWeight": "bold",
  },
  secondBlockContainer: {
    "flex": 1,
    "alignItems": "center",
    "marginTop": 50,
    "width": "100%",
  },
  thirdBlockContainer: {
    "flex": 1,
    "justifyContent": "flex-end",
    "alignItems": "center",
    "marginBottom": 20,
  },
});
