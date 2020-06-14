import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
      toggleCheckBox: false,
    };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <View style={styles.checkboxWithTitle}>
            <CheckBox
              disabled={false}
              value={this.state.toggleCheckBox}
              onValueChange={() =>
                this.state.toggleCheckBox
                  ? this.setState({toggleCheckBox: false})
                  : this.setState({toggleCheckBox: true})
              }
            />
            <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          </View>
          <Icon
            name={this.state.expanded ? 'ios-close' : 'ios-add'}
            size={35}
            color={Colors.DARKGRAY}
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={styles.child}>
            <Text>{this.props.data}</Text>
          </View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.DARKGRAY,
  },
  checkboxWithTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.CGRAY,
  },
  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: '100%',
  },
  child: {
    backgroundColor: Colors.LIGHTGRAY,
    padding: 16,
  },
});
