import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleRegister = StyleSheet.create({ 
    container: {
        backgroundColor: COLORS.GRAY_900,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoPrincipal:{
        color: COLORS.GRAY_100,
        fontSize: 32,
        fontWeight: 'bold'
    },
    textoInput:{
        marginBottom: 18,
        height: 40,
        backgroundColor: COLORS.GRAY_800,
        borderRadius: 4,
        padding: 12,
        color: COLORS.GRAY_100
    },
    containerRegister:{
        width: "80%"
    },
    botaoRegister: {
        backgroundColor: COLORS.PRIMARY_COLOR,
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    textFormulario:{
        fontSize: 16,
        marginBottom: 8,
        color: COLORS.GRAY_100
    }
})

export default styleRegister;