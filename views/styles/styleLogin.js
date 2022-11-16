import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleLogin = StyleSheet.create({ 
    container: {
        backgroundColor: COLORS.GRAY_900,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoPrincipal: {
        fontWeight: "bold",
        fontSize: 32,
        color: "#e1e1e6",
        marginBottom: 8
    },
    containerLogin:{
        width: "80%"
    },
    textoInput:{
        marginBottom: 20,
        height: 40,
        backgroundColor: COLORS.GRAY_800,
        borderRadius: 4,
        padding: 12,
        color: COLORS.GRAY_100
    },
    textFormulario:{
        fontSize: 16,
        marginBottom: 12,
        color: COLORS.GRAY_100
    },
    resetPassword:{
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "5%",
        
    },
    botaoLogin: {
        backgroundColor: COLORS.PRIMARY_COLOR,
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    }
})

export default styleLogin;