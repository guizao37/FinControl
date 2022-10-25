import React, {useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar, ScrollView, Touchable } from 'react-native';
import style from '../styles/style';
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

  const Header = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
        <View>
        <Text style={style.textHeader}>
          Outubro
        </Text>
        </View>
        <View style={{justifyContent: 'center', marginLeft: 8}}>
        <Image source={require("../../assets/seta.png")}
        style={{tintColor: COLORS.GRAY_100, width: 25, height: 25, }}
        />
        </View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }

  const Saldo = () => {
    return (
    <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
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
        source= {require("../../assets/adicionar.png")}
        />
        </TouchableOpacity>
      </View>
    )
  }

  

  const Extrato = () => {
    const [show, setShow] = useState(true)
    return (
      <View style={{alignItems: 'center', marginTop: 12}}>
        <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
          <TouchableOpacity onPress={() => {setShow(show ? false : true)}}>
            <View style={{alignItems: 'center'}}>
            <Text style={{color:COLORS.GRAY_100, fontSize: 28, fontWeight: '500'}}>
              Extrato
            </Text>
            </View>
          </TouchableOpacity>
          {show ? (
            <FlatList style={{height:"70%"}}>
              
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
  <SafeAreaView style={style.container}>
    
    <Header/>
    <Saldo/>
    <Extrato/>
    
    <AddButton/>
  </SafeAreaView>
  );
}
