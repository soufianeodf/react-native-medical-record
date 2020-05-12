import React from 'react';
import { StyleSheet, Text, View ,Modal, TouchableHighlight, TouchableOpacity} from 'react-native';

const CustomModal = ({isItVisible, _onRequestClose, title, _onPress_1, variable_1, _onPress_2, variable_2, _onPress_3, variable_3}) => {
  return (
    <Modal visible={isItVisible} transparent={true} animationType="fade" onRequestClose={_onRequestClose}>
      <TouchableOpacity 
        style={{flex: 1, backgroundColor: "#000000aa", justifyContent: "center"}}
        activeOpacity={1} 
        onPressOut={_onRequestClose}
      >
        <View>
          <View style={{backgroundColor: "#fff", margin: 50}}>
            <Text style={{borderBottomWidth: 1, width: "100%", textAlign: "center", padding: 15, color: "grey"}}>{title}</Text>
            <TouchableHighlight onPress={_onPress_1} style={{ width: "100%", borderBottomWidth: 1}}>
              <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>{variable_1}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={_onPress_2}>
              <Text style={{borderBottomWidth: 1, textAlign: "center", padding: 15, fontWeight: "bold"}}>{variable_2}</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={_onPress_3}>
              <Text style={{textAlign: "center", padding: 15, fontWeight: "bold"}}>{variable_3}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableOpacity>  
    </Modal>
  );
}

export default CustomModal;

const styles = StyleSheet.create({});
