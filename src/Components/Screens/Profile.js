import React , {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import Avatar from '../../utils/Avatar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const Profile = () => {

  // first card
	const [username, setUsername] = useState("");
	const [fullName_card_1, setFullName_card_1] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [isMale, setIsMale] = useState(true);
	const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // second card
	const [fullName_card_2, setFullName_card_2] = useState("");
	const [affiliationNumber, setAffiliationNumber] = useState("");
	const [registrationNumber, setRegistrationNumber] = useState("");
	const [cin, setCin] = useState("");
	const [relationship, setRelationship] = useState("");
	const [address, setAddress] = useState("");
	const [amoutOfFees, setAmoutOfFees] = useState("");
  const [attachmentNumber, setAttachmentNumber] = useState("");
  
  // modals
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const [isRelationshipVisible, setIsRelationshipVisible] = useState(false);

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
  };
  
  return (
    <ScrollView keyboardShouldPersistTaps="always">

      <View style={styles.headerContainer}>
        <Avatar avatar={require("../../../Images/avatar.png")}/>
        <View style={styles.icon}>
          <MaterialIcons name={"edit"} size={25} />
        </View>
        <Text style={styles.headerText}>Profile information</Text>
      </View>

      <Text style={styles.cardTitle}>Main info</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TextInput
            style={styles.textInput}
            onChangeText={(username) => setUsername(username)}
            placeholder={"Username"}
            value={username}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(fullName) => setFullName_card_1(fullName)}
            placeholder={"Full Name"}
            value={fullName_card_1}
          />

          <TouchableOpacity 
            style={styles.touchableOpacityDatePicker} 
            onPress={_showDatePicker}
          >
            <TextInput
              style={[styles.textInput, {width: "96%"}]}
              editable={false}
              placeholder={"Date of birth"}
              value={birthDate}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => console.log(text)}
            placeholder={"Gender"}
            onTouchStart={() => setIsGenderVisible(true)}
            value={isMale ? "MALE" : "FEMALE"}
            caretHidden={true}
          />
          <TextInput
            style={styles.textInput}
            editable={false}
            placeholder={"Email"}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(phone) => setPhone(phone)}
            placeholder={"Phone"}
            keyboardType={"phone-pad"} 
            value={phone}
          />
        </View>
      </View>

      <Text style={styles.cardTitle}>Health insurance</Text>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <TextInput
            style={styles.textInput}
            onChangeText={(fullName) => setFullName_card_2(fullName)}
            placeholder={"Full Name"}
            value={fullName_card_2}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(affiliationNumber) => setAffiliationNumber(affiliationNumber)}
            placeholder={"Affiliation number"}
            keyboardType={"numeric"}
            value={affiliationNumber}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(registrationNumber) => setRegistrationNumber(registrationNumber)}
            placeholder={"Registration number"}
            keyboardType={"numeric"}
            value={registrationNumber}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(cin) => setCin(cin)}
            placeholder={"CIN"}
            value={cin}
          />
          <TextInput
            style={[styles.textInput, { width: "100%"}]}
            placeholder={"Relationship of the beneficiary to the insured"}
            onTouchStart={() => setIsRelationshipVisible(true)}
            value={relationship}
            caretHidden={true}
          />
          <TextInput
            style={[styles.textInput, { width: "100%"}]}
            onChangeText={(address) => setAddress(address)}
            placeholder={"Address"}
            value={address}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(amoutOfFees) => setAmoutOfFees(amoutOfFees)}
            placeholder={"Amount of fees (Dhs)"}
            keyboardType={"decimal-pad"}
            value={amoutOfFees}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(attachmentNumber) => setAttachmentNumber(attachmentNumber)}
            placeholder={"Number of attachments"}
            keyboardType={"numeric"}
            value={attachmentNumber}
          />
        </View>
      </View>

      <Modal visible={isGenderVisible} transparent={true} animationType="fade" onRequestClose={() => setIsGenderVisible(!isGenderVisible)}>
        <View style={{flex: 1, backgroundColor: "#000000aa", justifyContent: "center"}}>
          <View style={{backgroundColor: "#fff", margin: 50}}>
            <Text style={{borderBottomWidth: 1, width: "100%", textAlign: "center", padding: 15, color: "grey"}}>Gender</Text>
            <TouchableHighlight onPress={() => {setIsMale(true); setIsGenderVisible(!isGenderVisible)}} style={{ width: "100%", borderBottomWidth: 1}}>
              <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>MALE</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {setIsMale(false); setIsGenderVisible(!isGenderVisible)}}>
              <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>FEMALE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Modal visible={isRelationshipVisible} transparent={true} animationType="fade" onRequestClose={() => setIsRelationshipVisible(!isRelationshipVisible)}>
        <View style={{flex: 1, backgroundColor: "#000000aa", justifyContent: "center"}}>
          <View style={{backgroundColor: "#fff", margin: 50}}>
            <Text style={{borderBottomWidth: 1, width: "100%", textAlign: "center", padding: 15, color: "grey"}}>Relationship of the beneficiary</Text>
            <TouchableHighlight onPress={() => {setRelationship("CHILD"); setIsRelationshipVisible(!isRelationshipVisible)}} style={{ width: "100%", borderBottomWidth: 1}}>
              <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>CHILD</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {setRelationship("SPOUSE"); setIsRelationshipVisible(!isRelationshipVisible)}}>
              <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>SPOUSE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={_handleConfirm}
				onCancel={_hideDatePicker}
			/>

    </ScrollView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  headerContainer: {
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": "#2db7ff",
    "paddingBottom": 20,
    "marginBottom": 10
  },
  icon: {
    "position": "absolute",
    "top": "56%",
    "left": "59%",
  },
  headerText: {
    "fontSize": 25,
  },
  cardTitle: {
    "marginTop": 10,
    "marginLeft": 15,
    "marginBottom": 2,
    "fontSize": 16,
  },
  card: {
    "borderRadius": 3,
    "elevation": 3,
    "backgroundColor": "#fff",
    "shadowOffset": { "width": 1, "height": 1},
    "shadowColor": "#333",
    "shadowOpacity": 0.3,
    "marginHorizontal": 15,
    "marginBottom": 10,
    "padding": 5,
  },
  cardContent: {
    "flexDirection": "row",
    "flexWrap": "wrap",
    "justifyContent": "center",
  },
  textInput: {
    "borderBottomWidth": 1,
    "borderBottomColor": '#000',
    "width": "48%",
    "marginHorizontal": 3,
    "marginVertical": 10,
    "padding": 3,
  },
  touchableOpacityDatePicker: {
    "width": "50%",
  },
});
