import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const CustomButton = ({_action, title, color}) => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				onPress={_action}
				title={title}
				color={color}
			/>
		</View>
	);
}

export default CustomButton;

const styles = StyleSheet.create({
	buttonContainer: {
		"width": "80%",
	},
});
