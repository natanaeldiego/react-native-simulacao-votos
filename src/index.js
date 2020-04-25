import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Inicial from './pages';
import Votacao from './pages/votacao';
import Resultado from './pages/resultado';
import Candidatos from './pages/candidatos/candidatos';
import ListaCandidatos from './pages/candidatos';

const StackNavigator = createStackNavigator({
  Inicial: {
    screen: Inicial,
    navigationOptions: ({navigation}) => ({
      headerTransparent: true,
      hideStatusBar: true,
    }),
  },
  Votacao: {
    screen: Votacao,
    navigationOptions: ({navigation}) => ({
      title: 'Votação',
      headerStyle: {
        backgroundColor: '#FF7043',
      },
      headerTintColor: '#fff',
    }),
  },
  Resultado: {
    screen: Resultado,
    navigationOptions: ({navigation}) => ({
      title: 'Resultado',
      headerStyle: {
        backgroundColor: '#FF7043',
      },
      headerTintColor: '#fff',
    }),
  },
  ListaCandidatos: {
    screen: ListaCandidatos,
    navigationOptions: ({navigation}) => ({
      title: 'Candidatos',
      headerStyle: {
        backgroundColor: '#FF7043',
      },
      headerTintColor: '#fff',
    }),
  },
  Candidatos: {
    screen: Candidatos,
    navigationOptions: ({navigation}) => ({
      title: 'Candidato',
      headerStyle: {
        backgroundColor: '#FF7043',
      },
      headerTintColor: '#fff',
    }),
  },
});

export default createAppContainer(StackNavigator);
