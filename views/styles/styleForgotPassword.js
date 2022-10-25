import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleForgotPassword = StyleSheet.create({ 
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.GRAY_900
    },
    textoInput:{
        marginBottom: 18,
        height: 40,
        backgroundColor: COLORS.GRAY_800,
        borderRadius: 4,
        padding: 12,
        color: COLORS.GRAY_100
    },
    botao: {
        backgroundColor: COLORS.PRIMARY_COLOR,
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    }
})

export default styleForgotPassword;