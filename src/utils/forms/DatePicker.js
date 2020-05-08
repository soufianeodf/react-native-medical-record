import React , {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DatePicker = (props) => {

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [birthDate, setBirthDate] = useState("");

	const showDatePicker = () => {
	setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
			setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
			date = moment(date).utc().format("YYYY-MM-DD");
			setBirthDate(date);
			props.setBirthDate(date);
			hideDatePicker();
	};

	return (
		<View style={[styles.datePickerContainer]}>
			<Text>Date of Birth: </Text>
			<View style={{flexDirection: "row", flex: 1}}>
				<View style={{flex: 1}}>
					<TextInput style={styles.textInput} editable={false} value={birthDate} />
				</View>
				<TouchableWithoutFeedback onPress={showDatePicker} >
					<FontAwesome 
						name={"calendar"}
						style={{marginLeft: 5}}
						size={18}
					/>
				</TouchableWithoutFeedback>
			</View>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</View>
	);
}

export default DatePicker;

const styles = StyleSheet.create({
	datePickerContainer: {
		"flexDirection": "row",
		"justifyContent": "space-around",
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
});
