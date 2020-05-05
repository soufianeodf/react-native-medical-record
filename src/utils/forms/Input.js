import React , {useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Input = props => {

    const [text, setText] = useState('');

    return (
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setText(text)}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                onSubmitEditing={() => alert('done')}
            />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    textInputContainer: {
        "width": '80%',
    },
    textInput: {
        "height": 40,
        "borderTopLeftRadius": 4,
        "borderTopRightRadius": 4,
        "borderBottomRightRadius": 4,
        "borderBottomLeftRadius": 4,
        "borderWidth": 1,
        "borderColor": '#aa9e9e',
        "borderStyle": 'solid',
        "paddingLeft": 40,
        "marginBottom": 10,
        "paddingRight": 35
      }
  });
