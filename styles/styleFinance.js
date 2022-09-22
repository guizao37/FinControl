import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleFinance = StyleSheet.create({ 
    container: {
        flex: 1,
        marginTop: '10%',
        width: "100%"
    },
    textoPrincipal: {
        fontWeight: 'bold',
        fontSize: 35
    },
    containerList:{
        marginLeft: '5%',
        marginBottom: '5%',
        width: "90%",
        borderRadius: 10,
        backgroundColor: 'white',
        padding: '1%'
    },
    add: {
        width: 40,
        height: 40,
        position: "absolute"
    },
    touchableOpacity: {
        position: "absolute",
        left:"90%",
        marginTop: '1%'
    },
    extrato: {
        
    },
    textoExtrato: {
        fontSize: 30,
        fontWeight: '500',
    },
    items:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerList:{
        marginLeft: '5%',
        marginBottom: '5%',
        width: "90%",
        borderRadius: 10,
        backgroundColor: 'white',
        padding: "1%"
    }
})

export default styleFinance;