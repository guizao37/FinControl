import { useNavigation } from '@react-navigation/core'
import { Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import styleForgotPassword from '../styles/styleForgotPassword'

export default function ForgotPassword (){

    const navigation = useNavigation()
    const [email, setEmail] = useState('')
  
    const handleResetPassword = () => {
      
    }
    return (
      <Animatable.View
      animation="fadeInRight"
      style={styleForgotPassword.container}
      behavior="height"
      enabled
    >
      <View
      style={styleForgotPassword.containerTexto}>
        <Text style={styleForgotPassword.textoPrincipal}> Esqueci a senha </Text>
      </View>
      <View
      style={styleForgotPassword.containerLogin}
      >
        <Text style={styleForgotPassword.textFormulario}>
          E-mail
        </Text>
        <TextInput 
        style={styleForgotPassword.textoInput}
        placeholder="Insira seu e-mail."
        placeholderTextColor="#959595"
        />
        <TouchableOpacity
        style={styleForgotPassword.botaoLogin}
        >
          <Text>Alterar senha</Text>
        </TouchableOpacity>

      </View>
    </Animatable.View>
    )
  }
