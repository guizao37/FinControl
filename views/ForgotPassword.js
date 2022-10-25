import { useNavigation } from '@react-navigation/core'
import { Text, TextInput, TouchableOpacity, View, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import styleForgotPassword from '../styles/styleForgotPassword'
import * as COLORS from '../styles/cores.json';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ForgotPassword (){

    const navigation = useNavigation()
    const [email, setEmail] = useState('')
  
    const handleResetPassword = () => {
      
    }
    return (
      <KeyboardAvoidingView
      behavior='padding'
      style={styleForgotPassword.container}
      >
        <Text style={{color: COLORS.GRAY_100, fontSize: 32, fontWeight: 'bold', marginBottom: 12}}>Recupere sua senha</Text>
        <View
        style={{width: "80%"}}
        >
        <Text style={{
          fontSize: 16,
          marginBottom: 12,
          color: COLORS.GRAY_100
        }}>
          E-mail
        </Text>
        <TextInput
        style={styleForgotPassword.textoInput}
        placeholder='Insira seu e-mail'
        /> 
        <TouchableOpacity style={styleForgotPassword.botao}>
          <Text style={{fontWeight: 'bold'}}>Enviar</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
