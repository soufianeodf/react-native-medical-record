import React, {useState} from 'react';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebaseAuth } from '../../environment/config';

const Login = (props) => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

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

	function _handleLogin() {
    firebaseAuth.signInWithEmailAndPassword(email, password).then(() => { props.navigation.navigate('Main'); })
    .catch(error => setErrorMessage(error.message) );
	}

	return (
		<View style={styles.viewContainer}>
			{errorMessage ? (<Text>{errorMessage}</Text>) : null}
			{_loginMethodButton("logo-facebook", "#39589A", "Login with Facebook")}
			{_loginMethodButton("logo-twitter", "#50ABF1", "Login with Twitter")}
			{_loginMethodButton("logo-google", "#DD4B39", "Login with Google")}

			<Input 
				placeholder={"Email"} 
				keyboardType={"email-address"} 
				iconType={"Zocial"} 
				iconName={"email"} 
				iconSize={18}    
				onChangeText={email => {setEmail(email); setErrorMessage("")}} 
				action={_handleLogin} 
			/>
			<Input 
				placeholder={"Password"} 
				iconType={"Ionicons"} 
				iconName={"ios-lock"} 
				iconSize={18} 
				showOrHidePassword={true} 
				onChangeText={password => {setPassword(password); setErrorMessage("")}} 
				action={_handleLogin} 
			/>
			<CustomButton title={"LOG IN"} color={"#2db7ff"} action={_handleLogin} />
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
