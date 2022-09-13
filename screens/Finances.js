import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, ScrollView } from 'react-native';
import styleFinance from '../styles/styleFinance';
import { useNavigation } from '@react-navigation/native';

export default function Finances() {

  const navigation = useNavigation();

  const addReceita = () => {
    navigation.navigate("Receita")
  }

  const addDespesa = () => {
    navigation.navigate("Despesa")
  }

  return (
    <View style={styleFinance.container}>
      <View style={styleFinance.containerList}>
        <Text style={styleFinance.textoPrincipal}>Extrato</Text>
        <Text style={styleFinance.textoExtrato}>R$4.500,00</Text>
      </View>

      <View style={styleFinance.containerList}>
        <Text style={styleFinance.textoPrincipal}>Receitas</Text>
        <TouchableOpacity style={styleFinance.touchableOpacity} onPress={() => { navigation.navigate("Receita") }}>
          <Image source={require("../assets/add.png")} style= {styleFinance.add} />
        </TouchableOpacity>
        <FlatList 
        
        />
      </View>
      
        <View style={styleFinance.containerList}>
          <Text style={styleFinance.textoPrincipal}>Despesas</Text>
          <TouchableOpacity style={styleFinance.touchableOpacity} onPress={() => { navigation.navigate("Despesa") }}>
            <Image source={require("../assets/add.png")} style={styleFinance.add}/>
          </TouchableOpacity>
      </View>
      
      
    </View>
  );
}
