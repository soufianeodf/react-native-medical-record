import React , {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DatePicker = ({_setBirthDate}) => {

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [birthDate, setBirthDate] = useState("");

	const _showDatePicker = () => {
	setDatePickerVisibility(true);
	};

	const _hideDatePicker = () => {
			setDatePickerVisibility(false);
	};

	const _handleConfirm = (date) => {
			date = moment(date).utc().format("YYYY-MM-DD");
			_hideDatePicker();
			setBirthDate(date);
			_setBirthDate(date);
	};

	return (
		<View style={[styles.datePickerViewContainer]}>
			<Text>Date of Birth: </Text>
			<View style={styles.textInputContainer}>
				<View style={styles.textInputInnerView}>
					<TextInput style={styles.textInput} editable={false} value={birthDate} />
				</View>
				<TouchableWithoutFeedback onPress={_showDatePicker} >
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
				onConfirm={_handleConfirm}
				onCancel={_hideDatePicker}
			/>
		</View>
	);
}

export default DatePicker;

const styles = StyleSheet.create({
	datePickerViewContainer: {
		"flexDirection": "row",
		"justifyContent": "space-around",
		"width": "80%",
	},
	textInputContainer: {
		"flexDirection": "row", 
		"flex": 1,
	},
	textInputInnerView: {
		"flex": 1,
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
