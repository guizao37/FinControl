import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Receita from './Receita';
import Finances from './Finances';
import Despesa from './Despesa';
import Adicionar from './Adicionar';

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
        name="Despesa"
        component={Despesa}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Receita"
        component={Receita}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
      name="Adicionar"
      component={Adicionar}
      options={{
        headerShown: false
      }}
    />
    </Stack.Navigator>
  );
}