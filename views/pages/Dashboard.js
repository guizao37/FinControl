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
    const [mes, setMes] = useState(mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1))
    const [meses, setMeses] = useState([])
    const [open, setOpen] = useState(false)
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
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 28, color: COLORS.GRAY_100, marginBottom: 8}}>
              Selecione o mês
            </Text>
          <FlatList
          data={meses}
          renderItem={({item})=>(
            <TouchableOpacity style={{marginBottom: 4}}>
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

  const Categoria = () => {
    return (
      <View style={{position: 'absolute'}}>
        <View style={{width: 100, height: 100, backgroundColor: 'black'}}>
          <Text>Ola</Text>
        </View>
      </View>
    )
  }

  const Grafico = () => {

    return (
      <View style={{width: "90%", marginTop: 12, borderRadius: 4, marginBottom: 12}}>
        <TouchableOpacity onPress={() => {show ? setShow(false) : setShow(true)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 24, color: COLORS.GRAY_100, marginLeft: 12, marginRight: 12}}>
            Despesas
          </Text>
          <Image source={require("../../assets/seta.png")}
          style={{tintColor: COLORS.GRAY_100, width: 20, height: 20, justifyContent: 'center'}}
          />
        </View>
        </TouchableOpacity>
        {show ? (<Categoria/>) : null}
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

  const [show, setShow] = useState(false)

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