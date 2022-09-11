import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Receita from './Receita';
import Finances from './Finances';
import Despesa from './Despesa';

const Stack = createNativeStackNavigator();

export default function StackFinance() {
  return (
    <Stack.Navigator
      initialRouteName="Finances"
      options={{
        headerShown: false
      }
      }
    >
      <Stack.Screen
        name="Finances"
        component={Finances}
        options={{
          title: 'Finanças',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Despesa"
        component={Despesa}
      />
      <Stack.Screen
        name="Receita"
        component={Receita}
      />
    </Stack.Navigator>
  );
}