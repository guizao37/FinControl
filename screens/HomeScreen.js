import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../screens/Dashboard'
import Planning from '../screens/Planning'
import Settings from '../screens/Settings'
import StackFinance from './StackFinance'
import Patrimonio from './Patrimonio'
import styleTabNavigator from '../styles/styleTabNavigator'
import * as COLORS from '../styles/cores.json';

const HomeScreen = () => {

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()


  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: styleTabNavigator.tabNavigator
    }}
    >

        <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/home.png")} style={{width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : 'black'}} />),
        }}
        />

        <Tab.Screen
        name='Patrimonio'
        component={Patrimonio}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/patrimonio.png")} style={{width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : 'black'}} />),
        }}
        />

        <Tab.Screen
        name='StackFinance'
        component={StackFinance}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/finance.png")} style={{width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : 'black'}} />),
          headerShown: false
        }}
        />

        <Tab.Screen
        name='Planning'
        component={Planning}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/planning.png")} style={{width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : 'black'}} />)
        }}
        />

        <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/settings.png")} style={{width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : 'black'}}  />)
      }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen
