import React, { useState, useEffect} from 'react';
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
import axios from "axios";
import { useNavigation } from '@react-navigation/core'
import {useRoute} from '@react-navigation/native'

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
                Editar entrada
            </Text>
        </View>
    )
}

const Form = () => {

    const route = useRoute();
    
    useEffect(()=>{
        const uri = "http://192.168.0.11:3301/edit";
        axios({
            method: uri,
            data:{
                idFinanca: route.params.idFinanca
            }
        })
        .then(res=>{
            
        })
        .catch(err=>{})
    }, [])
    const [show, setShow] = useState(false);


    const [valor, setValor] = useState(0);
    const [date, setDate] = useState(new Date());
    const [repete, setRepete] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [description, setDescription] = useState("");

    const [categorias, setCategorias] = useState([
        {label: 'Salário', value: 'salario'},
        {label: 'Empréstimo', value: 'emprestimo'},
        {label: 'Bônus', value: 'bonus'},
        {label: 'Rendimento', value: 'rendimento'},
        {label: 'Dividendos', value: 'dividendos'},
        {label: 'Venda', value: 'venda'},
        {label: 'Lazer', value: 'lazer'},
        {label: 'Educação', value: 'educacao'},
        {label: 'Compras', value: 'compras'},
        {label: 'Assinatura', value: 'assinatura'},
        {label: 'Alimentação', value: 'alimento'},
        {label: 'Outras rendas', value: 'outras_rendas'},
        {label: 'Outras despesas', value: 'outras_despesas'}
    ]);
    
    const [msg, setMsg] = useState("")
    
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
        <Text style={{margin: 4, color: COLORS.GRAY_100, fontSize: 16}}>
          { msg }
        </Text>
        <Text style={style.label}>
            Valor
        </Text>
        <TextInput
        maxLength={10}
        keyboardType="numeric"
        style={style.input}
        value= {formatarMoeda(valor)}
        onChangeText={(valor) => {setValor(valor)}}
        />
        <Text style={style.label}>
          Data
        </Text>
        <View
        style={style.inputDate}
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
          style={style.datePicker}
        />)}
        <Text style={style.label}>
          Descrição
        </Text>
        <TextInput
        maxLength={45}
        style={style.input}
        value= {description}
        onChangeText={(description) => {setDescription(description)}}
        />
        <Text style={style.label}>
          Repetir (em meses)
        </Text>
        <TextInput
        maxLength={3}
        keyboardType="numeric"
        style={style.input}
        value= {repete.toString()}
        onChangeText={(repete) => {setRepete(repete.toString())}}
        />
        <Text style={style.label}>
        Categoria
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
        setValue={(categoria)=> {setCategoria(categoria)}}
        setItems={setCategorias}
        dropDownContainerStyle={{
        backgroundColor: COLORS.GRAY_800,
        width: "100%",
        borderWidth: 0,
        }}
        placeholder="Categorias"
        />
        <TouchableOpacity
        onPress={() => {}}
        style={style.button}>
          <Text style={{color: COLORS.GRAY_800, fontWeight: 'bold'}}>Salvar</Text>
        </TouchableOpacity><TouchableOpacity
        onPress={() => {}}
        style={style.buttonDelete}>
          <Text style={{color: COLORS.GRAY_000, fontWeight: 'bold'}}>Apagar</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
}




const Adicionar = () => {
    return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems:'center'}}>
        <Header/>
        <Form/>
      </View>
    </SafeAreaView>
  )
}

export default Adicionar