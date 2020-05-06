import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const CustomButton = props => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				onPress={props.navigate}
				title={props.title}
				color={props.color}
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
