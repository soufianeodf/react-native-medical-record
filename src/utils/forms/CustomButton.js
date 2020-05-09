import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const CustomButton = ({action, title, color}) => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				onPress={action}
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
