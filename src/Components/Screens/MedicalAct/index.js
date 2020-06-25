import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function MedicalAct({navigation}) {
  return (
    <View style={styles.viewContainer}>
      <View style={styles.firstInnerView}>
        <Image
          style={styles.imageStyle}
          source={require('../../../../images/medicalact.png')}
        />
      </View>
      <View style={styles.secondInnerView}>
        <Text style={styles.titleText}>Medical Act</Text>
        <View style={styles.contentView}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.itemsStyle}>Medical prescription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.itemsStyle}>
              Analysis / Radiology Assessment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.itemsStyle}>Surgery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemsStyle: {
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 15,
    margin: 8,
    marginTop: 0,
    borderRadius: 3,
    elevation: 1,
    paddingLeft: 5,
    backgroundColor: '#fbfbfb',
  },
  viewContainer: {
    flex: 1,
    position: 'relative',
  },
  firstInnerView: {
    flex: 1,
    backgroundColor: '#77d18d',
  },
  imageStyle: {
    width: '100%',
    height: '40%',
  },
  secondInnerView: {
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    top: '34.4%',
    width: '100%',
    height: '100%',
  },
  titleText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontFamily: 'serif',
  },
  contentView: {
    height: '60%',
  },
  buttonStyle: {
    marginBottom: 15,
  },
});
