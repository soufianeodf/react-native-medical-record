import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const JoinAnotherAccount = () => {
  return (
    <View style={styles.viewContainer}>
      <Image
        source={require('../../../images/underConstruction.png')}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default JoinAnotherAccount;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
  },
  imageStyle: {
    width: '100%',
    height: '30%',
  },
});
