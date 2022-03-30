import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/Home';
import DevicesScreen from './screens/Devices';
import ScheduleScreen from './screens/Schedule';
import NotificationScreen from './screens/Notification';
import AccountScreen from './screens/Account';

//Screen names
const homeName = "Home";
const devicesName = "Devices";
const scheduleName = "Schedule";
const notificationName = "Notification";
const accountName = "Account";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } 
            else if (rn === devicesName) {
              iconName = focused ? 'bulb' : 'bulb-outline';
            } 
            else if (rn === scheduleName) {
              iconName = focused ? 'time' : 'time-outline';
            } 
            else if (rn === notificationName) {
              iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            }
            else if (rn === accountName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#75A7F6',
          inactiveTintColor: 'grey',
          labelStyle: {fontSize: 10 },
          tabStyle: {padding: 10, height: 50}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={devicesName} component={DevicesScreen} />
        <Tab.Screen name={scheduleName} component={ScheduleScreen} />
        <Tab.Screen name={notificationName} component={NotificationScreen} />
        <Tab.Screen name={accountName} component={AccountScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;