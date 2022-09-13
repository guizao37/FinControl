import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import styleRegister from '../styles/styleRegister'
import * as Animatable from 'react-native-animatable'

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  
  const registerButton = () => {
    setMensagem("")
    axios.get("http://127.0.0.1:3001/create", {
      nomeUsuario: nome,
      senhaUsuario: password,
      emailUsuario: email.toLowerCase(),
    }).then(function (response) {
      if (response.status == 200){
        setMensagem("Esse e-mail já está cadastrado.")
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  return (
    <Animatable.View
    animation="fadeInRight"
    style={styleRegister.container}
    behavior="height"
    enabled
  >
    <View
    style={styleRegister.containerTexto}>
      <Text style={styleRegister.textoPrincipal}> Crie sua conta </Text>
    </View>
    <View
    style={styleRegister.containerRegister}
    >
      <Text> {mensagem} </Text>
      <Text style={styleRegister.textFormulario}>
        Nome
      </Text>
      <TextInput
      style={styleRegister.textoInput}
      placeholder="Insira seu nome."
      placeholderTextColor="#959595"
      />
      <Text style={styleRegister.textFormulario}>
        E-mail
      </Text>
      <TextInput
      style={styleRegister.textoInput}
      placeholder="Insira seu e-mail."
      placeholderTextColor="#959595"
      />
      <Text style={styleRegister.textFormulario}>
        Senha
      </Text>
      <TextInput 
      style={styleRegister.textoInput}
      placeholder="Insira sua senha."
      placeholderTextColor="#959595"
      secureTextEntry={true}
      />
      <Text style={styleRegister.textFormulario}>
        Confirme a senha
      </Text>
      <TextInput 
      style={styleRegister.textoInput}
      placeholder="Insira sua senha novamente."
      placeholderTextColor="#959595"
      secureTextEntry={true}
      />

      <TouchableOpacity
      style={styleRegister.botaoRegister}
      onPress={registerButton}
      >
        <Text>Registrar</Text>
      </TouchableOpacity>

    </View>
  </Animatable.View>
  )
}

export default RegisterScreen