import React, { useState} from 'react';
import { 
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView } from 'react-native';
import styleAdd from '../styles/styleAdd';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as COLORS from "../styles/cores.json"
import DropDownPicker from 'react-native-dropdown-picker';

export default function Despesa() {

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

  const Header = () => {

    return (
      <View style={styleAdd.header}>
        <Text style={styleAdd.textHeader}>
          Nova despesa
        </Text>
      </View>
    )
  }

  const Form = () => {

    const [show, setShow] = useState(false);
    const [valor, setValor] = useState(0)
    const [date, setDate] = useState(new Date())

    const [description, setDescription] = useState("")
    const [categoria, setCategoria] = useState("")
    const [categorias, setCategorias] = useState([
      {label: 'Lazer', value: 'lazer'},
      {label: 'Educação', value: 'educacao'},
      {label: 'Compras', value: 'compras'},
      {label: 'Assinatura', value: 'assinatura'},
      {label: 'Alimentação', value: 'alimento'},
      {label: 'Outras despesas', value: 'outro'}
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
      <View style={styleAdd.form}>
        <Text style={styleAdd.label}>
          Qual o valor?
        </Text>
        <TextInput
        maxLength={12}
        style={styleAdd.input}
        value= {"R$"+formatarMoeda(valor)}
        onChangeText={(value) => {setValor(value)}}
        />
        
        <Text style={styleAdd.label}>
          Qual a data?
        </Text>
        <View
        style={styleAdd.inputDate}
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
          style={styleAdd.datePicker}
        />)}

        <Text style={styleAdd.label}>
          Adicione uma breve descrição
        </Text>
        <TextInput
        maxLength={255}
        style={styleAdd.input}
        value= {description}
        onChangeText={(value) => {setDescription(value)}}
        />

        <Text style={styleAdd.label}>
          Selecione uma categoria
        </Text>

        <View>
        <DropDownPicker
        style={styleAdd.input}
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
        style={styleAdd.button}>
          <Text style={{color: COLORS.GRAY_800, fontWeight: 'bold'}}>Adicionar</Text>
        </TouchableOpacity>
        </View>
       
      </View>
    )
  }
  

  return (
    <SafeAreaView style= {styleAdd.container}>

      <Header/>

      <Form/>

    </SafeAreaView>
  );
}
