import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import CheckEmail from '../Components/Auth/CheckEmail';
import Main from '../Components/Auth/Main';
import Loading from '../Components/Auth/Loading';

const Navigation = () => {

  const Drawer = createDrawerNavigator();
  const DrawerScreen = () => (
      <Drawer.Navigator>
        <Drawer.Screen name="Main" component={Main} />
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
