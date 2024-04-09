import React from 'react';
import Style from './src/Style';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AddClothingScreen from './src/AddClothingScreen'; // AddClothingScreen bileşenini ekledik

// Diğer kodlar...

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
        style={Style.globalBackground
        }>
        {/* AddClothingScreen bileşeni */}
        <AddClothingScreen />
        {/* Diğer kodlar devam ediyor... */}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Diğer kodlar devam ediyor...

export default App;