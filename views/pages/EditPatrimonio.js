import React, { useState, useEffect} from 'react';
import { 
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import style from "../styles/style"
import * as COLORS from "../styles/cores.json"
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import { useNavigation } from '@react-navigation/core'
import {useRoute} from '@react-navigation/native'



const Form = () => {

    const [show, setShow] = useState(false);

    const [valor, setValor] = useState(0);
    const [date, setDate] = useState("");
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
  

    const [msg, setMsg] = useState("");
    
    const [open, setOpen] = useState(false);

    const [dados, setDados] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();  

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

    const excluirFinanca = () => {
      const uri = "http://192.168.0.12:3301/deleteP";
      axios({
       method: 'post',
       url: uri,
       data:{
        idPatrimonio: route.params.idPatrimonio
       } 
      })
      .then(
        res=>{
          console.log(res);
        }
      )
      .catch(err=>{
        console.error(err);
      });
      alert("Entrada apagada.");
      navigation.goBack();
    }

    const api = () => {
      const uri = "http://192.168.0.12:3301/edit";
      axios({
          method: 'post',
          url: uri,
          data:{
              idFinanca: route.params.idFinanca
          }
      })
      .then(res=>{
          setDados(res.data);
          var vlr = dados[0].Valor;
          console.log(typeof valor);
          console.log(vlr);
          setValor(vlr);
          console.log(valor);
          setCategoria(dados[0].Categoria);
          setDescription(dados[0].Descricao);
          setDate(dados[0].Data);
      })
      .catch(err=>{})
    }



    useEffect(()=>{
      api();
    }, [categorias, open])

    const reload = () => {
      api();
    }

    return (
      <View style={{width: '100%', alignItems:'center'}}>
        <View style={{alignItems: 'center', marginBottom: 12, marginTop: 12}}>
        <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>
          Editar finança
        </Text>
        <TouchableOpacity 
        onPress={() => { reload(); }}
        >
        <Image
        style={{width: 25, height: 25, tintColor: 'white', position: 'absolute', left: 160, bottom: 5}}
          source={require('../../assets/reload.png')}
        />
        </TouchableOpacity>
        </View>
      
        <View style={{width: '80%', alignItems: 'center'}}>
        <Text style={{margin: 4, color: COLORS.GRAY_100, fontSize: 16}}>
          { msg }
        </Text>
        <Text style={style.label}>
            Valor
        </Text>
        <TextInput
        maxLength={10}
        style={style.input}
        value= {valor.toString()}
        onChangeText={ () => { }}
        />
        <Text style={style.label}>
          Data
        </Text>
        <TextInput
        maxLength={45}
        style={style.input}
        value= {date.substring(0,10)}
        onChangeText={(date) => {setDate(date)}}
        editable = {false}
        />
        <Text style={style.label}>
          Descrição
        </Text>
        <TextInput
        maxLength={45}
        style={style.input}
        value= {description}
        onChangeText={(value) => {setDescription(value)}}
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
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {excluirFinanca()}}
        style={style.buttonDelete}>
          <Text style={{color: COLORS.GRAY_000, fontWeight: 'bold'}}>Apagar</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
    )
}



const EditPatrimonio = () => {
    return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems:'center'}}>
        <Form/>
      </View>
    </SafeAreaView>
  )
}

export default EditPatrimonio