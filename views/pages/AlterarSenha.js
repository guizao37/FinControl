import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native'
import styleLogin from '../styles/styleLogin'
import * as Animatable from "react-native-animatable"
import * as COLORS from '../styles/cores.json';
import axios from 'axios'

const Alterar = () => {

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
        <Text style={styleLogin.textoPrincipal}> Alterar senha</Text>
      </View>
        <Text style={{marginBottom: 8, color: COLORS.GRAY_100}}>{msg}</Text>
        <View style={{width: '80%'}}>
        <Text style={styleLogin.textFormulario}>
          Senha antiga
        </Text>
        <TextInput
        maxLength={200}
        value={senhaAntiga}
        onChangeText={(value) => {setSenhaAntiga(value)}}
        style={styleLogin.textoInput}
        placeholder="Insira sua senha antiga"
        placeholderTextColor="#959595"
        />
        <Text style={styleLogin.textFormulario}>
          Nova senha
        </Text>
        <TextInput
        maxLength={200}
        value={novaSenha}
        onChangeText={(value) => {setNovaSenha(value)}}
        style={styleLogin.textoInput}
        placeholder="Insira sua nova senha"
        placeholderTextColor="#959595"
        />
        <Text style={styleLogin.textFormulario}>
          Confirme a nova senha
        </Text>
        <TextInput 
        value={cNovaSenha}
        maxLength={32}
        secureTextEntry = {true}
        onChangeText={(value)=>{setCNovaSenha(value)}}
        style={styleLogin.textoInput}
        placeholder="Insira sua nova senha"
        placeholderTextColor="#959595"
        />
        <TouchableOpacity
        style={styleLogin.botaoLogin}
        onPress={() => {efetuaLogin()}}
        >
          <Text style={{fontWeight: 'bold'}}>Entrar</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  )
}

export default Alterar