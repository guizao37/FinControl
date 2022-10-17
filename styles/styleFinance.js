import { StyleSheet } from "react-native"
import { colors, withTheme } from "react-native-elements";
import * as COLORS from './cores.json';

const styleFinance = StyleSheet.create({ 
    container:{
        flex: 1,
        backgroundColor: COLORS.GRAY_900,
    },
    header:{
        alignItems: 'center',
        top: 42,
        flex: 1
    }, 
    headerText: {
        fontSize: 24,
        color: COLORS.GRAY_100,
        fontWeight: 'bold'
    },
    containerSaldo:{
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 40
    },
    dataText:{
        fontSize: 28,
        color: COLORS.GRAY_100
    },
    containerReceitas:{
        height: 40,
        margin: 20
    },
    containerDespesas:{
        height: 40,
        margin: 20
    },
    containerDados:{
        backgroundColor: COLORS.GRAY_800,
        borderRadius: 16,
        flex: 6,
        
    },
    containerEntradas:{
        justifyContent: "space-between",
        flexDirection: "row"
    },
    valorReceita:{
        fontSize: 24,
        color: '#71FF4B',
        marginTop: 4
    },
    valorDespesa:{
        fontSize: 24,
        color: "#FF4B4B",
        marginTop: 4
    },
    valorSaldo:{
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold'
    },
    textoSecundario:{
        fontSize: 20,
        color: COLORS.GRAY_100
    },
    viewExtrato:{
        flex: 1,
        marginTop: 20,
        backgroundColor: 'rgb(31, 41, 55)',
        borderRadius: 16,
        alignItems: 'center'
    },
    textExtrato:{
        fontSize: 28,
        color: COLORS.GRAY_100,
        fontWeight: 'bold',
        margin: 12
    }
})

export default styleFinance;