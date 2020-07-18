import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FamilialPrecedents = ({navigation}) => {
  const [isPortrait, setIsPortrait] = useState(false);

  const checkPortrait = (height, width) => {
    setIsPortrait(height >= width);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', marginTop: isPortrait ? '20%' : 0}} onLayout={(event)=> checkPortrait(event.nativeEvent.layout.height, event.nativeEvent.layout.width)}>
        <Image
          style={styles.imageStyle}
          source={require('../../../../images/addfamily.png')}
        />
        <Text style={{fontSize: 17, color: 'gray'}}>Update the patient's family medical history.</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddFamilialPrecedents')}>
          <Ionicons name={'ios-add-circle'} color={'#3394ef'} size={66} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FamilialPrecedents;

const styles = StyleSheet.create({
  buttonView: {
    position: 'absolute',
    bottom: '1.5%',
    right: '4%',
  },
  imageStyle: {
    width: 300,
    height: 250,
  },
});
