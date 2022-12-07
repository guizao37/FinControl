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

  const uri1 = "http://192.168.0.12:3301/bens";
  const uri2 = "http://192.168.0.12:3301/dividas";

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
  };

  const [valorAgosto, setValorAgosto] = useState(0);
  const [valorSetembro, setValorSetembro] = useState(0);
  const [valorOutubro, setValorOutubro] = useState(0);
  const [valorNovembro, setValorNovembro] = useState(0);
  const [valorDezembro, setValorDezembro] = useState(0);

  const [evolucao, setEvolucao] = useState([])

  const apiGrafico = () => {

    const uri = "http://192.168.0.12:3301/agosto";
    const uri2 = "http://192.168.0.12:3301/setembro";
    const uri3 = "http://192.168.0.12:3301/outubro";
    const uri4 = "http://192.168.0.12:3301/novembro";
    const uri5 = "http://192.168.0.12:3301/dezembro";

    axios.get(uri).then(res=>{if ((res.data)[0].Valor === null) {setValorAgosto(0)} else { setValorAgosto((res.data)[0].Valor) }}).catch(err=>{console.log(err)});
    axios.get(uri2).then(res=>{if ((res.data)[0].Valor === null){setValorSetembro(0)} else { setValorSetembro((res.data)[0].Valor) }}).catch(err=>{console.log(err)});
    axios.get(uri3).then(res=>{if ((res.data)[0].Valor === null){setValorOutubro(0)} else { setValorOutubro((res.data)[0].Valor) }}).catch(err=>{console.log(err)});
    axios.get(uri4).then(res=>{if ((res.data)[0].Valor === null){setValorNovembro(0)} else { setValorNovembro((res.data)[0].Valor) }}).catch(err=>{console.log(err)});
    axios.get(uri5).then(res=>{if ((res.data)[0].Valor === null){setValorDezembro(0)} else { setValorDezembro((res.data)[0].Valor) }}).catch(err=>{console.log(err)});

    console.log(valorAgosto);
    console.log(valorSetembro);
    console.log(valorOutubro);
    console.log(valorNovembro);
    console.log(valorDezembro);
  }

  useEffect(()=>{
    apiGeral();
    apiGrafico();
  }, []);

  const reload = () =>{
    apiGeral();
    apiGrafico();
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
        <TouchableOpacity
        onPress={() => {navigation.navigate("Listagem");}}
        >
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
        </TouchableOpacity>
      </View>
    </View>
    )
  }

  const Grafico = () => {
    return (
      <View style= {{ alignItems: 'center'}}>
      <View style={{ backgroundColor: COLORS.GRAY_800, borderRadius: 4, marginTop: 20, width: "90%", alignItems: 'center'}}>
          <Text style={{ color: COLORS.GRAY_100, fontWeight: '500', fontSize: 24, marginTop: 4,alignItems: 'center'}}>
            Evolução
          </Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 16}}>
            (x1000)
          </Text>
          <View style={{marginLeft: 20}}>
          <VictoryChart
          maxDomain={{ y: 1000 }}
          height={400}
          width={350}
          theme={VictoryTheme.material}
          minDomain={{ y: 0 }}
          >
            <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #e1e1e6"}
            }}
            data={[
              { x: "Agosto", y: valorAgosto/1000},
              { x: "Setembro", y:valorSetembro/1000},
              { x: "Outubro", y:valorOutubro/1000},
              { x: "Novembro", y: valorNovembro/1000},
              { x: "Dezembro", y:valorDezembro/1000}
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
