import React , {useState} from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Zocial from 'react-native-vector-icons/Zocial';
import Foundation from 'react-native-vector-icons/Foundation';

const Input = ({showOrHidePassword, iconType, iconName, iconSize, onChangeText, placeholder, keyboardType, _action, value}) => {

	const [showPass, setShowPass] = useState(!showOrHidePassword);

	function _renderIconType(iconType, iconName, iconSize) {
		switch (iconType) {
			case "Ionicons":
				return (
					<Ionicons
						name={iconName}
						style={styles.leftIcon}
						size={iconSize}
					/>
				);
			case "Zocial":
				return (
					<Zocial
						name={iconName}
						style={styles.leftIcon}
						size={iconSize}
					/>
				);
			case "Foundation":
				return (
					<Foundation
						name={iconName}
						style={styles.leftIcon}
						size={iconSize}
					/>
				);
			default:
				return null;
		}
	}

	function _renderIconShowOrHidePassword(iconSize) {
		return(
			<TouchableWithoutFeedback onPress={() => setShowPass(!showPass)}>
				<Ionicons
					name={ !showPass ? "ios-eye" : "ios-eye-off"}
					style={styles.rightIcon}
					size={iconSize}
				/>
			</TouchableWithoutFeedback>
		);
	}

	return (
		<View style={styles.textInputContainer}>
			{_renderIconType(iconType, iconName, iconSize)}
			<TextInput
				style={styles.textInput}
				onChangeText={onChangeText}
				placeholder={placeholder}
				keyboardType={keyboardType}
				onSubmitEditing={_action}
				secureTextEntry={!showPass}
				value={value}
			/>
			{showOrHidePassword ? _renderIconShowOrHidePassword(iconSize) : null}
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	textInputContainer: {
		"width": "80%",
	},
	textInput: {
		"height": 40,
		"borderTopLeftRadius": 4,
		"borderTopRightRadius": 4,
		"borderBottomRightRadius": 4,
		"borderBottomLeftRadius": 4,
		"borderWidth": 1,
		"borderColor": "#aa9e9e",
		"borderStyle": "solid",
		"paddingLeft": 40,
		"marginBottom": 10,
		"paddingRight": 35,
	},
	leftIcon: {
		"position": "absolute",
		"top": 10,
		"left": 16,
	},
	rightIcon: {
		"position": "absolute",
		"top": 10,
		"right": 12,
	},
});
