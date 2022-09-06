import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native-web';

export default function Settings() {

  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton}>
      <Image
        style={styles.user}
        source={require('../assets/user.png')}
      />
        <Text style={styles.settingsText}>
          Meus dados
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>
          Notificações
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>
          Privacidade
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>
          Ajuda
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>
          Sobre
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      </View>
  )
}
