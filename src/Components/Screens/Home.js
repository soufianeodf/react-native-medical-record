import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
          <FontAwesome name={"navicon"} color={"grey"} size={25} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{username}</Text>   
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name={"md-search"} color={"grey"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name={"filter-list"} color={"grey"} size={25} />
        </TouchableOpacity>
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
    "flex": 1,
    "flexDirection": "row",
    "justifyContent": "space-around",
  },
});