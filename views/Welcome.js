import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styleWelcome from '../styles/styleWelcome.js';
import { useNavigation } from '@react-navigation/native';

import * as Animatable from "react-native-animatable"

export default function Welcome() {

  const navigation = useNavigation()

  const Login = () => {
    navigation.navigate("Login")
  }

  const Registrar = () => {
    navigation.navigate("Registrar")
  }
  return (
    <View style={styleWelcome.container}>
      <View style={styleWelcome.containerTexto}>
        <Text 
        style={styleWelcome.textoPrincipal}>
          Seja bem-vindo ao FinApp!
        </Text>
        <Text
        style={{fontSize: 20}}
        >
          Seu App de finanças pessoais.
        </Text>
        <Animatable.Image
          animation="flipInY"
          source={require('../assets/logo.png')} 
          style={{width: "100%", height:"60%", marginTop: 50}}
          reziseMode="contain"/>
      </View>
      <Animatable.View 
      animation="fadeInUp"
      delay={500}
      style={styleWelcome.containerBotoes}>
        <TouchableOpacity 
        style={styleWelcome.botoes}
        onPress={Login}
        >
          <Text style={styleWelcome.textoBotoes}>Fazer login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styleWelcome.botoes} onPress={Registrar}>
          <Text style={styleWelcome.textoBotoes}>Crie sua conta</Text>
        </TouchableOpacity>
      </Animatable.View>
   </View>
  );
}
