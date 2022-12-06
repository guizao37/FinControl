import React, {useState, useEffect} from 'react';
import { 
  View,
  Text, 
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import style from "../styles/style";
import * as COLORS from '../styles/cores.json';
import { useNavigation } from '@react-navigation/native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native'
import axios from 'axios';

export default function Patrimonio() {

  const navigation = useNavigation();

  const uri1 = "http://192.168.0.11:3301/bens";
  const uri2 = "http://192.168.0.11:3301/dividas";

  const [bens, setBens] = useState(0);
  const [dividas, setDividas] = useState(0);

  const [pl, setPl] = useState(0);
 
  const apiGeral = () => { 
    // Busca bens
    axios.get(uri1)
    .then(res=>{
      let dados = res.data;
      setBens(dados[0].BemTotal);
    })
    .catch(err=>{
      console.error(err);
    });

    //busca dividas
    axios.get(uri2)
    .then(res=>{
      let dados = res.data;
      setDividas(dados[0].DividaTotal);
    })
    .catch(err=>{
      console.error(err);
    });

    setPl(bens - dividas);
  }

  useEffect(()=>{
    apiGeral();
  }, []);

  const reload = () =>{
    apiGeral();
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

  const Header = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={style.textHeader}>
          Patrimônio
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
    )
  }

  const Overview = () => {
    return (
    <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: COLORS.GRAY_800, borderRadius: 4, padding: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Bens:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          R$ {bens}
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Dívidas:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          -R$ {dividas}
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Patrimônio líquido:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
        {(pl > 0) ? "R$ " + pl : "-R$ " + pl*(-1)}
        </Text>
        </View>
      </View>
    </View>
    )
  }

  const Grafico = () => {
    return (
      <View style= {{ alignItems: 'center'}}>
      <View style={{ backgroundColor: COLORS.GRAY_800, borderRadius: 4, marginTop: 20, width: "90%", alignItems: 'center'}}>
          <Text style={{ color: COLORS.GRAY_100, fontWeight: '500', fontSize: 24, margin: 8, alignItems: 'center'}}>
            Evolução
          </Text>
          <Text style={{ color: COLORS.GRAY_100, fontSize: 16}}>
            (patrimônio líquido)
          </Text>
          <View style={{marginLeft: 20}}>
          <VictoryChart
          width={350}
          theme={VictoryTheme.material}
          >
            <VictoryLine
            interpolation="natural"
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #e1e1e6"}
            }}
            data={[
              { x: "Janeiro", y: "1.000" },
              { x: "Fevereiro", y: "3.000" },
              { x: "Março", y: "4.000" },
              { x: "Abril", y: "5.000" },
              { x: "Maio", y: "6.000" }
            ]}
            />
          </VictoryChart>
          </View>
          </View>
    </View>
    )
  }

  const AddButton = () => {
    return (
      <View style={{alignItems: 'center', position: 'absolute', right: 0, bottom: "15%", right: "5%", padding: 4, backgroundColor: 'black', borderRadius: 50}}>
        <TouchableOpacity style= {{margin: 8}} onPress={() => {navigation.navigate("AddPatrimonio")}}>
        <Image
        style={{width: 25, height: 25, tintColor: COLORS.GRAY_100}}
        source= {require("../../assets/adicionar.png")}
        />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={style.container}>

      <Header texto={"Patrimônio"}/>
      <Overview/>
      <Grafico/>
      <AddButton/>
    </SafeAreaView>
  );
}
