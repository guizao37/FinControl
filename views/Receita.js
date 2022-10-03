import React, { useState} from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import styleReceita from '../styles/styleReceita';

import { TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Receita() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Venda', value: 'venda'},
    {label: 'Salário', value: 'salario'},
    {label: 'Dividendos', value: 'dividendos'},
    {label: 'Aluguel', value: 'aluguel'},
    {label: 'Outra', value: 'outra'}
  ]);

  const [valor, setValor] = useState(0)

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

  //DATEPICKER

  const [date, setDate] = useState(new Date())

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    var SQLDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    console.log(SQLDate)
  };

  //PICKER 
  const [categoria, setCategoria] = useState('selecione');

  return (
    <View style={styleReceita.container}>
      <Text style={styleReceita.textValor}>R$ {formatarMoeda(valor)}</Text>
      <TextInput
        maxLength={8}
        value= {valor}
        style={styleReceita.textoInput}
        keyboardType='numeric'
        placeholder="Insira o valor."
        placeholderTextColor="#959595"
        onChangeText={valor => setValor(valor)}
        />
        <TextInput
        placeholder='Insira a descrição'
        placeholderTextColor="#959595"
        style={styleReceita.textoInput}
        maxLength={45}
        />
        <View style={{width: "80%", justifyContent: 'center'}}>
        <Text style={{position:'absolute', fontSize: 15}}>Selecione a data:</Text>
        
        </View>
        
        <DropDownPicker
        style={styleReceita.dropdownPicker}
        dropDownContainerStyle={{width:"78%", marginLeft:"10%", borderRadius: 15, borderWidth:0}}
        placeholder="Selecione uma categoria"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        />
      <TouchableOpacity style={styleReceita.Button}>
        <Text style={styleReceita.textButton}>Inserir receita</Text>
      </TouchableOpacity>
    </View>
  );
}
