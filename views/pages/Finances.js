import React, {useState, useCallback} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, StatusBar, ScrollView, Touchable } from 'react-native';
import style from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as COLORS from '../styles/cores.json';
import { useEffect } from 'react';
import axios from 'axios';


export default function Finances() {

  const mesAtual = new Date().toLocaleString(
    'pt-BR', {month: 'long'}
  );
  const mesAgora = new Date().getMonth() + 1;
  var ano = new Date().getFullYear();

  var proxMes = 0;
  var proxAno = 0;

  if (mesAgora == 12) {
    proxMes = 1;
    proxAno = ano + 1;
  } else {
    proxMes = mesAgora + 1;
    proxAno = ano;
  }

  const [data, setData] = useState(`${ano}-${mesAgora}-01`);
  const [dataFim, setDataFim] = useState(`${proxAno}-${proxMes}-01`);
  const [mes, setMes] = useState(mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1));

  const [open, setOpen] = useState(false);

  const [vtReceitas, setVtReceitas] = useState(0);
  const [vtDespesas, setVtDespesas] = useState(0);
  const [valorSaldo, setValorSaldo] = useState(0);
 
  const [meses, setMeses] = useState([
    //2022
    {"label": "Janeiro", "value": "2022-01-01", "proximo":"2022-01-31"},
    {"label": "Fevereiro", "value": "2022-02-01", "proximo":"2022-02-28"},
    {"label": "Março", "value": "2022-03-01", "proximo":"2022-03-31"},
    {"label": "Abril", "value": "2022-04-01", "proximo":"2022-04-30"},
    {"label": "Maio", "value": "2022-05-01", "proximo":"2022-05-31"},
    {"label": "Junho", "value": "2022-06-01", "proximo":"2022-06-30"},
    {"label": "Julho", "value": "2022-07-01", "proximo":"2022-07-31"},
    {"label": "Agosto", "value": "2022-08-01", "proximo":"2022-08-31"},
    {"label": "Setembro", "value": "2022-09-01", "proximo":"2022-09-30"},
    {"label": "Outubro", "value": "2022-10-01", "proximo":"2022-10-31"},
    {"label": "Novembro", "value": "2022-11-01", "proximo":"2022-11-30"},
    {"label": "Dezembro", "value": "2022-12-01", "proximo":"2022-12-31"},
    // 2023
    {"label": "Janeiro/2023", "value": "2023-01-01", "proximo":"2023-01-31"},
    {"label": "Fevereiro/2023", "value": "2023-02-01", "proximo":"2023-02-28"},
    {"label": "Março/2023", "value": "2023-03-01", "proximo":"2023-03-31"},
    {"label": "Abril/2023", "value": "2023-04-01", "proximo":"2023-04-30"},
    {"label": "Maio/2023", "value": "2023-05-01", "proximo":"2023-05-31"},
    {"label": "Junho/2023", "value": "2023-06-01", "proximo":"2023-06-30"},
    {"label": "Julho/2023", "value": "2023-07-01", "proximo":"2023-07-31"},
    {"label": "Agosto/2023", "value": "2023-08-01", "proximo":"2023-08-31"},
    {"label": "Setembro/2023", "value": "2023-09-01", "proximo":"2023-09-30"},
    {"label": "Outubro/2023", "value": "2023-10-01", "proximo":"2023-10-31"},
    {"label": "Novembro/2023", "value": "2023-11-01", "proximo":"2023-11-30"},
    {"label": "Dezembro/2023", "value": "2023-12-01", "proximo":"2023-12-31"}
  ]);

  const uri1 = "http://192.168.0.11:3301/receitas";
  const uri2 = "http://192.168.0.11:3301/despesas";

  const api = () => { 
    // Busca receitas
    axios({
      method: 'post',
      url: uri1,
      data: {
        data: data,
        dataFim: dataFim
      }
    })
    .then(res=> {
      var dados = res.data;
      setVtReceitas(dados[0].receitas);
    })
    .catch(err => { console.log(err); })

    // Busca despesas
    axios({
      method: 'post',
      url: uri2,
      data: {
        data: data,
        dataFim: dataFim
      }
    })
    .then(res=> {
      var dados = res.data;
      setVtDespesas(dados[0].despesas);
    })
    .catch(err => { console.log(err); })

    var saldo = vtReceitas - vtDespesas;
    setValorSaldo(saldo);
  }

  useEffect(()=>{
    api();
  }, []);

  const reload = () =>{
    api();
  }


  const Header = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity>
        <Text style={style.textHeader}>
          {mes}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => { reload(); }}
          >
          <Image
          style={{width: 25, height: 25, tintColor: 'white', position: 'absolute', left: 160, bottom: 5}}
            source={require('../../assets/reload.png')}
          />
          </TouchableOpacity>
          {open ? (
            <View style={{
            position: 'absolute',
            borderRadius: 10,
            shadowOpacity: 1,
            backgroundColor: 'gray',
            marginTop: '50%',
            right: 'auto',
            width: "90%",
            height: 400,
          }}>
            <View style={{alignItems: 'center', height: 400}}>
              <Text style={{fontWeight: 'bold', fontSize: 28, color: COLORS.GRAY_900, marginBottom: 8}}>
                Selecione o mês
              </Text>
            <FlatList
            style= {{
              width: "100%",
              height: 50
            }}
            contentContainerStyle={{
              alignItems:'center'
            }}
            data={meses}
            renderItem={({item})=>(
              <TouchableOpacity 
              style={{marginBottom: 4}}
              onPress= { () => {
                setValueMes(item.value);
                setMes(item.label);
                setDataFim(item.proximo);
                setOpen(false);
               }}
              >
                <Text style={{color: COLORS.GRAY_900, fontSize: 20, fontWeight: '500'}}>{item.label}</Text>
              </TouchableOpacity>
            )}
            />
            </View>
            </View>
          ): null}
      </View>
    )
  }

  const Saldo = () => {
    return (
    <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: COLORS.GRAY_800, borderRadius: 4, padding: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Receitas:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          R$ { vtReceitas }
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Despesas:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          -R$ { vtDespesas }
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Saldo total:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
        R$ { valorSaldo }
        </Text>
        </View>
      </View>
    </View>
    )
  }

  const AddButton = () => {
    return (
      <View style={{alignItems: 'center', position: 'absolute', right: 0, bottom: "15%", right: "5%", padding: 4, backgroundColor: 'black', borderRadius: 50}}>
        <TouchableOpacity style= {{margin: 8}} onPress={() => {navigation.navigate("Adicionar")}}>
        <Image
        style={{width: 25, height: 25, tintColor: COLORS.GRAY_100}}
        source= {require("../../assets/adicionar.png")}
        />
        </TouchableOpacity>
      </View>
    )
  }

  

  const Extrato = () => {
    const [show, setShow] = useState(true)
    return (
      <View style={{alignItems: 'center', marginTop: 12}}>
        <View style={{width: "90%", backgroundColor: COLORS.GRAY_800, borderRadius: 4, padding: 12}}>
          <TouchableOpacity onPress={() => {setShow(show ? false : true)}}>
            <View style={{alignItems: 'center'}}>
            <Text style={{color:COLORS.GRAY_100, fontSize: 28, fontWeight: '500'}}>
              Extrato
            </Text>
            </View>
          </TouchableOpacity>
          {show ? (
            <FlatList style={{height:"70%"}}>
              
            </FlatList>
          ) : null}
        </View>
      </View>
    )
  }

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

  const navigation = useNavigation();
  
  const addReceita = () => {
    navigation.navigate("Receita")
  }

  const addDespesa = () => {
    navigation.navigate("Despesa")
  }

  return (    
  <SafeAreaView style={style.container}>
    
    <Header/>
    <Saldo/>
    <Extrato/>
    
    <AddButton/>
  </SafeAreaView>
  );
}
