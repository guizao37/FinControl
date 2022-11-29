import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { View, Text, Image } from 'react-native';
import style from "../styles/style"
import * as COLORS from "../styles/cores.json"
import { VictoryPie, VictoryLabel } from 'victory-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dashboard() {

  const Header = () => {
    const mesAtual = new Date().toLocaleString(
      'pt-BR', {month: 'long'}
    );
    const mesAgora = new Date().getMonth() + 1;
    const ano = new Date().getFullYear();
    const data = `${ano}-${mesAgora}-01`;
    const [mes, setMes] = useState(mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1));
    const [meses, setMeses] = useState([
      {"label": "Janeiro", "value": "2022-01-01"},
      {"label": "Fevereiro", "value": "2022-02-01"},
      {"label": "Março", "value": "2022-03-01"},
      {"label": "Abril", "value": "2022-04-01"},
      {"label": "Maio", "value": "2022-05-01"},
      {"label": "Junho", "value": "2022-06-01"},
      {"label": "Julho", "value": "2022-07-01"},
      {"label": "Agosto", "value": "2022-08-01"},
      {"label": "Setembro", "value": "2022-09-01"},
      {"label": "Outubro", "value": "2022-10-01"},
      {"label": "Novembro", "value": "2022-11-01"},
      {"label": "Dezembro", "value": "2022-12-01"},
      {"label": "Janeiro/2023", "value": "2023-01-01"},
      {"label": "Fevereiro/2023", "value": "2023-02-01"},
      {"label": "Março/2023", "value": "2023-03-01"},
      {"label": "Abril/2023", "value": "2023-04-01"},
      {"label": "Maio/2023", "value": "2023-05-01"},
      {"label": "Junho/2023", "value": "2023-06-01"},
      {"label": "Julho/2023", "value": "2023-07-01"},
      {"label": "Agosto/2023", "value": "2023-08-01"},
      {"label": "Setembro/2023", "value": "2023-09-01"},
      {"label": "Outubro/2023", "value": "2023-10-01"},
      {"label": "Novembro/2023", "value": "2023-11-01"},
      {"label": "Dezembro/2023", "value": "2023-12-01"}
    ]);
    const [valueMes, setValueMes] = useState(data);
    const [open, setOpen] = useState(false);
    const [openTipo, setOpenTipo] = useState(false);


    return (
      <View style={{alignItems: 'center', zIndex: 999}}>
        <TouchableOpacity onPress={() => {open ? setOpen(false) : setOpen(true)}}>
          <Text style={{
            fontSize: 32,
            fontWeight: "bold",
            color: COLORS.GRAY_100
          }}>
            {mes}
          </Text>
        </TouchableOpacity>
        {open ? (
          <View style={{
          position: 'absolute',
          borderRadius: 10,
          shadowOpacity: 1,
          backgroundColor: 'black',
          marginTop: '50%',
          right: 'auto',
          width: "90%",
          height: 400,
        }}>
          <View style={{alignItems: 'center', height: 400}}>
            <Text style={{fontWeight: 'bold', fontSize: 28, color: COLORS.GRAY_100, marginBottom: 8}}>
              Selecione o mês
            </Text>
          <FlatList
          style= {{
            width: "100%",
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
              setOpen(false);
             }}
            >
              <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>{item.label}</Text>
            </TouchableOpacity>
          )}
          />
          </View>
          </View>
        ): null}
      </View>
    )
  }

  const GerenciarContas = () => {

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
      axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        setPosts(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }, [])

    const item = ({ item }) => (
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>{item.id}</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 20}}>{item.userId}</Text>
        </TouchableOpacity>
  )
    
    return (
      <View style={{width: "90%", backgroundColor: COLORS.GRAY_800, borderRadius: 4, padding: 12, marginTop: 12}}>
        <Text style={{color: COLORS.GRAY_100, fontSize: 24, marginBottom:12}}>
          Gerenciar contas
        </Text>
        <FlatList
        style={{height: 130}}
        data={posts}
        renderItem= {item}
        keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

  const Grafico = () => {

    const [mostraTipos, setMostraTipos] = useState(false);
    const [tipo, setTipo] = useState("Receitas");
    const [valueTipo, setValueTipo] = useState("receitas");

    const [tipos, setTipos] = useState([
      {"label": "Receitas", "value": "receitas"},
      {"label": "Despesas", "value": "despesas"},
      {"label": "Bens", "value": "bens"},
      {"label": "Dívidas", "value": "dividas"}
    ]);
 
    return (
      <View style={{width: "90%", marginTop: 12, borderRadius: 4, marginBottom: 12}}>
        <TouchableOpacity onPress={() => {mostraTipos ? setMostraTipos(false) : setMostraTipos(true)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: COLORS.GRAY_100, marginLeft: 12, marginRight: 12}}>
            {tipo}
          </Text>
          <Image source={require("../../assets/seta.png")}
          style={{tintColor: COLORS.GRAY_100, width: 20, height: 20, justifyContent: 'center'}}
          />
        </View>
        </TouchableOpacity>
        {
          mostraTipos ? (
        <View style={{alignItems: 'center', zIndex: 999}}>
        <View style={{
        position: 'absolute',
        borderRadius: 10,
        shadowOpacity: 1,
        backgroundColor: 'black',
        marginTop: '50%',
        right: 'auto',
        width: "90%",
        height: 150
      }}>
        <View style={{alignItems: 'center', height: 400}}>
          <Text style={{fontWeight: 'bold', fontSize: 28, color: COLORS.GRAY_100, marginBottom: 8}}>
            Selecione o tipo
          </Text>
        <FlatList
        style= {{
          width: "100%",
        }}
        contentContainerStyle={{
          alignItems:'center'
        }}
        data={tipos}
        renderItem={({item})=>(
          <TouchableOpacity 
          style={{marginBottom: 4}}
          onPress= {() => {
              setTipo(item.label);
              setValueTipo(item.value);
              setMostraTipos(false);
           }}
          >
            <Text style={{color: COLORS.GRAY_100, fontSize: 20, fontWeight: '500'}}>{item.label}</Text>
          </TouchableOpacity>
        )}
        />
        </View>
        </View>
        </View>
          ) : null
        }
        <View style={{alignItems: 'center'}}>
          <VictoryPie
          width={400}
          labelComponent={<VictoryLabel style={[
            {"fill": "white"}
          ]}
          textAnchor="middle"
          />}
          colorScale={["#D9CE3F", "#E83A14", "#890F0D", "#630606"]}
          data={[
            {x: "Compras", y: 100},
            {x: "Lazer", y: 50},
            {x: "Educação", y:30},
            {x: "Contas", y: 100}
          ]
          }
          innerRadius= {80}
          />
      </View>
      </View>
    )
  }

  const ListaGrafico = () => {
    return (
      <ScrollView 
      contentContainerStyle={{alignItems: 'center'}}
      style={{width:"100%", height: 240}}>
      <View style={{width: "90%", backgroundColor: "#D9CE3F", height: 100, borderRadius: 4, marginBottom: 12}}>
        <View style={{width: "95%", backgroundColor: COLORS.GRAY_800, height: 100, justifyContent: 'space-between', alignItems: 'center',flexDirection: 'row', padding: 8}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>Compras:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>R$1.000,00</Text>
        </View>
      </View>
      <View style={{width: "90%", backgroundColor: "#E83A14", height: 100, borderRadius: 4, marginBottom: 12}}>
        <View style={{width: "95%", backgroundColor: COLORS.GRAY_800, height: 100, justifyContent: 'space-between', alignItems: 'center',flexDirection: 'row', padding: 8}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>Contas:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>R$1.000,00</Text>
        </View>
      </View>
      <View style={{width: "90%", backgroundColor: "#890F0D", height: 100, borderRadius: 4, marginBottom: 12}}>
        <View style={{width: "95%", backgroundColor: COLORS.GRAY_800, height: 100, justifyContent: 'space-between', alignItems: 'center',flexDirection: 'row', padding: 8}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>Lazer:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>R$500,00</Text>
        </View>
      </View>
      <View style={{width: "90%", backgroundColor: "#630606", height: 100, borderRadius: 4, marginBottom: 12}}>
        <View style={{width: "95%", backgroundColor: COLORS.GRAY_800, height: 100, justifyContent: 'space-between', alignItems: 'center',flexDirection: 'row', padding: 8}}>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>Educação:</Text>
          <Text style={{color: COLORS.GRAY_100, fontSize: 24}}>R$300,00</Text>
        </View>
      </View>
      </ScrollView>
    )
    }

  return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems: 'center'}}>
        <Header/>
        <Grafico/>
        <ListaGrafico/>
      </View>
    </SafeAreaView>
  );
}