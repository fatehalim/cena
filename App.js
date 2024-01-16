
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Font } from 'expo-font';
import Home from './components/Home';
import Dine1 from './components/Dine_1';
import Dine2 from './components/Dine_2';
import Dine3 from './components/Dine_3';
import Dine4 from './components/Dine_4';
import Res1 from './components/Res_1';
import Res2 from './components/Res_2';
import End from './components/End';
import Menu from './components/Menu';
import Cart from './components/Cart';

import Navigator from "./routes/homeStack";


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
    "NanumMyeongjo-Regular": require("./assets/fonts/NanumMyeongjo-Regular.ttf"),
  });
  if (!fontsLoaded && fontError) {
    return <Text>Loading...</Text>;
  }
  return ( 
      <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
