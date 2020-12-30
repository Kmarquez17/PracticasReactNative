import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';

//React-navigations
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
        >
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Nosotros" component={Nosotros} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
