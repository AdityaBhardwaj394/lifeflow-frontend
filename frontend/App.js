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
import TabNavigatorBB from './screen/BloodBank/TabNavigatorBB';
import BBRegisterSearch from './screen/Register/BBRegisterSearch';
import UserRegister from './screen/Register/UserRegister'
import BBRegister from './screen/Register/BBRegister'
import Chatuser from './screen/chat/Chatuser'
import EntityDetails from './screen/EntityDetails';
import { Provider } from 'react-redux'
import store from './store/store'
const Stack=createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat" component={Chatuser}/>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="DashBoard" component={DashBoard}/>
      <Stack.Screen name="BBRegister" component={BBRegister}/>
      <Stack.Screen name="UserRegister" component={UserRegister}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>
      <Stack.Screen name="TabNavigatorBB" component={TabNavigatorBB}/>
      <Stack.Screen name="TabNavigator" component={TabNavigator}/>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="BBRegisterSearch" component={BBRegisterSearch}/>
      <Stack.Screen name="EntityDetails" component={EntityDetails}/>
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;