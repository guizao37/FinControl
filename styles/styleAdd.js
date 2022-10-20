import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleAdd = StyleSheet.create({ 
    container: {
        flex : 1,
        backgroundColor: COLORS.GRAY_900
    },
    header:{
        alignItems: 'center'
    },
    textHeader:{
        color: COLORS.GRAY_100,
        fontSize: 32,
        fontWeight: '500'
    },
    form:{
        alignItems: 'center'
    },
    input:{
        width: "80%",
        backgroundColor: COLORS.GRAY_800,
        height: 40,
        borderRadius: 4,
        padding: 12,
        color: COLORS.GRAY_100,
        borderWidth: 0
    },
    inputDate:{
        width: "80%",
        backgroundColor: COLORS.GRAY_800,
        height: 40,
        borderRadius: 4,
        padding: 12,
        color: COLORS.GRAY_100
    },
    label:{
        color: COLORS.GRAY_100,
        fontSize: 20,
        margin: 12
    },
    datePicker:{
        height: 300,
        width: "80%",
        backgroundColor: COLORS.GRAY_800
    },
    button:{
        backgroundColor: COLORS.PRIMARY_COLOR,
        height: 40,
        marginTop: 32,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default styleAdd