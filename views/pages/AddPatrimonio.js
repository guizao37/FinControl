import React, { useState} from 'react';
import { 
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView } from 'react-native';
import style from "../styles/style"
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
            <Text style={style.textHeader}>
                Bens e dívidas
            </Text>
        </View>
    )
}

const Categorias = () => {
  const [categoria, setCategoria] = useState("")
  const [categorias, setCategorias] = useState([

  ])
  const [open, setOpen] = useState(false)
  return (
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
        width: "100%",
        borderWidth: 0,
        }}
        placeholder="Categoria"
    />
  )
}

const Parcelas = () => {
    const [parcelas, setParcelas] = useState(0)

    return (
    <View style={{alignItems: 'center', marginTop: 12}}>
        <Text style={style.label}>
            Número de parcelas
        </Text>
        <TextInput
        maxLength={3}
        keyboardType="numeric"
        style={style.input}
        value= {parcelas}
        onChangeText={() => {setParcelas(parcelas)}}
        />
    </View>
    )
}

const Form = () => 
{   
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState(0)
    const [date, setDate] = useState(new Date())

    const divida = "divida"
 
    const [tipo, setTipo] = useState("")

    const [tipos, setTipos] = useState([
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
          <Text style={style.label}>
            Qual o valor?
          </Text>
          <TextInput
          maxLength={12}
          keyboardType="numeric"
          style={style.input}
          value= {"R$" + formatarMoeda(valor)}
          onChangeText={(valor) => {setValor(valor)}}
          />
          <Text style={style.label}>
            Qual a data?
          </Text>

        <View style={style.inputDate}>
          <TouchableOpacity style={{width: "100%"}} onPress={() => {showDatepicker()}}>
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
          Selecione o tipo
        </Text>

        <View>
        <DropDownPicker
        style={style.input}
        textStyle={{
        color:COLORS.GRAY_100
        }}
        open={open}
        value={tipo}
        items={tipos}
        setOpen={setOpen}
        setValue={(value)=> {setTipo(value)}}
        setItems={setTipos}
        dropDownContainerStyle={{
        backgroundColor: COLORS.GRAY_800,
        borderWidth: 0,
        }}
        placeholder="Categoria"
        />

        {tipo == 'divida' ? (
          <View>
            <Parcelas/>
            <Categorias/>
          </View>
        ):null}
        
        <TouchableOpacity 
        style={style.button}>
          <Text style={{color: COLORS.GRAY_800, fontWeight: 'bold'}}>Adicionar</Text>
        </TouchableOpacity>
        
      </View>
      </View>
    )
}
const AddPatrimonio = () => {
    return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems:'center'}}>
        <Header/>
        <Form/>
      </View>
    </SafeAreaView>
  )
}

export default AddPatrimonio