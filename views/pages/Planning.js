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

    const [valor, setValor] = useState(0)
    const [parcelas, setParcelas] = useState(0)
    const [juros, setJuros] = useState(0)
    const [nome, setNome] = useState("");

    const [saldo, setSaldo] = useState(0);

    var valorReceita, valorDespesa, vtReceita, vtDespesa;

    const limpaCampos = () => {
      setValor(0);
      setParcelas(0);
      setJuros(0);
    }

  const planejar = () => {
    const uri1 = "http://192.168.0.12:3301/receitasplan";
    const uri2 = "http://192.168.0.12:3301/despesasplan";

    axios.get(uri1).then(res=>{
      valorReceita = res.data;
      vtReceita = valorReceita[0].receitas;
    })
    .catch(err=>{console.log(err)});
    
    axios.get(uri2).then(res=>{
      valorDespesa = res.data;
      vtDespesa = valorDespesa[0].despesas;
    }).
    catch(err=>{console.log(err)});

    var valorSaldo = (vtReceita/3) - (vtDespesa/3);
    console.log(vtReceita);
    console.log()
    console.log(valorSaldo);
    setSaldo(valorSaldo);

    var valorP = parseFloat(valor.toString().replace(',','.'));
    var jurosR = parseFloat(juros.toString().replace(',','.')).toFixed(2);
    var J = parseFloat(valor.toString().replace(',','.')) * jurosR * parcelas;
    var VT = valorP  + J;
    Alert.alert(nome,"Valor final: R$" + VT.toFixed(2) + "\n" + "Valor de cada parcela: R$" + (VT/parcelas).toFixed(2)
    + "\n" + "Saldo médio últimos 3 meses: R$" + saldo
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
