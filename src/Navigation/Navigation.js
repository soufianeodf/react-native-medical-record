import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import CheckEmail from '../Components/Auth/CheckEmail';
import Home from '../Components/Screens/Home';
import Loading from '../Components/Auth/Loading';

import {Logout, _handleLogout} from '../Components/Auth/Logout';
import HeaderDrawer from './HeaderDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Navigation = () => {

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
            drawerLabel: "Home", 
            title: "Home",  
            drawerIcon: () => <Ionicons name="md-home" size={22} /> 
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
