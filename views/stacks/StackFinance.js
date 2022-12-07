import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Finances from '../pages/Finances';
import Adicionar from '../pages/Adicionar';
import ListagemFinancas from '../pages/ListagemFinancas';
import EditFinancas from '../pages/EditFinancas';

const Stack = createNativeStackNavigator();

export default function StackFinance() {
  return (
    <Stack.Navigator
      initialRouteName="Finances"
      options={{
        headerShown: true
      }
      }
    >
      <Stack.Screen
        name="Finances"
        component={Finances}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
      name="Adicionar"
      component={Adicionar}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Listagem"
      component={ListagemFinancas}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Edit"
      component={EditFinancas}
      options={{
        headerShown: false
      }}
    />
    </Stack.Navigator>
  );
}