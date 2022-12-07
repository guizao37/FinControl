import { useNavigation } from '@react-navigation/core'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import styleRegister from '../styles/styleRegister'

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nome, setNome] = useState('')
  const [msg, setMsg] = useState('')
  
  const checkPassword = () => {
    if (password.length<8) {
      setMsg("A senha deve possuir 8 ou mais caracteres.")
      return false
    } 
    if (password != confirmPassword) {
      setMsg("As senhas não são iguais.")
      return false
    } 
    if (password.length >= 8 && password==confirmPassword) {
      return true
    }
  }

  const checkCampos = () => {
    if (email=='') {
      setMsg("Todos os campos devem estar preenchidos")
      return false
    }
    if (password=='') {
      setMsg("Todos os campos devem estar preenchidos")
      return false
    }
    if (confirmPassword=='') {
      setMsg("Todos os campos devem estar preenchidos")
      return false
    }
    
    if (nome=='') {
      setMsg("Todos os campos devem estar preenchidos")
      return false
    }
    
    if (email!= '' && password!= '' && nome!= '' && confirmPassword!= '' ){
      setMsg("")
      return true
    }
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

  const limpaCampos = () => {
    setNome('');
    setEmail('');
    setConfirmPassword('');
    setPassword('');
  }

  const createUser = () => {
    checkCampos();
    checkPassword();
    checkEmail();
    if (checkCampos() && checkPassword() && checkEmail()){
      fetch('http://192.168.0.9:3301/register',
    {
      method: 'POST',
      body: JSON.stringify({
        email: email.toLowerCase(),
        senha: password,
        nome: nome
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response) => {
      if (response.status == 200) {
        setMsg("Usuário cadastrado com sucesso.")
        limpaCampos();
      } else {
        setMsg("Usuário já cadastrado.");
      }
    }).catch((error)=>{
      console.log("Erro");
      alert(error.message);
   });
    }
  }

  return (
    <KeyboardAvoidingView
    behavior='padding'
    style={styleRegister.container}>
    <View
    style={styleRegister.containerTexto}>
      <Text style={styleRegister.textoPrincipal}> Crie sua conta </Text>
    </View>
    <View
    style={styleRegister.containerRegister}
    >
      <View style={{alignItems: 'center', margin: 8}}>
      <Text style={{color: 'white', fontSize: 16}}> {msg} </Text>
      </View>
      <Text style={styleRegister.textFormulario}>
        Nome
      </Text>
      <TextInput
      maxLength={200}
      value = {nome}
      onChangeText={(value) => setNome(value)}
      style={styleRegister.textoInput}
      placeholder="Insira seu nome."
      placeholderTextColor="#959595"
      />
      <Text style={styleRegister.textFormulario}>
        E-mail
      </Text>
      <TextInput
      maxLength={200}
      value= {email}
      onChangeText={(value) => setEmail(value)}
      style={styleRegister.textoInput}
      placeholder="Insira seu e-mail."
      placeholderTextColor="#959595"
      />
      <Text
      style={styleRegister.textFormulario}>
        Senha
      </Text>
      <TextInput
      value={password}
      maxLength={32}
      onChangeText={(value) => setPassword(value)}
      style={styleRegister.textoInput}
      placeholder="Insira sua senha."
      placeholderTextColor="#959595"
      secureTextEntry={true}
      />
      <Text style={styleRegister.textFormulario}>
        Confirme a senha
      </Text>
      <TextInput
      maxLength={32}
      value={confirmPassword}
      onChangeText={(value)=>setConfirmPassword(value)}
      style={styleRegister.textoInput}
      placeholder="Confirme sua senha."
      placeholderTextColor="#959595"
      secureTextEntry={true}
      />

      <TouchableOpacity
      style={styleRegister.botaoRegister}
      onPress={() => {createUser()}}
      >
        <Text style={{fontWeight: 'bold'}}>Registrar</Text>
      </TouchableOpacity>

    </View>
  </KeyboardAvoidingView>
  )
}

export default RegisterScreen