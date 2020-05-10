import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import CheckEmail from '../Components/Auth/CheckEmail';
import Main from '../Components/Auth/Main';
import Loading from '../Components/Auth/Loading';

import HeaderDrawer from './HeaderDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Navigation = () => {

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <HeaderDrawer/>
      <DrawerItemList {...props} />
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
    </DrawerContentScrollView>
  );

  const Drawer = createDrawerNavigator();
  const DrawerScreen = () => (
      <Drawer.Navigator
        initialRouteName="Main" 
        drawerContent={(props) => <CustomDrawerContent {...props} />} 
        drawerStyle={{marginTop: -30}} 
        drawerContentOptions={{activeBackgroundColor: "transparent"}}
      >
        <Drawer.Screen 
          name="Main" 
          component={Main} 
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
    <Stack.Screen name="Main" component={DrawerScreen} />
  </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  );
}

export default Navigation;
