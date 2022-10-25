import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleSettings = StyleSheet.create({ 
    container: {
        flex : 1,
        backgroundColor: COLORS.GRAY_900
    },
    headerText:{
        color: COLORS.GRAY_100,
        fontSize: 28
    },
    greetings:{
        color: COLORS.GRAY_100,
        fontSize: 32,
        fontWeight: 'bold',
    },
    buttons:{
        marginTop: 10
    },
    textButtons:{
        color: COLORS.GRAY_100,
        fontSize: 24
    },
    textSmall:{
        fontSize: 16,
        color: COLORS.GRAY_400
    }
})

export default styleSettings