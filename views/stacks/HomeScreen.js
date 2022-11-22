import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from "../pages/Dashboard"
import StackPatrimonio from "../stacks/StackPatrimonio"
import StackFinance from "../stacks/StackFinance"
import StackSettings from "../stacks/StackSettings"
import Planning from "../pages/Planning"

import styleTabNavigator from '../styles/styleTabNavigator'
import * as COLORS from '../styles/cores.json';

const HomeScreen = ({route}) => {

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()

  return (
    <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      tabBarStyle: styleTabNavigator.tabNavigator,
      tabBarShowLabel: false,
    }}
    >

        <Tab.Screen
        name='Início'
        component={Dashboard}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../../assets/home.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        />

        <Tab.Screen
        name='StackPatrimonio'
        component={StackPatrimonio}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../../assets/patrimonio.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        />

        <Tab.Screen
        name='StackFinance'
        component={StackFinance}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../../assets/finance.png")} style={{top: 13, bottom: 5, width: 40, height: 40, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        />

        <Tab.Screen
        name='Planejamento'
        component={Planning}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../../assets/planning.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        />

        <Tab.Screen
        name='AjustesStack'
        component={StackSettings}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../../assets/settings.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}}/>),
          headerShown: false
      }}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen
