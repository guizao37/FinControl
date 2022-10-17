import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styleLogin from '../styles/styleLogin'
import * as Animatable from "react-native-animatable"
import * as COLORS from '../styles/cores.json';

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigation = useNavigation()

  const limpaCampos = () => {
    setEmail("");
    setPassword("");
  }

  const checkEmail = () => {
    const verifica = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (verifica) {
      setMsg('')
      return true
    } else {
      setMsg("E-mail inválido.")
      return false
    }
  };

  const checkPassword = () => {
    if (password.length<8) {
      setMsg("A senha deve possuir 8 ou mais caracteres.")
      return false
    } else {
      return true
    }
  }

  const efetuaLogin = () => {
    checkEmail();
    checkPassword();
    if (checkEmail() && checkPassword()){
      fetch("http://localhost:3301/login",
      {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          senha: password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
    }).then((response) => {
      if (response.status == 200) {
        setMsg("");
        limpaCampos();
        navigation.navigate("Home");
      } else {
        setMsg("As credenciais estão incorretas.")
        limpaCampos();
      }
    })
    }
  }

  return (
    <View
      style={styleLogin.container}
    >
      <View style={{justifyContent:'center', alignItems: 'center', marginBottom: 24}}>
        <Text style={styleLogin.textoPrincipal}> FinApp </Text>
        <Text style={{color:"#e1e1e6", fontSize: 18, fontWeight: 'bold'}}>Faça seu login e comece agora!</Text>
      </View>
        <Text style={{marginBottom: 8, color: COLORS.GRAY_100}}>{msg}</Text>
        <View style={{width: '80%'}}>
        <Text style={styleLogin.textFormulario}>
          E-mail
        </Text>
        <TextInput
        maxLength={200}
        value={email}
        onChangeText={(value) => {setEmail(value)}}
        style={styleLogin.textoInput}
        placeholder="Insira seu e-mail."
        placeholderTextColor="#959595"
        />
        <Text style={styleLogin.textFormulario}>
          Senha
        </Text>
        <TextInput 
        value={password}
        maxLength={32}
        secureTextEntry = {true}
        onChangeText={(value)=>{setPassword(value)}}
        style={styleLogin.textoInput}
        placeholder="Insira sua senha."
        placeholderTextColor="#959595"
        />
        <TouchableOpacity
        style={styleLogin.botaoLogin}
        onPress={() => {navigation.navigate("Home")}}
        >
          <Text style={{fontWeight: 'bold'}}>Entrar</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={()=>{navigation.navigate("Esqueci a senha")}}
        style={styleLogin.resetPassword}
        >
          <Text style={{color: COLORS.GRAY_100, textDecorationLine: 'underline'}}>Esqueci a senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{navigation.navigate("Registrar")}}
        style={styleLogin.resetPassword}
        >
          <Text style={{color: COLORS.GRAY_100, textDecorationLine: 'underline'}}>Não tem conta? Registre-se agora.</Text>
        </TouchableOpacity>
      </View>
  )
}

export default LoginScreen
