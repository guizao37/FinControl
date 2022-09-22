import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleDespesa = StyleSheet.create({ 
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
    },
    Button:{
        width:"80%",
        backgroundColor: COLORS.PRIMARY_COLOR,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 15
    },
    textButton:{
        color: 'black',
        fontSize: 20
    },
    dropdownPicker:{
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 20,
        height: 40,
        width: '80%',
        paddingLeft: 10,
        marginTop: 10,
        marginLeft: "10%",
        borderWidth: 0
    }
})

export default styleDespesa;