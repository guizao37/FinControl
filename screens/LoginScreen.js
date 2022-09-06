import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import styles from './styles'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const handleLogin = () => {
    navigation.replace("Home")
  }

  const handleSignUp = () => {
    navigation.replace("Registrar")
  }

  const handleResetPassword = () => {
    navigation.replace("Esqueci a senha")
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled
    >
      <Image source={require('../assets/logo.png')} style={styles.mainImage}/>
      <View style={styles.inputContainer}>
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
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.resetPassword}
        onPress={handleResetPassword}>
          <Text style={styles.textResetPassword}>
            Esqueci a senha
          </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  resetPassword: {
    marginTop: 10,
  },
  textResetPassword: {
    fontWeight: 'bold',
    color: 'black',
  }
})*/
