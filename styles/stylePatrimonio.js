import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const stylePatrimonio = StyleSheet.create({ 
    container: {
        flex : 1,
        backgroundColor: COLORS.GRAY_900
    }, 
    header:{
        alignItems: 'center',
    },
    textHeader:{
        color: COLORS.GRAY_100,
        fontSize: 32,
        fontWeight: 'bold'
    }
})

export default stylePatrimonio