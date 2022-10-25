import React, {useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar, ScrollView, Touchable } from 'react-native';
import styleFinance from '../styles/styleFinance';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as COLORS from '../styles/cores.json';


export default function Finances() {

  const addReceitas = () =>{
    navigation.navigate("Receita")
  }

  const addDespesas = () =>{
    navigation.navigate("Despesa")
  }

  const Header = ({texto}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: COLORS.GRAY_100}}>
          {texto}
        </Text>
      </View>
    )
  }

  const Saldo = () => {
    return (
    <View style={{alignItems: 'center'}}>
      <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
      <Header texto={"Outubro"}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Receitas:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          R${formatarMoeda(123456)}
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Despesas:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          -R${formatarMoeda(123456)}
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Saldo total:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
        R${formatarMoeda(123456)}
        </Text>
        </View>
      </View>
    </View>
    )
  }

  const AddButton = () => {
    return (
      <View style={{alignItems: 'center', position: 'absolute', right: 0, bottom: "15%", right: "5%", padding: 4, backgroundColor: 'black', borderRadius: 50}}>
        <TouchableOpacity style= {{margin: 8}} onPress={() => {navigation.navigate("Adicionar")}}>
        <Image
        style={{width: 25, height: 25, tintColor: COLORS.GRAY_100}}
        source= {require("../assets/adicionar.png")}
        />
        </TouchableOpacity>
      </View>
    )
  }

  const GerenciarContas = () => {
    
    return (
      <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
        <Header texto={"Gerenciar contas"}/>
        <ScrollView style={{height: 100}}> 
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>Nubank:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20}}>R$1.200,00</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>Itaú:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20}}>R$1.200,00</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>C6 Bank:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20}}>R$1.200,00</Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>Banco inter:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20}}>R$1.200,00</Text>
          </View>
        </ScrollView>
      </View>
      </View>
    )
  }

  const Extrato = () => {
    const [show, setShow] = useState(true)
    return (
      <View style={{alignItems: 'center', marginTop: 12}}>
        <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
          <TouchableOpacity onPress={() => {setShow(show ? false : true)}}>
            <Header texto={"Extrato"}/>
          </TouchableOpacity>
          {show ? (
            <FlatList style={{height:"60%"}}>
              
            </FlatList>
          ) : null}
        </View>
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
  <SafeAreaView style={styleFinance.container}>
    
    
    <Saldo/>
    <GerenciarContas/>
    <Extrato/>
    
    <AddButton/>
  </SafeAreaView>
  );
}
