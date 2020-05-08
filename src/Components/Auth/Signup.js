import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import DatePicker from '../../utils/forms/DatePicker';
import firebase from '../../environment/config';

const Signup = (props) => {

	const [isMale, setIsMale] = useState(true);
	const [birthDate, setBirthDate] = useState("");
	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
    props.navigation.addListener('focus', () => {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					props.navigation.navigate("Main");
				}
      });
		});
	}, [props.navigation]);
	
	const _setBirthDate = (date) => {
		setBirthDate(date);
	}

	function _toggleGenre(genre) {
		if(genre === "male"){
			if(!isMale){
				setIsMale(true);
			}
		}else if(genre === "female"){
			if(isMale){
				setIsMale(false);
			}
		}
	}

	function _radioButton(params) {
		return (
			<TouchableOpacity
				onPress={() => _toggleGenre(params.genre)}
			>
				<View style={{
					height: 18,
					width: 18,
					borderRadius: 12,
					borderWidth: 2,
					borderColor: "#353232",
					alignItems: "center",
					justifyContent: "center",
				}}>
				{
					params.selected ?
					<View style={{
						height: 10,
						width: 10,
						borderRadius: 6,
						backgroundColor: "#353232",
					}}/>
					: null
				}
				</View>
			</TouchableOpacity>
		);
	}

	function _handleSignup() {
		console.log(isMale + ' ' + birthDate + ' ' + username + ' ' + phone);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((credentials) => {
			firebase.firestore().collection("users").doc(credentials.user.uid).set({
				gender: isMale ? "Male" : "Female",
				birthDate: birthDate,
				username: username,
				fullName: fullName,
				phone: phone,
			})
			.then(() => {
				console.log(isMale + ' ' + birthDate + ' ' + username + ' ' + phone);
				props.navigation.navigate("Main"); 
			}).catch((error) => setErrorMessage(error.message));
		}).catch((error) => setErrorMessage(error.message));
	}

	return (
		<View style={styles.viewContainer}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 , justifyContent: "center", alignItems: "center"}} >
			
				{errorMessage ? 
					(<View style={styles.errorContainer}>
						<Text style={styles.errorLabel}>{errorMessage}</Text>
					</View>
					) : null
				}

				<View style={styles.firstBlockContainer}>
					<View style={styles.radioContainer}>
						<View style={styles.radioContainerInnerGender}>
							<Text>Gender: </Text>
						</View>
						<View style={styles.radioContainerInnerElements}>
							<Text>Male </Text>
							{_radioButton({selected: isMale, genre: "male"})}
						</View>
						<View style={styles.radioContainerInnerElements}>
							<Text>Female </Text>
							{_radioButton({selected: !isMale, genre: "female"})}
						</View>
					</View>

					<DatePicker setBirthDate={_setBirthDate} />

					<Input 
						placeholder={"Username"} 
						iconType={"Ionicons"} 
						iconName={"md-person"} 
						iconSize={18} 
						onChangeText={(username) => {setUsername(username); setErrorMessage("");}} 
						action={_handleSignup} 
					/>
					<Input 
						placeholder={"Full name*"} 
						iconType={"Ionicons"} 
						iconName={"md-person"} 
						iconSize={18} 
						onChangeText={(fullName) => {setFullName(fullName); setErrorMessage("");}} 
						action={_handleSignup} 
					/>
					<Input 
						placeholder={"Email*"} 
						keyboardType={"email-address"} 
						iconType={"Zocial"} 
						iconName={"email"} 
						iconSize={18} 
						onChangeText={(email) => {setEmail(email); setErrorMessage("");}} 
						action={_handleSignup}  
					/>
					<Input 
						placeholder={"Phone"} 
						keyboardType={"phone-pad"} 
						iconType={"Foundation"} 
						iconName={"telephone"} 
						iconSize={18} 
						onChangeText={(phone) => {setPhone(phone); setErrorMessage("");}} 
						action={_handleSignup} 
					/>
					<Input 
						placeholder={"Password*"} 
						iconType={"Ionicons"} 
						iconName={"ios-lock"} 
						iconSize={18} showOrHidePassword={true} 
						onChangeText={(password) => {setPassword(password); setErrorMessage("");}} 
						action={_handleSignup} 
					/>
					<Input 
						placeholder={"Repeat password*"} 
						iconType={"Ionicons"} 
						iconName={"ios-lock"} 
						iconSize={18} 
						showOrHidePassword={true} 
						onChangeText={(confirmPassword) => {setConfirmPassword(confirmPassword); setErrorMessage("");}} 
						action={_handleSignup} 
					/>
					<CustomButton title={"sign up"} color={"#2db7ff"} action={_handleSignup} />
				</View>

				<View>
					<Text style={styles.textBottom}>Already have an account?
						<TouchableWithoutFeedback onPress={() => props.navigation.navigate("Login")}>
							<Text style={styles.signinText}> SIGN IN</Text>
						</TouchableWithoutFeedback>
					</Text>
				</View>
			</ScrollView>
		</View>
	);
}

export default Signup;

const styles = StyleSheet.create({
	viewContainer: {
		"flex": 1,
		"justifyContent": "center",
		"alignItems": "center",
		"marginTop": 20,
	},
	firstBlockContainer: {
		"width": "100%",
		"justifyContent": "center",
		"alignItems": "center",
	},
	radioContainer: {
		"flexDirection": "row",
		"justifyContent": "space-around",
		"width": "80%",
		"marginBottom": 10,
	},
	radioContainerInnerGender: {
		"flex": 1,
	},
	radioContainerInnerElements: {
		"flex": 1,
		"flexDirection": "row",
	},
	textBottom: {
		"position": "relative",
		"top": 25,
		"color": "#888",
		},
	signinText: {
		"fontWeight": "bold",
	},
	errorContainer: {
    "padding": 5,
		"width": "80%",
  },
  errorLabel: {
    "color": "#f44336",
    "textAlign": "center",
    "textAlignVertical": "center",
  },
});
