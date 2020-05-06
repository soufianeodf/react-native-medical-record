import React from 'react';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Login = props => {

	function _loginMethodButton(name, bgColor, text) {
		return(
			<View style={styles.loginMethodButtonContainer}>
				<Ionicons.Button
					name={name}
					backgroundColor={bgColor}
					onPress={() => alert("log in with" + name)}
				>
					<Text style={{fontSize: 15 , color: "#fff"}}>
						{text}
					</Text>
				</Ionicons.Button>
			</View>
		);
	}

	return (
		<View style={styles.viewContainer}>
			{_loginMethodButton("logo-facebook", "#39589A", "Login with Facebook")}
			{_loginMethodButton("logo-twitter", "#50ABF1", "Login with Twitter")}
			{_loginMethodButton("logo-google", "#DD4B39", "Login with Google")}

			<Input placeholder={"Email"} keyboardType={"email-address"} iconType={"Zocial"} iconName={"email"} iconSize={18} />
			<Input placeholder={"Password"} iconType={"Ionicons"} iconName={"ios-lock"} iconSize={18} showOrHidePassword={true} />
			<CustomButton title={"LOG IN"} color={"#2db7ff"} />
			<View style={styles.bottomContainer}>
				<TouchableWithoutFeedback onPress={() => props.navigation.navigate("ForgotPassword")}>
					<Text style={styles.forgotPasswordText}>Forgot password?</Text>
				</TouchableWithoutFeedback>
				<Text style={styles.bottomText}>Don't have an account?
				<TouchableWithoutFeedback onPress={() => props.navigation.navigate("Signup")}>
					<Text style={styles.signupText}> SIGN UP</Text>
				</TouchableWithoutFeedback>
				</Text>
			</View>
		</View>
	);
}

export default Login;

const styles = StyleSheet.create({
	viewContainer: {
		"flex": 1,
		"alignItems": "center",
		"justifyContent": "center",
	},
	loginMethodButtonContainer: {
		"width": "80%" , 
		"marginBottom": 10,
	},
	bottomContainer: {
		"position": "relative",
		"top": 25,
		"alignItems": "center",
		},
	forgotPasswordText: {
		"color": "#2db7ff",
		"textDecorationLine": "underline",
	},
	bottomText: {
		"color": "#888",
	},
	signupText: {
		"fontWeight": "bold",
	},
});
