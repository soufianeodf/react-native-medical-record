import React from 'react';
import { StyleSheet, Text, View ,Modal, TouchableHighlight} from 'react-native';

const CustomModal = ({isItVisible, _onRequestClose, title, _onPress_1, variable_1, _onPress_2, variable_2 }) => {
  return (
    <Modal visible={isItVisible} transparent={true} animationType="fade" onRequestClose={_onRequestClose}>
      <View style={{flex: 1, backgroundColor: "#000000aa", justifyContent: "center"}}>
        <View style={{backgroundColor: "#fff", margin: 50}}>
          <Text style={{borderBottomWidth: 1, width: "100%", textAlign: "center", padding: 15, color: "grey"}}>{title}</Text>
          <TouchableHighlight onPress={_onPress_1} style={{ width: "100%", borderBottomWidth: 1}}>
            <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>{variable_1}</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={_onPress_2}>
            <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>{variable_2}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;

const styles = StyleSheet.create({});
