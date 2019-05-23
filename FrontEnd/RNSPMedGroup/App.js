import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';

//Telas
import ListaConsultasPaciente from './scr/pages/ListaConsultasPaciente';
import ListaConsultasMedicos from './scr/pages/ListaConsultasMedicos';
import HomeAdm from './scr/pages/HomeAdm';
import HomePaciente from './scr/pages/HomePaciente';
import HomeMedico from './scr/pages/HomeMedico';
import TelaInicial from './scr/pages/TelaInicial'

//Desabilita Avisos Amarelos
console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const PacienteStack = createBottomTabNavigator(
  {
    'Home - Paciente': HomePaciente,
    'Lista - consultas': ListaConsultasPaciente

  },
  {
    initialRouteName: "Home - Paciente",
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveBackgroundColor: "#83b1fc",
      activeBackgroundColor: "rgb(94, 155, 255)",
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#FFFFFF",
      style: {
        height: 50
      }
    }
  });

const MedicoStack = createBottomTabNavigator(
  {
    'Home - Medico': HomeMedico,
    'Lista Consultas': ListaConsultasMedicos
  },
  {
    initialRouteName: "Home - Medico",
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveBackgroundColor: "#83b1fc",
      activeBackgroundColor: "rgb(94, 155, 255)",
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#FFFFFF",
      style: {
        height: 50
      }
    }
  });

const AdministradorStack = createBottomTabNavigator(
  {
    'Home - Administrador': HomeAdm

  },
  {
    initialRouteName: "Home - Administrador",
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveBackgroundColor: "#83b1fc",
      activeBackgroundColor: "rgb(94, 155, 255)",
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#FFFFFF",
      style: {
        height: 50
      }
    }
  });

const AppSwitchNavigator = createSwitchNavigator({
  'Tela inicial': { screen: TelaInicial },
  'Home - Administrador': { screen: AdministradorStack },
  'Home - Cliente': { screen: MedicoStack },
  'Home - Lojista': { screen: PacienteStack }
})

const AppContainer = createAppContainer(AppSwitchNavigator);




