import React from 'react';
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

export default function Patrimonio() {

  const navigation = useNavigation()

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

  const Header = ({texto}) => {
    return (
      <View style={style.header}>
        <Text style={style.textHeader}>
          {texto}
        </Text>
      </View>
    )
  }

  const Overview = () => {
    return (
    <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Bens:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          R${formatarMoeda(123456)}
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Dívidas:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          -R${formatarMoeda(123456)}
        </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
          Patrimônio líquido:
        </Text>
        <Text style={{fontSize: 20, fontWeight: '500', color: COLORS.GRAY_100}}>
        R${formatarMoeda(123456)}
        </Text>
        </View>
      </View>
    </View>
    )
  }

  const GerenciarBens = () => {
    
    return (
      <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
      <View style={style.header}>
        <Text style={{
          color: COLORS.GRAY_100,
          fontSize: 24,
          fontWeight: '500'
        }}>
          Bens
        </Text>
      </View>
        <FlatList style={{height: 180}}> 
          
        </FlatList>
      </View>
      </View>
    )
  }

  const GerenciarDividas = () => {
    
    return (
      <View style={{alignItems: 'center', marginTop: 12}}>
      <View style={{width: "90%", backgroundColor: 'black', borderRadius: 4, padding: 12}}>
      <View style={style.header}>
        <Text style={{
          color: COLORS.GRAY_100,
          fontSize: 24,
          fontWeight: '500'
        }}>
          Dívidas
        </Text>
      </View>
        <FlatList style={{height: 180}}>

        </FlatList>
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
      <GerenciarBens/>
      <GerenciarDividas/>
      <AddButton/>
    </SafeAreaView>
  );
}
