import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import CheckEmail from '../Components/Auth/CheckEmail';
import Home from '../Components/Screens/Home';
import Loading from '../Components/Auth/Loading';
import EventsCalendar from '../Components/Screens/EventsCalendar';
import Measurment from '../Components/Screens/Measurment';
import MedicationCourses from '../Components/Screens/MedicationCourses';
import ReferenceData from '../Components/Screens/ReferenceData';
import JoinAnotherAccount from '../Components/Screens/JoinAnotherAccount';
import ChatWithMembers from '../Components/Screens/ChatWithMembers';
import Profile from '../Components/Screens/Profile/Profile';
import MedicalPrecedents from '../Components/Screens/Profile/MedicalPrecedents';
import FamilialPrecedents from '../Components/Screens/Profile/FamilialPrecedents';

import {Logout, _handleLogout} from '../Components/Auth/Logout';
import HeaderDrawer from './HeaderDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Navigation = () => {

  const Tab = createBottomTabNavigator();
  const ProfileTabs = () => (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
      }}>
      <Tab.Screen
        name="General"
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name="md-information-circle-outline" size={22} />  
        }}
      />
      <Tab.Screen
        name="Medical precedents"
        component={MedicalPrecedents}
        options={{
          tabBarIcon: () => <FontAwesome5 name="user-alt" size={22} /> 
        }}
      />
      <Tab.Screen
        name="Familial precedents"
        component={FamilialPrecedents}
        options={{
          tabBarIcon: () => <FontAwesome5 name="user-friends" size={22} /> 
        }}
      />
    </Tab.Navigator>
  );

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <HeaderDrawer/>
      <DrawerItemList {...props} />
      <DrawerItem label={() => <Logout/> } onPress={() => _handleLogout(props.navigation.navigate("Login"))} />
    </DrawerContentScrollView>
  );

  const Drawer = createDrawerNavigator();
  const DrawerScreen = () => (
      <Drawer.Navigator
        initialRouteName="Home" 
        drawerContent={(props) => <CustomDrawerContent {...props} />} 
        drawerStyle={{marginTop: -30}} 
        drawerContentOptions={{activeBackgroundColor: "transparent"}}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            drawerLabel: " Home", 
            title: " Home", 
            drawerIcon: () => <Ionicons name="md-home" size={22} />  
          }} 
        />
        <Drawer.Screen 
          name="EventsCalendar" 
          component={EventsCalendar} 
          options={{ 
            drawerLabel: " Events calendar", 
            title: " Events calendar", 
            drawerIcon: () => <Ionicons name="md-calendar" size={22} /> 
          }} 
        />
        <Drawer.Screen 
          name="Measurment" 
          component={Measurment} 
          options={{ 
            drawerLabel: "Measurment", 
            title: "Measurment", 
            drawerIcon: () => <FontAwesome name="heartbeat" size={22} /> 
          }} 
        />
        <Drawer.Screen 
          name="Medication courses" 
          component={MedicationCourses} 
          options={{ 
            drawerLabel: "Medication courses", 
            title: "MedicationCourses", 
            drawerIcon: () => <Fontisto name="pills" size={22} /> 
          }} 
        />
        <Drawer.Screen 
          name="Profile" 
          component={ProfileTabs} 
          options={{ 
            drawerLabel: "Profile", 
            title: "Profile", 
            drawerIcon: () => <SimpleLineIcons name="user" size={22} /> 
          }} 
        />
        <Drawer.Screen 
          name="ReferenceData" 
          component={ReferenceData} 
          options={{ 
            drawerLabel: "Reference data", 
            title: "Reference data", 
            drawerIcon: () => <MaterialCommunityIcons name="library-books" size={22} /> 
          }} 
        />
        <Drawer.Screen 
          name="JoinAnotherAccount" 
          component={JoinAnotherAccount} 
          options={{ 
            drawerLabel: "Join another account", 
            title: "Join another account", 
            drawerIcon: () => <MaterialCommunityIcons name="account-group-outline" size={22} /> 
          }} 
        />
        <Drawer.Screen 
          name="ChatWithMembers" 
          component={ChatWithMembers} 
          options={{ 
            drawerLabel: "Chat with members", 
            title: "Chat with members", 
            drawerIcon: () => <MaterialCommunityIcons name="chat" size={22} /> 
          }} 
        />
      </Drawer.Navigator>
  );

  const Stack = createStackNavigator();
  const App = () => (
  <Stack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="CheckEmail" component={CheckEmail} />
    <Stack.Screen name="Loading" component={Loading} />
    <Stack.Screen name="Home" component={DrawerScreen} />
  </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}

export default Navigation;
