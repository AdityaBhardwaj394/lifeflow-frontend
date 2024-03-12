import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screen/Home'
import Login from './screen/Login'
import Register from './screen/Register'
import { NavigationContainer } from '@react-navigation/native';

const Stack=createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="DashBoard">

      <Stack.Screen name="DashBoard" component={Home}/>
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="register" component={Register}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;