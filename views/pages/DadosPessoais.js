import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native'
import styleLogin from '../styles/styleLogin'
import * as Animatable from "react-native-animatable"
import * as COLORS from '../styles/cores.json';
import axios from 'axios'

const Dados = () => {

  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [cNovaSenha, setCNovaSenha] = useState("");

  const [msg, setMsg] = useState("");

  const alteraSenha = () => {

  }

  return (
    <KeyboardAvoidingView
    behavior='padding'
      style={styleLogin.container}
    >
      <View style={{justifyContent:'center', alignItems: 'center'}}>
        <Text style={styleLogin.textoPrincipal}>Dados pessoais</Text>
      </View>
        <Text style={{marginBottom: 8, color: COLORS.GRAY_100}}>{msg}</Text>
        <View style={{width: '80%'}}>
        <Text style={styleLogin.textFormulario}>
          Nome
        </Text>
        <TextInput
        maxLength={200}
        value={"Guilherme"}
        onChangeText={(value) => {setSenhaAntiga(value)}}
        style={styleLogin.textoInput}
        placeholderTextColor="#959595"
        />
        <Text style={styleLogin.textFormulario}>
          E-mail
        </Text>
        <TextInput
        maxLength={200}
        value={"gui@gmail.com"}
        onChangeText={(value) => {setNovaSenha(value)}}
        style={styleLogin.textoInput}
        placeholderTextColor="#959595"
        />
        <TouchableOpacity
        style={styleLogin.botaoLogin}
        onPress={() => {}}
        >
          <Text style={{fontWeight: 'bold'}}>Salvar</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  )
}

export default Dados