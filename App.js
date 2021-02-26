import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/home.js';
import MapsScreen from './pages/maps.js';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Selecione' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={MapsScreen} 
          options={{ title: 'Selecione no mapa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;