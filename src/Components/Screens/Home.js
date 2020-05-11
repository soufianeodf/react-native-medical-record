import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../environment/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Main = ({navigation}) => {

  const [username, setUsername] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      let isMounted = true;
      firebase.auth().onAuthStateChanged((user) => {
        if(user && isMounted){
          firebase.firestore().collection("users").doc(user.uid).get()
          .then(doc => { setUsername(doc.data().username ? doc.data().username : "Primary"); })
          .catch((error) => { console.log(error.message); });
        }else {
          navigation.navigate("Login");
        }
      });
    });
    return () => { isMounted = false };
  }, []);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.drawerButtonView}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.toggleDrawer()} >
          <FontAwesome name={"navicon"} color={"grey"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Text>{username}</Text>   
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <Ionicons name={"md-search"} color={"grey"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity}>
          <MaterialIcons name={"filter-list"} color={"grey"} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text>List of events</Text>
      </View>
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  viewContainer: {
    "flex": 1,
    "marginTop": 20,
  },
  drawerButtonView: {
    marginTop: 20,
    "flexDirection": "row",
    "justifyContent": "space-around",
  },
  touchableOpacity: {
    "width": 50, 
    "height": 50,
  },
  textContainer: {
    "flex": 1,
    "alignItems": "center",
    "justifyContent": "center",
  },
});