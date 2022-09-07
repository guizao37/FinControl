import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styleLogin from '../styles/styleLogin'
import * as Animatable from "react-native-animatable"

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.navigate("Home")
  }

  return (
    <Animatable.View
      animation="fadeInRight"
      style={styleLogin.container}
      behavior="height"
      enabled
    >
      <View
      style={styleLogin.containerTexto}>
        <Text style={styleLogin.textoPrincipal}> Login </Text>
      </View>
      <View
      style={styleLogin.containerLogin}
      >
        <Text style={styleLogin.textFormulario}>
          E-mail
        </Text>
        <TextInput
        style={styleLogin.textoInput}
        placeholder="Insira seu e-mail."
        placeholderTextColor="#959595"
        />
        <Text style={styleLogin.textFormulario}>
          Senha
        </Text>
        <TextInput 
        style={styleLogin.textoInput}
        placeholder="Insira sua senha."
        placeholderTextColor="#959595"
        />
        <TouchableOpacity
        style={styleLogin.botaoLogin}
        onPress={handleLogin}
        >
          <Text>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{navigation.navigate("Esqueci a senha")}}
        style={styleLogin.resetPassword}
        >
          <Text>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}

export default LoginScreen
