import React, {useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar } from 'react-native';
import styleFinance from '../styles/styleFinance';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as COLORS from '../styles/cores.json';
import StatusBarCustom from 'react-native-custom-statusbar';

export default function Finances() {

  const navigation = useNavigation();
  const mesAtual = new Date().getMonth();
  const[mes, setMes] = useState(mesAtual);
  // TESTE DROPDOWN PICKER
  const [listaMesesOpen, setListaMesesOpen] = useState(false);
  const [listaAnosOpen, setListaAnosOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [listaMeses, setListaMeses] = useState([
    {label: 'Janeiro', value: 'janeiro'},
    {label: 'Fevereiro', value: 'fevereiro'},
    {label: 'Março', value: 'março'},
    {label: 'Abril', value: 'abril'},
    {label: 'Maio', value: 'maio'},
    {label: 'Junho', value: 'junho'},
    {label: 'Julho', value: 'julho'},
    {label: 'Agosto', value: 'agosto'},
    {label: 'Setembro', value: 'setembro'},
    {label: 'Outubro', value: 'outubro'},
    {label: 'Novembro', value: 'novembro'},
    {label: 'Dezembro', value: 'dezembro'}
  ]);
  const [listaAnos, setListaAnos] = useState([
    {label: '2022', value: '2022'},
    {label: '2023', value: '2023'},
  ]);
  // NAVEGAÇÃO
  const addReceita = () => {
    navigation.navigate("Receita")
  }

  const addDespesa = () => {
    navigation.navigate("Despesa")
  }

  return (    
  <SafeAreaView style={styleFinance.container}>

  </SafeAreaView>
  );
}
