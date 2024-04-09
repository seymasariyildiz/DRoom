import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gardrop from './Gardrop'; 
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Ana Sayfa"
          component={HomeScreen}
          options={{
            headerShown: false, // Başlık çubuğunu gizlemek için
            cardStyle: { backgroundColor: 'rgb(255, 253, 208)' }, // Ana ekranın arka plan rengi
          }}
        />
        <Stack.Screen
          name="Gardrop"
          component={Gardrop}
          options={{
            headerShown: false, // Başlık çubuğunu gizlemek için
            cardStyle: { backgroundColor: 'rgb(255, 253, 208)' }, // Gardrop ekranın arka plan rengi
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
