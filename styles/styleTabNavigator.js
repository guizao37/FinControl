import { StyleSheet } from "react-native"
import * as COLORS from './cores.json';

const styleTabNavigator = StyleSheet.create({ 
    tabNavigator: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 15,
        height: 65,
        borderTopWidth: 0,
        backgroundColor: 'black',
    }
})

export default styleTabNavigator;