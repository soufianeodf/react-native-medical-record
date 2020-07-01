import React, {useState, useEffect} from 'react';
import {Animated, TextInput, StyleSheet, View} from 'react-native';

export default function FloatingLabelInput({label, value, onChangeText, theValue}) {
  const animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: 'absolute',
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [10, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#888', '#0d7ee8'],
    }),
    left: 10,
    zIndex: 1,
    backgroundColor: '#dee1f2',
    paddingHorizontal: 5,
  };

  const textInput = {
    height: 50,
    width: '100%',
    borderRadius: 4,
    borderWidth: isFocused ? 2 : 1,
    borderColor: isFocused ? '#0d7ee8' : '#888',
    borderStyle: 'solid',
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 20,
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View style={styles.labelView}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        style={textInput}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        selectionColor={'#0d7ee8'}
        value={theValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelView: {
    marginVertical: 2,
  },
});
