import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleTabNavigator = StyleSheet.create({ 
    tabNavigator: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 20,
        height: 70,
        borderWidth: 1,
        borderTopWidth: 1,
        borderColor: 'white',
        backgroundColor: 'black',
    }
})

export default styleTabNavigator;