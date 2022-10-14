import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../views/Dashboard'
import Planning from '../views/Planning'
import Settings from '../views/Settings'
import StackFinance from './StackFinance'
import Patrimonio from './Patrimonio'
import styleTabNavigator from '../styles/styleTabNavigator'
import * as COLORS from '../styles/cores.json';
import { color } from 'react-native-elements/dist/helpers'

const HomeScreen = () => {

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()


  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      tabBarStyle: styleTabNavigator.tabNavigator,
      tabBarShowLabel: false
    }}
    >

        <Tab.Screen
        name='Início'
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/home.png")} style={{top: 10, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
        }}
        />

        <Tab.Screen
        name='Patrimônio'
        component={Patrimonio}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/patrimonio.png")} style={{top: 10, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
        }}
        />

        <Tab.Screen
        name='StackFinance'
        component={StackFinance}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/finance.png")} style={{top: 10, bottom: 5, width: 40, height: 40, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false,
          tabBarLabel: ''
        }}
        />

        <Tab.Screen
        name='Planejamento'
        component={Planning}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/planning.png")} style={{top: 10, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />)
        }}
        />

        <Tab.Screen
        name='Ajustes'
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/settings.png")} style={{top: 10, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}}  />)
      }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen
