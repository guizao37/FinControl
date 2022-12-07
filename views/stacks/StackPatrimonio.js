import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Patrimonio from '../pages/Patrimonio';
import AddPatrimonio from '../pages/AddPatrimonio';
import Listagem from '../pages/ListagemPatrimonio';
import EditPatrimonio from '../pages/EditPatrimonio';

const Stack = createNativeStackNavigator();

export default function StackPatrimonio() {
  return (
    <Stack.Navigator
      initialRouteName="Patrimonio"
      options={{
        headerShown: true
      }
      }
    >
      <Stack.Screen
        name="Patrimonio"
        component={Patrimonio}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPatrimonio"
        component={AddPatrimonio}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Listagem"
        component={Listagem}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="EditPatrimonio"
        component={EditPatrimonio}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}