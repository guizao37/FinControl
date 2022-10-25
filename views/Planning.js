import React, {useState} from 'react';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import * as COLORS from '../styles/cores.json';
import styleAdd from '../styles/styleAdd';
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
        <Text style={styleAdd.label}>
          Qual o valor?
        </Text>
        <TextInput
        maxLength={12}
        style={styleAdd.input}
        keyboardType = "numeric"
        value= {"R$"+formatarMoeda(valor)}
        onChangeText={(value) => {setValor(value)}}
        />

        <Text style={styleAdd.label}>
          Qual o número de parcelas?
        </Text>
        <TextInput
        maxLength={3}
        style={styleAdd.input}
        keyboardType = "numeric"
        value= {parcelas}
        onChangeText={(value) => {setParcelas(value)}}
        />
        <Text style={styleAdd.label}>
          Informe os juros mensais(%).
        </Text>
        <TextInput
        maxLength={5}
        style={styleAdd.input}
        keyboardType = "numeric"
        value= {formatarMoeda(juros)}
        onChangeText={(value) => {setJuros(value)}}
        />
        <Text style={styleAdd.label}>
          Qual a data de início?
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
        onPress={() => {}}
        style={styleAdd.button}>
          <Text style={{color: COLORS.GRAY_800, fontWeight: 'bold'}}>Estimar</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      )
  }

  const Header = () => {
    return (
      <View style={styleAdd.header}>
        <Text style={styleAdd.textHeader}>
          Planejamento
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView 
    style={styleAdd.container}>

        <Header/>
        
        <Form/>

    </SafeAreaView>
  );
};
