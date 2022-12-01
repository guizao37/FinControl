import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styleSettings from '../styles/styleSettings';
import * as COLORS from '../styles/cores.json';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Settings({emailUser}) {

  const navigation = useNavigation();
  const uri = "http://192.168.0.11:3301/nome";

  const [nomeUser, setNomeUser] = useState();

  useEffect(() => {
    axios.get(uri)
    .then(res=>{
      var dados = res.data;
      setNomeUser(dados[0].Nome);
    })
    .catch(err=>{
      console.log(err);
    })
  },
  []);

  const dados = () =>{
    navigation.navigate("Dados")
  }

  const alterar = () =>{
    navigation.navigate("Senha")
  }
  
  const ajuda = () => {
    navigation.navigate("Ajuda")
  }

  const sair = () => {
    navigation.navigate("Login")
  }
  
  const Buttons = () => {
    return (
      <View style={{margin: 12}}>
      <Text style={styleSettings.greetings}>
        Olá, {nomeUser}
      </Text>
      <View style={{borderWidth: 1, marginTop: 16, borderColor: COLORS.GRAY_100}}/>
      <View style={{marginTop: 8}}>
      <TouchableOpacity 
      style={styleSettings.buttons}
      onPress={() => {dados()}}
      >
        <Text style={styleSettings.textButtons}>
          Dados pessoais
        </Text>
        <Text style={styleSettings.textSmall}>
          Visualize e altere seus dados.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => {alterar()}}
      style={styleSettings.buttons}>
        <Text style={styleSettings.textButtons}>
        Alterar a senha
        </Text>
        <Text style={styleSettings.textSmall}>
          Altere a senha cadastrada.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => {ajuda()}}
      style={styleSettings.buttons}>
        <Text style={styleSettings.textButtons}>
          Ajuda
        </Text>
        <Text style={styleSettings.textSmall}>
          Tire suas dúvidas.
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>{sair()}}
      style={styleSettings.buttons}>
        <Text style={styleSettings.textButtons}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
    </View>
    )
  }

  const Header = () => {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={styleSettings.headerText}>
            Configurações
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styleSettings.container}>

      <Header/>

      <Buttons/>

    </SafeAreaView>
  )
}
