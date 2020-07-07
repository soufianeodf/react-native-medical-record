import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View} from 'react-native';

import Login from '../Components/Auth/Login';
import Signup from '../Components/Auth/Signup';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import CheckEmail from '../Components/Auth/CheckEmail';
import Home from '../Components/Screens/Home';
import Loading from '../Components/Auth/Loading';
import EventsCalendar from '../Components/Screens/EventsCalendar';
import Measurment from '../Components/Screens/Measurment';
import DoctorAppointment from '../Components/Screens/Measurment/DoctorAppointment';
import AppointmentNotification from '../Components/Screens/Measurment/AppointmentNotification';
import MedicationCourses from '../Components/Screens/MedicationCourses';
import MedicationCourse from '../Components/Screens/MedicationCourse';

import ReferenceData from '../Components/Screens/ReferenceData';
import MedicationDatabase from '../Components/Screens/ReferenceData/MedicationDatabase/MedicationDatabase';
import NearbyHospitals from '../Components/Screens/ReferenceData/NearbyHospitals';
import AddNewMedicine from '../Components/Screens/ReferenceData/MedicationDatabase/AddNewMedicine';

import BoughtFromPharmacy from '../Components/Screens/BoughtFromPharmacy';
import JoinAnotherAccount from '../Components/Screens/JoinAnotherAccount';
import ChatWithMembers from '../Components/Screens/ChatWithMembers';
import Chat from '../Components/Screens/ChatWithMembers/Chat';
import Profile from '../Components/Screens/Profile';
import MedicalAct from '../Components/Screens/MedicalAct';
import MedicalPrescription from '../Components/Screens/MedicalAct/MedicalPrescription';
import SurgeryAct from '../Components/Screens/MedicalAct/Surgery';
import Analysis from '../Components/Screens/MedicalAct/Analysis';
import MedicalPrecedents from '../Components/Screens/Profile/MedicalPrecedents';
import HeartCondition from '../Components/Screens/Profile/MedicalPrecedents/HeartCondition';
import Diabetes from '../Components/Screens/Profile/MedicalPrecedents/Diabetes';
import Allergy from '../Components/Screens/Profile/MedicalPrecedents/Allergy';
import Vaccination from '../Components/Screens/Profile/MedicalPrecedents/Vaccination';
import Surgery from '../Components/Screens/Profile/MedicalPrecedents/Surgery';
import AlcoholSmoking from '../Components/Screens/Profile/MedicalPrecedents/AlcoholSmoking';
import FamilialPrecedents from '../Components/Screens/Profile/FamilialPrecedents';
import EventsList from '../Components/Screens/EventsList';

import MeasurmentList from '../Components/Screens/MeasurmentList';
import BloodPressure from '../Components/Screens/Measurment/BloodPressure';
import Height from '../Components/Screens/Measurment/Height';
import Pulse from '../Components/Screens/Measurment/Pulse';
import SugarLevel from '../Components/Screens/Measurment/SugarLevel';
import Weight from '../Components/Screens/Measurment/Weight';

