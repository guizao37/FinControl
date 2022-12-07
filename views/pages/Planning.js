import React, {useState} from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import * as COLORS from '../styles/cores.json';
import style from "../styles/style"
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';

export default function Planning() {

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

  const Form = () => {

    const [valor, setValor] = useState(0);
    const [parcelas, setParcelas] = useState(0);
    const [juros, setJuros] = useState(0);
    const [nome, setNome] = useState("");

    const limpaCampos = () => {
      setValor(0);
      setParcelas(0);
      setJuros(0);
    }

  const planejar = () => {

    var valorP = parseFloat(valor.toString().replace(',','.'));
    console.log(valorP);
    var jurosR = parseFloat(juros.toString().replace(',','.')).toFixed(2);
    console.log(jurosR);
    var J = parseFloat(valor.toString().replace(',','.')) * (jurosR/100) * parcelas;
    var VT = valorP  + J;
    console.log(J);
    console.log(VT);
    Alert.alert(nome,"Valor final: R$" + VT.toFixed(2) + "\n" + "Valor de cada parcela: R$" + (VT/parcelas).toFixed(2)
    );
    limpaCampos();
  }

    return (
      <KeyboardAvoidingView
      behavior='padding'
      style={{width: "80%", alignItems: 'center'}}>

        <Text style={style.label}>
          Nome
        </Text>
        <TextInput
        maxLength={12}
        style={style.input}
        value= {nome}
        onChangeText={(nome) => {setNome(nome)}}
        />
        <Text style={style.label}>
          Qual o valor?
        </Text>
        <TextInput
        maxLength={12}
        style={style.input}
        keyboardType = "numeric"
        value= {valor}
        onChangeText={(valor) => {setValor(valor)}}
        />
        <Text style={style.label}>
          Qual o número de parcelas?
        </Text>
        <TextInput
        maxLength={3}
        style={style.input}
        keyboardType = "numeric"
        value= {parcelas}
        onChangeText={(value) => {setParcelas(value)}}
        />
        <Text style={style.label}>
          Informe os juros mensais(%).
        </Text>
        <TextInput
        maxLength={5}
        style={style.input}
        keyboardType = "numeric"
        value= {juros}
        onChangeText={(value) => {setJuros(value)}}
        />
        <View style={{width: "100%"}}>
        <TouchableOpacity
        onPress={() => {planejar()}}
        style={style.button}>
          <Text style={{color: COLORS.GRAY_800, fontWeight: 'bold'}}>Estimar</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      )
  }

  const Header = () => {
    return (
      <View style={style.header}>
        <Text style={style.textHeader}>
          Planejamento
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView 
    style={style.container}>
        <View style={{alignItems:'center'}}>

        <Header/>
        
        <Form/>

        </View>

    </SafeAreaView>
  );
};
