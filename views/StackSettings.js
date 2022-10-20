import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Ajuda from './Ajuda';
import DadosPessoais from './DadosPessoais';
import AlterarSenha from './AlterarSenha';
import Settings from './Settings';
import { Route, useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function StackFinance({email}) {

  const emailUser = {email};

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      options={{
        headerShown: true
      }}
    >
      <Stack.Screen
        name="Ajustes"
        component={Settings}
        options={{
          headerShown: false,
        }}
        initialParams={emailUser.email}
      />
      <Stack.Screen
        name="Ajuda"
        component={Ajuda}
        options={{
          headerShown: false,
        }}
        initialParams={emailUser}
      />
      <Stack.Screen
        name="Dados"
        component={DadosPessoais}
        options={{
          headerShown: false
        }}
        initialParams={emailUser}
      />
      <Stack.Screen
        name="Senha"
        component={AlterarSenha}
        options={{
          headerShown: false
        }}
        initialParams={emailUser}
      />
    </Stack.Navigator>
  );
}