import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import config from '../config/config.json'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  
  const handleSignUp = () => {
    setMensagem("")
    if (password.length <8) {
      setMensagem("A senha deve ter 8 ou mais caracteres.")
    } else {
    axios.post("http://localhost:3001/create", {
      nomeUsuario: nome,
      senhaUsuario: password,
      emailUsuario: email.toLowerCase(),
    }).then(function (response) {
      if (response.status == 200){
        setMensagem("Esse e-mail já está cadastrado.")
      } else {
        setEmail("")
        setNome("")
        setPassword("")
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }
  }

  const navigation = useNavigation()

  const backToHome = () => {
      navigation.replace("Login")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
    >

      <View style={styles.inputContainer}>
      <Text>{mensagem}</Text> 
      <TextInput
          placeholder="Nome"
          placeholderTextColor='#878787'
          value={nome}
          onChangeText={text => setNome(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor='#878787'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor='#878787'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.resetPassword}
        onPress={backToHome}>
          <Text style={styles.textResetPassword}>
            VOLTAR
          </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen