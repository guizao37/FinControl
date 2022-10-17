import React, {useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import styleFinance from '../styles/styleFinance';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as COLORS from '../styles/cores.json';


export default function Finances() {

  const ListHeader = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 400}}>
        <Text style={{color: COLORS.GRAY_100, fontWeight: 'bold', fontSize: 16}}>
          Data                  
        </Text>
        <Text style={{color: COLORS.GRAY_100, fontWeight: 'bold', fontSize: 16}}>
          Valor
        </Text>
        <Text style={{color: COLORS.GRAY_100, fontWeight: 'bold', fontSize: 16}}>
          Categoria
        </Text>
      </View>
    );
  };

  const Extrato = () => {

    const valor = formatarMoeda(12345678)

    const data = [
      {id: 1, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Lazer', tipo: 'despesa'},
      {id: 2, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Salário', tipo: 'receita'},
      {id: 3, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Compras', tipo: 'despesa'},
      {id: 4, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Educação', tipo: 'despesa'},
      {id: 5, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Lazer', tipo: 'despesa'},
      {id: 6, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Salário', tipo: 'receita'},
      {id: 7, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Compras', tipo: 'despesa'},
      {id: 8, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Educação', tipo: 'despesa'},
      {id: 9, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Lazer', tipo: 'despesa'},
      {id: 0, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Salário', tipo: 'receita'},
      {id: 10, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Compras', tipo: 'despesa'},
      {id: 11, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Educação', tipo: 'despesa'},
      {id: 12, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Lazer', tipo: 'despesa'},
      {id: 13, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Salário', tipo: 'receita'},
      {id: 14, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Compras', tipo: 'despesa'},
      {id: 15, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Educação', tipo: 'despesa'},
      {id: 16, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Lazer', tipo: 'despesa'},
      {id: 17, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Salário', tipo: 'receita'},
      {id: 18, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Compras', tipo: 'despesa'},
      {id: 19, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Educação', tipo: 'despesa'},
      {id: 20, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Lazer', tipo: 'despesa'},
      {id: 21, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Salário', tipo: 'receita'},
      {id: 22, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Compras', tipo: 'despesa'},
      {id: 23, data: "17/10/2022", valor: "R$" + formatarMoeda(12345), categoria: 'Educação', tipo: 'despesa'},
  ]

    const item = ({ item }) => (
      <View style={{ flexDirection: 'row', paddingBottom: 5, paddingTop: 5 }}>
          <View style={{marginRight: 60}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: item.tipo == 'receita' ? '#71FF4B' : '#FF4B4B'}}>{item.data}</Text>
          </View>
          <View style={{marginRight: 100}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center', color: item.tipo == 'receita' ? '#71FF4B' : '#FF4B4B'}}>{item.valor}</Text>
          </View>
          <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center', color: item.tipo == 'receita' ? '#71FF4B' : '#FF4B4B'}}>{item.categoria}</Text>
          </View>
      </View>
  )
    return (
      <View style={styleFinance.viewExtrato}>
        <Text style={styleFinance.textExtrato}>Extrato</Text>
        <View style={{height: "75%"}}>
        <ListHeader/>
        <FlatList
        nestedScrollEnabled
        data={data} renderItem={item} keyExtractor={item => item.id.toString()}
        />
        </View>
      </View>
    );
  }

  const Header = () => {
    return (
    <View style={styleFinance.header}>
    <Text style={styleFinance.headerText}>
      Saldo
    </Text>
    <Text style={styleFinance.valorSaldo}>
      R$ {formatarMoeda(123456)}
    </Text>
    </View>
    )
  }

  const ContainerDados = () => {
    return (
    <View style={styleFinance.containerDados}>
      <View style={styleFinance.containerEntradas}>

        <View style={styleFinance.containerReceitas}>
         <Text style={styleFinance.textoSecundario}>Receitas</Text>
          <Text style={styleFinance.valorReceita}>R$ {formatarMoeda(12345678)}</Text>
        </View>

        <View style={styleFinance.containerDespesas}>
          <Text style={styleFinance.textoSecundario}>Despesas</Text>
          <Text style={styleFinance.valorDespesa}>R$ {formatarMoeda(12345678)}</Text>
        </View>
      </View>
      
      <Extrato />
    </View>
    )
  }

  function formatarMoeda(valor) {
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    if(valor == 'NaN') valor = '';

    return valor;
}

  const navigation = useNavigation();
  
  const addReceita = () => {
    navigation.navigate("Receita")
  }

  const addDespesa = () => {
    navigation.navigate("Despesa")
  }

  return (    
  <View style={styleFinance.container}>
    
    <Header/>

    <ContainerDados/>

  </View>
  );
}
