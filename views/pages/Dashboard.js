import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { View, Text, Image } from 'react-native';
import style from "../styles/style"
import * as COLORS from "../styles/cores.json"
import { VictoryPie, VictoryLabel } from 'victory-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Dashboard() {

    var vtSalario = 0, vtEmprestimo = 0, vtBonus = 0, 
    vtRendimento = 0, vtDividendos = 0, vtVenda = 0, vtOutrasRendas =0;
    var vtLazer = 0, vtEducacao = 0, vtCompras = 0,
    vtAssinatura = 0, vtAlimento = 0, vtOutrasDespesas = 0;

    

    const mesAtual = new Date().toLocaleString(
      'pt-BR', {month: 'long'}
    );
    const mesAgora = new Date().getMonth() + 1;
    const proxMes = mesAgora + 1;
    const ano = new Date().getFullYear();
    const [data, setData] = useState(`${ano}-${mesAgora}-01`);
    const [dataFim, setDataFim] = useState(`${ano}-${proxMes}-01`);
    const [mes, setMes] = useState(mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1));
    const [meses, setMeses] = useState([
      {"label": "Janeiro", "value": "2022-01-01", "proximo":"2022-02-01"},
      {"label": "Fevereiro", "value": "2022-02-01", "proximo":"2022-03-01"},
      {"label": "Março", "value": "2022-03-01", "proximo":"2022-04-01"},
      {"label": "Abril", "value": "2022-04-01", "proximo":"2022-05-01"},
      {"label": "Maio", "value": "2022-05-01", "proximo":"2022-06-01"},
      {"label": "Junho", "value": "2022-06-01", "proximo":"2022-07-01"},
      {"label": "Julho", "value": "2022-07-01", "proximo":"2022-08-01"},
      {"label": "Agosto", "value": "2022-08-01", "proximo":"2022-09-01"},
      {"label": "Setembro", "value": "2022-09-01", "proximo":"2022-10-01"},
      {"label": "Outubro", "value": "2022-10-01", "proximo":"2022-11-01"},
      {"label": "Novembro", "value": "2022-11-01", "proximo":"2022-12-01"},
      {"label": "Dezembro", "value": "2022-12-01", "proximo":"2023-01-01"},
      {"label": "Janeiro/2023", "value": "2023-01-01", "proximo":"2023-02-01"},
      {"label": "Fevereiro/2023", "value": "2023-02-01", "proximo":"2023-03-01"},
      {"label": "Março/2023", "value": "2023-03-01", "proximo":"2023-04-01"},
      {"label": "Abril/2023", "value": "2023-04-01", "proximo":"2023-05-01"},
      {"label": "Maio/2023", "value": "2023-05-01", "proximo":"2023-06-01"},
      {"label": "Junho/2023", "value": "2023-06-01", "proximo":"2023-07-01"},
      {"label": "Julho/2023", "value": "2023-07-01", "proximo":"2023-08-01"},
      {"label": "Agosto/2023", "value": "2023-08-01", "proximo":"2023-09-01"},
      {"label": "Setembro/2023", "value": "2023-09-01", "proximo":"2023-10-01"},
      {"label": "Outubro/2023", "value": "2023-10-01", "proximo":"2023-11-01"},
      {"label": "Novembro/2023", "value": "2023-11-01", "proximo":"2023-12-01"},
      {"label": "Dezembro/2023", "value": "2023-12-01", "proximo":"2024-01-01"}
    ]);
    const [valueMes, setValueMes] = useState(data);
    const [open, setOpen] = useState(false);

    const [dadosGrafico, setDadosGrafico] = useState([]);

    const [mostraTipos, setMostraTipos] = useState(false);
    const [tipo, setTipo] = useState("Receitas");
    const [valueTipo, setValueTipo] = useState("R");

    const [tipos, setTipos] = useState([
      {"label": "Receitas", "value": "R"},
      {"label": "Despesas", "value": "D"},
      {"label": "Bens", "value": "bens"},
      {"label": "Dívidas", "value": "dividas"}
    ]);

    const uri = "http://192.168.0.11:3301/financas";

    // Faz uma requisição quando navegar pra tela Dashboard
    useEffect(()=>{
      var salario = {};
      var emprestimo  = {};
      var bonus = {};
      var rendimento  = {};
      var dividendos = {};
      var venda = {};
      var outras = {};
      var lazer  = {};
      var educacao = {};
      var outras_despesas = {};
      var assinatura = {};
      var compras = {};
      var alimento = {};
      axios({
        method: 'post',
        url: uri,
        data: {
          data: valueMes,
          tipo: valueTipo,
          dataFim: dataFim
          }
      })
      .then(res => {
        const dados = Object.values(res.data);
        var arrayDados = [];
        vtSalario = 0, vtEmprestimo = 0, vtBonus = 0, 
        vtRendimento = 0, vtDividendos = 0, vtVenda = 0, vtOutrasRendas =0;
        vtLazer = 0, vtEducacao = 0, vtCompras = 0,
        vtAssinatura = 0, vtAlimento = 0, vtOutrasDespesas = 0;
        setDadosGrafico([]);
        for (var i=0; i < dados.length; i++) {
          console.log("VALOR: " + dados[i].Valor);
          if (valueTipo == "R"){
            if (dados[i].Categoria == "salario") {
              vtSalario = vtSalario + dados[i].Valor;
              salario = {
                "id": 1,
                "value": vtSalario,
                "label": "Salário"
              };
            }
            if (dados[i].Categoria == "emprestimo") {
              vtEmprestimo = vtEmprestimo + dados[i].Valor;
              emprestimo = {
                "id": 2,
                "value": vtEmprestimo,
                "label": "Empréstimo"
              };
            } 
            if (dados[i].Categoria == "bonus") {
              vtBonus = vtBonus + dados[i].Valor;
              bonus = {
                "id": 3,
                "value": vtBonus,
                "label": "Bônus"
              };
            } 
            if (dados[i].Categoria == "rendimento") {
              vtRendimento = vtRendimento + dados[i].Valor;
              rendimento = {
                "id": 4,
                "value": vtRendimento,
                "label": "Rendimento"
              };
            } 
            if (dados[i].Categoria == "dividendos") {
              vtDividendos = vtDividendos + dados[i].Valor;
              dividendos = {
                "id": 5,
                "value": vtDividendos,
                "label": "Dividendos"
              };
            } 
            if (dados[i].Categoria == "venda") {
              vtVenda = vtVenda + dados[i].Valor;
              venda = {
                "id": 6,
                "value": vtVenda,
                "label": "Vendas"
              };
            } 
            if (dados[i].Categoria == "outras_rendas") {
              vtOutrasRendas = vtOutrasRendas + dados[i].Valor;
              outras = {
                "id": 7,
                "value": vtOutrasRendas,
                "label": "Outras"
              };
            } 
        } else if (valueTipo =="D") {
          if (dados[i].Categoria == "lazer") {
            vtLazer = vtLazer + dados[i].Valor;
            lazer = {
              "id": 8,
              "value": vtLazer,
              "label": "Lazer"
            };
          }
          if (dados[i].Categoria == "educacao") {
            vtEducacao = vtEducacao + dados[i].Valor;
            educacao = {
              "id": 9,
              "value": vtEducacao,
              "label": "Educação"
            };
          } 
          if (dados[i].Categoria == "compras") {
            vtCompras = vtCompras + dados[i].Valor;
            compras = {
              "id": 10,
              "value": vtCompras,
              "label": "Compras"
            };
          } 
          if (dados[i].Categoria == "assinatura") {
            vtAssinatura = vtAssinatura + dados[i].Valor;
            assinatura = {
              "id": 11,
              "value": vtAssinatura,
              "label": "Assinatura"
            };
          } 
          if (dados[i].Categoria == "alimento") {
            vtAlimento = vtAlimento + dados[i].Valor;
            alimento = {
              "id": 12,
              "value": vtAlimento,
              "label": "Alimentação"
            };
          } 
          if (dados[i].Categoria == "outras_despesas") {
            vtOutrasDespesas = vtOutrasDespesas + dados[i].Valor;
            outras_despesas = {
              "id": 1,
              "value": vtOutrasDespesas,
              "label": "Outras"
            };
          } 
        }
        if (Object.keys(salario).length > 0) arrayDados.push(salario);
        if (Object.keys(emprestimo).length > 0) arrayDados.push(emprestimo);
        if (Object.keys(bonus).length > 0) arrayDados.push(bonus);
        if (Object.keys(rendimento).length > 0) arrayDados.push(rendimento);
        if (Object.keys(dividendos).length > 0) arrayDados.push(dividendos);
        if (Object.keys(venda).length > 0) arrayDados.push(venda);
        if (Object.keys(outras).length > 0) arrayDados.push(outras);
        if (Object.keys(lazer).length > 0) arrayDados.push(lazer);
        if (Object.keys(educacao).length > 0) arrayDados.push(educacao);
        if (Object.keys(outras_despesas).length > 0) arrayDados.push(outras_despesas);
        if (Object.keys(assinatura).length > 0) arrayDados.push(assinatura);
        if (Object.keys(compras).length > 0) arrayDados.push(compras);
        if (Object.keys(alimento).length > 0) arrayDados.push(alimento);
        }
        setDadosGrafico(arrayDados);
      console.log(dadosGrafico);
      })
      .catch(err => {
        console.error(err);
      })
    }, []);

    // Faz uma requisição quando alterar o valor do mês (QUANDO O USUÁRIO ALTERAR O MES)
    useEffect(()=>{
      var salario = {};
      var emprestimo  = {};
      var bonus = {};
      var rendimento  = {};
      var dividendos = {};
      var venda = {};
      var outras = {};
      var lazer  = {};
      var educacao = {};
      var outras_despesas = {};
      var assinatura = {};
      var compras = {};
      var alimento = {};
      axios({
        method: 'post',
        url: uri,
        data: {
          data: valueMes,
          tipo: valueTipo,
          dataFim: dataFim
          }
      })
      .then(res => {
        const dados = Object.values(res.data);
        var arrayDados = [];
        vtSalario = 0, vtEmprestimo = 0, vtBonus = 0, 
        vtRendimento = 0, vtDividendos = 0, vtVenda = 0, vtOutrasRendas =0;
        vtLazer = 0, vtEducacao = 0, vtCompras = 0,
        vtAssinatura = 0, vtAlimento = 0, vtOutrasDespesas = 0;
        setDadosGrafico([]);
        for (var i=0; i < dados.length; i++) {
          console.log("VALOR: " + dados[i].Valor);
          if (valueTipo == "R"){
            if (dados[i].Categoria == "salario") {
              vtSalario = vtSalario + dados[i].Valor;
              salario = {
                "id": 1,
                "value": vtSalario,
                "label": "Salário"
              };
            }
            if (dados[i].Categoria == "emprestimo") {
              vtEmprestimo = vtEmprestimo + dados[i].Valor;
              emprestimo = {
                "id": 2,
                "value": vtEmprestimo,
                "label": "Empréstimo"
              };
            } 
            if (dados[i].Categoria == "bonus") {
              vtBonus = vtBonus + dados[i].Valor;
              bonus = {
                "id": 3,
                "value": vtBonus,
                "label": "Bônus"
              };
            } 
            if (dados[i].Categoria == "rendimento") {
              vtRendimento = vtRendimento + dados[i].Valor;
              rendimento = {
                "id": 4,
                "value": vtRendimento,
                "label": "Rendimento"
              };
            } 
            if (dados[i].Categoria == "dividendos") {
              vtDividendos = vtDividendos + dados[i].Valor;
              dividendos = {
                "id": 5,
                "value": vtDividendos,
                "label": "Dividendos"
              };
            } 
            if (dados[i].Categoria == "venda") {
              vtVenda = vtVenda + dados[i].Valor;
              venda = {
                "id": 6,
                "value": vtVenda,
                "label": "Vendas"
              };
            } 
            if (dados[i].Categoria == "outras_rendas") {
              vtOutrasRendas = vtOutrasRendas + dados[i].Valor;
              outras = {
                "id": 7,
                "value": vtOutrasRendas,
                "label": "Outras"
              };
            } 
        } else if (valueTipo =="D") {
          if (dados[i].Categoria == "lazer") {
            vtLazer = vtLazer + dados[i].Valor;
            lazer = {
              "id": 8,
              "value": vtLazer,
              "label": "Lazer"
            };
          }
          if (dados[i].Categoria == "educacao") {
            vtEducacao = vtEducacao + dados[i].Valor;
            educacao = {
              "id": 9,
              "value": vtEducacao,
              "label": "Educação"
            };
          } 
          if (dados[i].Categoria == "compras") {
            vtCompras = vtCompras + dados[i].Valor;
            compras = {
              "id": 10,
              "value": vtCompras,
              "label": "Compras"
            };
          } 
          if (dados[i].Categoria == "assinatura") {
            vtAssinatura = vtAssinatura + dados[i].Valor;
            assinatura = {
              "id": 11,
              "value": vtAssinatura,
              "label": "Assinatura"
            };
          } 
          if (dados[i].Categoria == "alimento") {
            vtAlimento = vtAlimento + dados[i].Valor;
            alimento = {
              "id": 12,
              "value": vtAlimento,
              "label": "Alimentação"
            };
          } 
          if (dados[i].Categoria == "outras_despesas") {
            vtOutrasDespesas = vtOutrasDespesas + dados[i].Valor;
            outras_despesas = {
              "id": 1,
              "value": vtOutrasDespesas,
              "label": "Outras"
            };
          } 
        }
        if (Object.keys(salario).length > 0) arrayDados.push(salario);
        if (Object.keys(emprestimo).length > 0) arrayDados.push(emprestimo);
        if (Object.keys(bonus).length > 0) arrayDados.push(bonus);
        if (Object.keys(rendimento).length > 0) arrayDados.push(rendimento);
        if (Object.keys(dividendos).length > 0) arrayDados.push(dividendos);
        if (Object.keys(venda).length > 0) arrayDados.push(venda);
        if (Object.keys(outras).length > 0) arrayDados.push(outras);
        if (Object.keys(lazer).length > 0) arrayDados.push(lazer);
        if (Object.keys(educacao).length > 0) arrayDados.push(educacao);
        if (Object.keys(outras_despesas).length > 0) arrayDados.push(outras_despesas);
        if (Object.keys(assinatura).length > 0) arrayDados.push(assinatura);
        if (Object.keys(compras).length > 0) arrayDados.push(compras);
        if (Object.keys(alimento).length > 0) arrayDados.push(alimento);
        }
        setDadosGrafico(arrayDados);
      console.log(dadosGrafico);
      })
      .catch(err => {
        console.error(err);
      })
    }, [valueMes]);

    // Faz uma requisição quando alterar o valor do tipo (QUANDO O USUÁRIO ALTERAR O TIPO)
    useEffect(()=>{
      var salario = {};
      var emprestimo  = {};
      var bonus = {};
      var rendimento  = {};
      var dividendos = {};
      var venda = {};
      var outras = {};
      var lazer  = {};
      var educacao = {};
      var outras_despesas = {};
      var assinatura = {};
      var compras = {};
      var alimento = {};
      axios({
        method: 'post',
        url: uri,
        data: {
          data: valueMes,
          tipo: valueTipo,
          dataFim: dataFim
          }
      })
      .then(res => {
        const dados = Object.values(res.data);
        vtSalario = 0, vtEmprestimo = 0, vtBonus = 0, 
        vtRendimento = 0, vtDividendos = 0, vtVenda = 0, vtOutrasRendas =0;
        vtLazer = 0, vtEducacao = 0, vtCompras = 0,
        vtAssinatura = 0, vtAlimento = 0, vtOutrasDespesas = 0;
        var arrayDados = [];
        setDadosGrafico([]);
        for (var i=0; i < dados.length; i++) {
          console.log("VALOR: " + dados[i].Valor);
          if (valueTipo == "R"){
            if (dados[i].Categoria == "salario") {
              vtSalario = vtSalario + dados[i].Valor;
              salario = {
                "id": 1,
                "value": vtSalario,
                "label": "Salário"
              };
            }
            if (dados[i].Categoria == "emprestimo") {
              vtEmprestimo = vtEmprestimo + dados[i].Valor;
              emprestimo = {
                "id": 2,
                "value": vtEmprestimo,
                "label": "Empréstimo"
              };
            } 
            if (dados[i].Categoria == "bonus") {
              vtBonus = vtBonus + dados[i].Valor;
              bonus = {
                "id": 3,
                "value": vtBonus,
                "label": "Bônus"
              };
            } 
            if (dados[i].Categoria == "rendimento") {
              vtRendimento = vtRendimento + dados[i].Valor;
              rendimento = {
                "id": 4,
                "value": vtRendimento,
                "label": "Rendimento"
              };
            } 
            if (dados[i].Categoria == "dividendos") {
              vtDividendos = vtDividendos + dados[i].Valor;
              dividendos = {
                "id": 5,
                "value": vtDividendos,
                "label": "Dividendos"
              };
            } 
            if (dados[i].Categoria == "venda") {
              vtVenda = vtVenda + dados[i].Valor;
              venda = {
                "id": 6,
                "value": vtVenda,
                "label": "Vendas"
              };
            } 
            if (dados[i].Categoria == "outras_rendas") {
              vtOutrasRendas = vtOutrasRendas + dados[i].Valor;
              outras = {
                "id": 7,
                "value": vtOutrasRendas,
                "label": "Outras"
              };
            } 
        } else if (valueTipo =="D") {
          if (dados[i].Categoria == "lazer") {
            vtLazer = vtLazer + dados[i].Valor;
            lazer = {
              "id": 8,
              "value": vtLazer,
              "label": "Lazer"
            };
          }
          if (dados[i].Categoria == "educacao") {
            vtEducacao = vtEducacao + dados[i].Valor;
            educacao = {
              "id": 9,
              "value": vtEducacao,
              "label": "Educação"
            };
          } 
          if (dados[i].Categoria == "compras") {
            vtCompras = vtCompras + dados[i].Valor;
            compras = {
              "id": 10,
              "value": vtCompras,
              "label": "Compras"
            };
          } 
          if (dados[i].Categoria == "assinatura") {
            vtAssinatura = vtAssinatura + dados[i].Valor;
            assinatura = {
              "id": 11,
              "value": vtAssinatura,
              "label": "Assinatura"
            };
          } 
          if (dados[i].Categoria == "alimento") {
            vtAlimento = vtAlimento + dados[i].Valor;
            alimento = {
              "id": 12,
              "value": vtAlimento,
              "label": "Alimentação"
            };
          } 
          if (dados[i].Categoria == "outras_despesas") {
            vtOutrasDespesas = vtOutrasDespesas + dados[i].Valor;
            outras_despesas = {
              "id": 1,
              "value": vtOutrasDespesas,
              "label": "Outras"
            };
          } 
        }
        if (Object.keys(salario).length > 0) arrayDados.push(salario);
        if (Object.keys(emprestimo).length > 0) arrayDados.push(emprestimo);
        if (Object.keys(bonus).length > 0) arrayDados.push(bonus);
        if (Object.keys(rendimento).length > 0) arrayDados.push(rendimento);
        if (Object.keys(dividendos).length > 0) arrayDados.push(dividendos);
        if (Object.keys(venda).length > 0) arrayDados.push(venda);
        if (Object.keys(outras).length > 0) arrayDados.push(outras);
        if (Object.keys(lazer).length > 0) arrayDados.push(lazer);
        if (Object.keys(educacao).length > 0) arrayDados.push(educacao);
        if (Object.keys(outras_despesas).length > 0) arrayDados.push(outras_despesas);
        if (Object.keys(assinatura).length > 0) arrayDados.push(assinatura);
        if (Object.keys(compras).length > 0) arrayDados.push(compras);
        if (Object.keys(alimento).length > 0) arrayDados.push(alimento);
        }
        setDadosGrafico(arrayDados);
      console.log(dadosGrafico);
      })
      .catch(err => {
        console.error(err);
      })
    }, [valueTipo]);

  return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems: 'center'}}>
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
              setDataFim(item.proximo);
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
          data={dadosGrafico}
          x="label"
          y="value"
          innerRadius= {80}
          />
      </View>
      </View>
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
      </View>
    </SafeAreaView>
  );
}