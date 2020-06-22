import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';

const testIDs = require('../testIDs');

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
    };
  }

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={this.loadItems.bind(this)}
        // Initially selected day
        // selected={'2020-06-22'}
        // Specify how each item should be rendered in agenda
        renderItem={this.renderItem.bind(this)}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        // Specify your item comparison function for increased performance
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    // remove old empty dates first
    Object.keys(this.state.items).forEach(key => {
      if (this.state.items[key].length === 0) {
        delete this.state.items[key];
      }
    });

    const time = day.timestamp;
    const strTime = this.timeToString(time);
    firestore()
      .collection('calendar')
      .get()
      .then(querySnapshot => {
        console.log('Total calendar items -----> : ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          if (!this.state.items[documentSnapshot.data().date]) {
            this.state.items[documentSnapshot.data().date] = [];
            this.state.items[documentSnapshot.data().date].push({
              name: documentSnapshot.data().name,
            });
          }
        });
      })
      .catch(error => Alert.alert(error));

    // create empty date for chosen date if does not exist, to return renderEmptyDate() view for the user.
    // && strTime !== '2020-06-22'
    if (!this.state.items[strTime]) {
      this.state.items[strTime] = [];
      this.state.items[strTime].push();
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item]}
        onPress={() => Alert.alert(item.name)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
