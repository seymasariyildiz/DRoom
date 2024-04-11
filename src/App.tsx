import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gardrop from './Gardrop'; 
import HomeScreen from './HomeScreen';
import AddClothes from './AddClothes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Ana Sayfa"
          component={HomeScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'rgb(255, 253, 208)' },
          }}
        />
        <Stack.Screen
          name="Gardrop"
          component={Gardrop}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'rgb(255, 253, 208)' },
          }}
        />
        <Stack.Screen
          name="AddClothes"
          component={AddClothes}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'rgb(255, 253, 208)' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
