import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleWelcome = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY_COLOR
    },
    containerTexto: {
        flex: 3,
        backgroundColor: COLORS.PRIMARY_COLOR,
        marginTop: '10%',
        width:"100%",
        padding: "5%"
    },
    textoPrincipal: {
        fontWeight: "bold",
        fontSize: 45,
    },
    containerBotoes:{
        flex: 1,
        backgroundColor: 'white',
        width: "100%",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botoes: {
        borderRadius: 15,
        backgroundColor: COLORS.PRIMARY_COLOR,
        margin: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%"
    },
    textoBotoes:{
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default styleWelcome;