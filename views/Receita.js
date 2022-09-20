import React, { useState} from 'react';
import { View, Text, TextInput } from 'react-native';
import styleReceita from '../styles/styleReceita';
import {Picker} from '@react-native-picker/picker';

export default function Receita() {

  const [valor, setValor] = useState(0)

  const [selectedLanguage, setSelectedLanguage] = useState('-');

  const format = amount => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <View style={styleReceita.container}>
      <Text style={styleReceita.textValor}>R$ {format(valor)}</Text>
      <TextInput
        maxLength={9}
        value= {valor}
        style={styleReceita.textoInput}
        placeholder="Insira o valor."
        placeholderTextColor="#959595"
        onChangeText={valor => setValor(valor)}
        />
        <TextInput
        placeholder='Insira a descrição'
        placeholderTextColor="#959595"
        style={styleReceita.textoInput}
        maxLength={45}
        />
        <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) =>
        setSelectedLanguage(itemValue)
        }>
          <Picker.Item label="Java" value="java" /> 
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
    </View>
  );
}
