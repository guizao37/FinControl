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
    ]);

    useEffect(()=>{
        var uri = "http://192.168.0.11:3301/finances";
        axios.get(uri)
        .then(res=>{
            console.log(res.data);
            setDados(res.data);
        })
        .catch(err=>{});
    },[]);
    
    const renderItem = ({item}) => {
        return (
        <View>
            <TouchableOpacity style={{backgroundColor: COLORS.GRAY_700, borderRadius: 8, justifyContent: 'space-between', flexDirection: 'row',
            marginBottom: 4, height: 40, alignItems: 'center', padding: 4
            }}
            onPress= { () => {
                navigation.navigate("Edit",{
                    idFinanca: item.idFinança
                });
            }}
            >
                <Text>
                    Descrição: {item.Descricao}
                </Text>
                <Text>
                    R${item.Valor}
                </Text>
            </TouchableOpacity>
        </View>
        )
    }

    return (
    <SafeAreaView style={style.container}>
        <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 24, marginBottom: 12}}>Listagem de finanças</Text>
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