import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {FlatList, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, SafeAreaView, Touchable } from 'react-native'
import styleLogin from '../styles/styleLogin'
import * as Animatable from "react-native-animatable"
import * as COLORS from '../styles/cores.json';
import axios from 'axios'
import style from '../styles/style'

const Listagem = () => {

    const navigation = useNavigation();

    const [dados, setDados] = useState([
    ])

    const api = () => { 
        const uri = "http://192.168.0.12:3301/listapatrimonio";
        axios.get(uri)
        .then(res=>{
            console.log(res.data);
            setDados(res.data);
        })
        .catch(err=>{});
    }

    useEffect(()=>{
        api();
    },[]);

    const reload = () => {
        api();
    }
    
    const renderItem = ({item}) => {
        return (
        <View>
            <TouchableOpacity style={{backgroundColor: COLORS.GRAY_700, borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row',
            marginBottom: 4, height: 56, alignItems: 'center', padding: 4
            }}
            onPress= { () => {
                navigation.navigate("EditPatrimonio",{
                    idPatrimonio: item.idPatrimonio
                });
            }}
            >
                <Text style={{color: COLORS.GRAY_100}}>
                    Descrição: {item.Descricao}
                </Text>
                <Text style={{color: COLORS.GRAY_100}}>
                    R${item.Valor}
                </Text>
            </TouchableOpacity>
        </View>
        )
    }

    return (
    <SafeAreaView style={style.container}>
        <View style={{alignItems: 'center', marginBottom: 12, marginTop: 12}}>
        <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>
          Listagem patrimonial
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
        <View style={{alignItems: 'center'}}>
            <View style={{height: "90%", width: "90%", backgroundColor: COLORS.GRAY_800, borderRadius: 4, padding: 8}}>
                <FlatList
                renderItem={renderItem}
                data = {dados}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Listagem