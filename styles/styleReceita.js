import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleReceita = StyleSheet.create({ 
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textoInput:{
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 20,
        height: 40,
        width: '80%',
        paddingLeft: 10
    },
    textValor: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20
    }
})

export default styleReceita;