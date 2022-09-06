import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/Dashboard'
import Planning from '../screens/Planning'
import Settings from '../screens/Settings'
import StackFinance from './StackFinance'

const HomeScreen = () => {

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()


  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      tabBarShowLabel: false
    }}>

        <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: () => (<Image source={require("../assets/aumentar.png")} style={{width: 35, height: 35}} />),
        }}
        />

        <Tab.Screen
        name='StackFinance'
        component={StackFinance}
        options={{
          tabBarIcon: () => (<Image source={require("../assets/finances.png")} style={{width: 35, height: 35}} />),
          headerShown: false
        }}
        />


        <Tab.Screen
        name='Planning'
        component={Planning}
        options={{
          tabBarIcon: () => (<Image source={require("../assets/planning.png")} style={{width: 35, height: 35}} />)
        }}
        />

        <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: () => (<Image source={require("../assets/setting.png")} style={{width: 35, height: 35}}  />)
      }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen
