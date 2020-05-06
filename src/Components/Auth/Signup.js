import React , {useState} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import Input from '../../utils/forms/Input';
import CustomButton from '../../utils/forms/CustomButton';
import DatePicker from '../../utils/forms/DatePicker';

const Signup = () => {

	const [isMale, setIsMale] = useState(true);

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

	return (
		<View style={styles.viewContainer}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 , justifyContent: "center", alignItems: "center"}} >
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

					<DatePicker />

					<Input placeholder={"Username"} iconType={"Ionicons"} iconName={"md-person"} iconSize={18} />
					<Input placeholder={"Full name*"} iconType={"Ionicons"} iconName={"md-person"} iconSize={18} />
					<Input placeholder={"Email*"} keyboardType={"email-address"} iconType={"Zocial"} iconName={"email"} iconSize={18} />
					<Input placeholder={"Phone"} keyboardType={"phone-pad"} iconType={"Foundation"} iconName={"telephone"} iconSize={18} />
					<Input placeholder={"Password*"} iconType={"Ionicons"} iconName={"ios-lock"} iconSize={18} showOrHidePassword={true} />
					<Input placeholder={"Repeat password*"} iconType={"Ionicons"} iconName={"ios-lock"} iconSize={18} showOrHidePassword={true} />
					<CustomButton title={"sign up"} color={"#2db7ff"} />
				</View>

				<View>
					<Text style={styles.textBottom}>Already have an account?
						<TouchableWithoutFeedback onPress={() => alert("Login")}>
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
});
