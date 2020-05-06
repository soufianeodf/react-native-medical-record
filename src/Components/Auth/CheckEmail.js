import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../utils/forms/CustomButton';


const CheckEmail = () => {
    return (
      <View style={styles.viewContainer}>

        <View style={styles.firstBlockContainer}>
          <Ionicons
            name="ios-send"
            size={50}
          />
          <Text style={styles.forgotText}>We've send you an email</Text>
          <Text style={styles.descriptionText}>Check your email and follow instructions included in the message</Text>
        </View>

        <View style={styles.secondBlockContainer}>
          <CustomButton title={"BACK TO LOGIN PAGE"} color={"#2db7ff"} />
        </View>

      </View>
    )
}

export default CheckEmail;

const styles = StyleSheet.create({
    viewContainer: {
      "flex": 1,
      "alignItems": 'center',
    },
    firstBlockContainer: {
      "flex": 1,
      "alignItems": 'center',
      "justifyContent": 'center',
      "marginTop": 100
    },
    forgotText: {
      "fontWeight": 'bold',
      "fontSize": 16,
      "marginVertical": 10
    },
    descriptionText: {
      "color": '#888',
      "textAlign": 'center',
      "lineHeight": 18,
    },
    secondBlockContainer: {
      "flex": 1,
      "alignItems": 'center',
      "justifyContent": 'flex-start',
    },
  });