import {Logout, _handleLogout} from '../Components/Auth/Logout';
import HeaderDrawer from './HeaderDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type StackParamList = {
  Login: undefined;
  Home: undefined;
};

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
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="md-information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Medical precedents"
        component={MedicalPrecedents}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Familial precedents"
        component={FamilialPrecedents}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="user-friends" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const CustomDrawerContent = props => (
    <DrawerContentScrollView {...props}>
      <HeaderDrawer />
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => <Logout />}
        onPress={() => _handleLogout(props.navigation.navigate('Login'))}
      />
    </DrawerContentScrollView>
  );

  function MedicationCoursesStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Medication courses',
            headerTitleStyle: {alignSelf: 'center'},
          }}
          name="MedicationCourses"
          component={MedicationCourses}
        />
      </Stack.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();
  const DrawerScreen = () => (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{marginTop: -30}}
      drawerContentOptions={{activeBackgroundColor: 'transparent'}}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: ' Home',
          title: ' Home',
          drawerIcon: () => <Ionicons name="md-home" size={22} />,
        }}
      />
      <Drawer.Screen
        name="EventsCalendar"
        component={EventsCalendar}
        options={{
          drawerLabel: ' Events calendar',
          title: ' Events calendar',
          drawerIcon: () => <Ionicons name="md-calendar" size={22} />,
        }}
      />
      <Drawer.Screen
        name="Measurment"
        component={Measurment}
        options={{
          drawerLabel: 'Measurment',
          title: 'Measurment',
          drawerIcon: () => <FontAwesome name="heartbeat" size={22} />,
        }}
      />
      <Drawer.Screen
        name="Medication courses"
        component={MedicationCoursesStack}
        options={{
          drawerLabel: 'Medication courses',
          title: 'MedicationCourses',
          drawerIcon: () => <Fontisto name="pills" size={22} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileTabs}
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
          drawerIcon: () => <SimpleLineIcons name="user" size={22} />,
        }}
      />
      <Drawer.Screen
        name="Medical act"
        component={MedicalAct}
        options={{
          drawerLabel: 'Medical act',
          title: 'Medical act',
          drawerIcon: () => (
            <View style={{marginLeft: 3.5}}>
              <FontAwesome5 name="file-medical" size={23} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ReferenceData"
        component={ReferenceData}
        options={{
          drawerLabel: 'Reference data',
          title: 'Reference data',
          drawerIcon: () => (
            <MaterialCommunityIcons name="library-books" size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="BoughtFromPharmacy"
        component={BoughtFromPharmacy}
        options={{
          drawerLabel: 'Purchase from pharmacy',
          title: 'Purchase from pharmacy',
          drawerIcon: () => (
            <MaterialCommunityIcons name="pharmacy" size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="JoinAnotherAccount"
        component={JoinAnotherAccount}
        options={{
          drawerLabel: 'Join another account',
          title: 'Join another account',
          drawerIcon: () => (
            <MaterialCommunityIcons name="account-group-outline" size={22} />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatWithMembers"
        component={ChatWithMembers}
        options={{
          drawerLabel: 'Chat with members',
          title: 'Chat with members',
          drawerIcon: () => <MaterialCommunityIcons name="chat" size={22} />,
        }}
      />
    </Drawer.Navigator>
  );

  const Stack = createStackNavigator<StackParamList>();
  const App = () => (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CheckEmail" component={CheckEmail} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Home" component={DrawerScreen} />
      {/* Medical Precedents pages */}
      <Stack.Screen name="HeartCondition" component={HeartCondition} />
      <Stack.Screen name="Diabetes" component={Diabetes} />
      <Stack.Screen name="Allergy" component={Allergy} />
      <Stack.Screen name="Vaccination" component={Vaccination} />
      <Stack.Screen name="Surgery" component={Surgery} />
      <Stack.Screen name="AlcoholSmoking" component={AlcoholSmoking} />
      <Stack.Screen name="DoctorAppointment" component={DoctorAppointment} />
      <Stack.Screen
        options={{headerShown: true}}
        name="MedicationCourse"
        component={MedicationCourse}
      />
      <Stack.Screen
        name="AppointmentNotification"
        component={AppointmentNotification}
      />
      <Stack.Screen name="BoughtFromPharmacy" component={BoughtFromPharmacy} />
      {/* Reference data pages */}
      <Stack.Screen name="NearbyHospitals" component={NearbyHospitals} />
      <Stack.Screen name="MedicationDatabase" component={MedicationDatabase} />
      <Stack.Screen name="AddNewMedicine" component={AddNewMedicine} />

      <Stack.Screen name="EventsList" component={EventsList} />
      {/* Measurment list pages */}
      <Stack.Screen name="MeasurmentList" component={MeasurmentList} />
      <Stack.Screen name="BloodPressure" component={BloodPressure} />
      <Stack.Screen name="Height" component={Height} />
      <Stack.Screen name="Pulse" component={Pulse} />
      <Stack.Screen name="SugarLevel" component={SugarLevel} />
      <Stack.Screen name="Weight" component={Weight} />
      {/* Medical act pages */}
      <Stack.Screen
        name="MedicalPrescription"
        component={MedicalPrescription}
      />
      <Stack.Screen name="SurgeryAct" component={SurgeryAct} />
      <Stack.Screen name="Analysis" component={Analysis} />

      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

export default Navigation;
