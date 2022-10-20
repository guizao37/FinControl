import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '../views/Dashboard'
import Planning from '../views/Planning'
import StackSettings from '../views/StackSettings'
import StackFinance from './StackFinance'
import Patrimonio from './Patrimonio'
import styleTabNavigator from '../styles/styleTabNavigator'
import * as COLORS from '../styles/cores.json';

const HomeScreen = ({route}) => {

  const Tab = createBottomTabNavigator();
  const navigation = useNavigation()
  const email = route.params.email

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
          tabBarIcon: ({focused}) => (<Image source={require("../assets/home.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        initialParams= {email}
        />

        <Tab.Screen
        name='Patrimônio'
        component={Patrimonio}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/patrimonio.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        initialParams= {email}
        />

        <Tab.Screen
        name='StackFinance'
        component={StackFinance}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/finance.png")} style={{top: 13, bottom: 5, width: 40, height: 40, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        initialParams= {email}
        />

        <Tab.Screen
        name='Planejamento'
        component={Planning}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/planning.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}} />),
          headerShown: false
        }}
        initialParams= {email}
        />

        <Tab.Screen
        name='AjustesStack'
        component={StackSettings}
        options={{
          tabBarIcon: ({focused}) => (<Image source={require("../assets/settings.png")} style={{top: 13, width: 35, height: 35, tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.GRAY_100}}/>),
          headerShown: false
      }}
      initialParams= {email}
      />

    </Tab.Navigator>
  )
}

export default HomeScreen
