import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { useState } from 'react'
import styles from './styles'

export default function ForgotPassword (){

    const navigation = useNavigation()
    const [email, setEmail] = useState('')
  
    const handleResetPassword = () => {

      auth
      .sendPasswordResetEmail(email)
      .then(() => alert( "Um e-mail foi enviado para sua caixa de entrada."))
      .catch(error => alert(error.message))
      
    }
    return (
    <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="E-mail"
                        placeholderTextColor='#878787'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input} />

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleResetPassword}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Enviar e-mail de redefinição</Text>
                    </TouchableOpacity>
                <Button title=" VOLTAR " onPress={ () => navigation.replace("Login")}/>
                </View>
    </KeyboardAvoidingView>
    )
  }

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

  