import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screen/Home'
import DashBoard from './screen/DashBoard'
import Login from './screen/Login'
import Register from './screen/Register'
import Splash from './screen/Splash'
import Profile from './screen/Profile';
import Donor from './screen/Donor';
import RequestBlood from './screen/RequestBlood';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import TabNavigator from './screen/TabNavigator';

const Stack=createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="TabNavigator"
    screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="DashBoard" component={DashBoard}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Profile" component={Profile}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;