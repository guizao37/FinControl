import React, {useState} from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import * as COLORS from '../styles/cores.json';
import style from "../styles/style"
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingView } from 'react-native';

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
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState(0)
    const [date, setDate] = useState(new Date())
    const [parcelas, setParcelas] = useState(0)
    const [juros, setJuros] = useState(0)

    const [description, setDescription] = useState("")
    const [categoria, setCategoria] = useState("")
    const [categorias, setCategorias] = useState([
      {label: 'Compra', value: 'compra'},
      {label: 'Pagamento de dívida', value: 'divida'},
      {label: 'Empréstimo', value: 'emprestimo'}
    ]);
    const [open, setOpen] = useState(false)

    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (show == false) { 
      setShow(true)
    } else {
      setShow(false)
    }
  };
    return (
      <KeyboardAvoidingView
      behavior='padding'
      style={{width: "80%", alignItems: 'center'}}>
        <Text style={style.label}>
          Dê um nome ao planejamento.
        </Text>
        <TextInput
        maxLength={20}
        style={style.input}
        value= {description}
        onChangeText={(value) => {setDescription(value)}}
        />

        <Text style={style.label}>
          Qual o valor?
        </Text>
        <TextInput
        maxLength={12}
        style={style.input}
        keyboardType = "numeric"
        value= {"R$"+formatarMoeda(valor)}
        onChangeText={(value) => {setValor(value)}}
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
        value= {formatarMoeda(juros)}
        onChangeText={(value) => {setJuros(value)}}
        />
        <Text style={style.label}>
          Qual a data de início?
        </Text>
        <View
        style={style.inputDate}
        >
          <TouchableOpacity onPress={() => {showDatepicker()}}>
            <Text style={{color: COLORS.GRAY_100}}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        {show && (<DateTimePicker
          value={date}
          display={'inline'}
          mode='date'
          onChange={onChange}
          style={style.datePicker}
        />)}

        <Text style={style.label}>
          Selecione uma categoria.
        </Text>

        <View>
        <DropDownPicker
        style={style.input}
        textStyle={{
          color:COLORS.GRAY_100
        }}
        open={open}
        value={categoria}
        items={categorias}
        setOpen={setOpen}
        setValue={(value)=> {setCategoria(value)}}
        setItems={setCategorias}
        dropDownContainerStyle={{
          backgroundColor: COLORS.GRAY_800,
          width: "80%",
          borderWidth: 0,
        }}
        placeholder="Categorias"
        />
        <TouchableOpacity
        onPress={() => {}}
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
