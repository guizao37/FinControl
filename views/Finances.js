import React, {useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl, ScrollView } from 'react-native';
import styleFinance from '../styles/styleFinance';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

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
