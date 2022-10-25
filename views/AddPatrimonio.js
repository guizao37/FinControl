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
        <View style={{alignItems: 'center'}}>
            <Text style={styleAdd.textHeader}>
                Bens e dívidas
            </Text>
        </View>
    )
}

const Parcelas = () => {
    const [parcelas, setParcelas] = useState(0)

    return (
    <View style={{alignItems: 'center', marginTop: 12}}>
        <Text style={styleAdd.label}>
            Número de parcelas?
        </Text>
        <TextInput
        maxLength={3}
        keyboardType="numeric"
        style={styleAdd.input}
        value= {parcelas}
        onChangeText={() => {setParcelas(parcelas)}}
        />
    </View>
    )
}

const Form = () => 
{   
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState(0)
    const [date, setDate] = useState(new Date())

    const [categoria, setCategoria] = useState("")

    const [description, setDescription] = useState("")
    const [categorias, setCategorias] = useState([
        {label: 'Bem', value: 'bem'},
        {label: 'Dívida', value: 'divida'},
    ])
    
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
        <View style={{width: '80%', alignItems: 'center'}}>
        <Text style={styleAdd.label}>
            Qual o valor?
        </Text>
        <TextInput
        maxLength={12}
        keyboardType="numeric"
        style={styleAdd.input}
        value= {"R$" + formatarMoeda(valor)}
        onChangeText={(valor) => {setValor(valor)}}
        />
        <Text style={styleAdd.label}>
          Qual a data?
        </Text>
        <View
        style={styleAdd.inputDate}
        >
          <TouchableOpacity style={{width: "100%"}} onPress={() => {showDatepicker()}}>
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
        onChangeText={() => {setDescription(description)}}
        />

        <Text style={styleAdd.label}>
        Selecione a categoria
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
        placeholder="Categoria"
        />
        {categoria == "divida" ? (
            <Parcelas/>
        ):null}
        <TouchableOpacity 
        style={styleAdd.button}>
          <Text style={{color: COLORS.GRAY_800, fontWeight: 'bold'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
}


const AddPatrimonio = () => {
    return (
    <SafeAreaView style={styleAdd.container}>
        <Header/>
        <Form/>
    </SafeAreaView>
  )
}

export default AddPatrimonio