import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Finances() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>

   
      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("Despesa")}} >
        <Text>Inserir entrada</Text>
      </TouchableOpacity>

     </View>
     </View>
  );
}
