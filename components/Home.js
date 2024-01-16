import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts} from 'expo-font';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import nameImage from '../assets/name.png';
import contentImage from '../assets/coffee.png';

const { width, height } = Dimensions.get('window');


export default function  Home ({ navigation }) {
  // Load fonts at the top level of your component
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "NanumMyeongjo-Regular": require("../assets/fonts/NanumMyeongjo-Regular.ttf"),
    "CinzelDecorative-Regular": require("../assets/fonts/CinzelDecorative-Regular.ttf"),
  });
  if (!fontsLoaded && fontError) {
    return <Text>Loading...</Text>;
  }
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed!');
  };

  if (!fontsLoaded && fontError) {
    return null;
  } 
  return (
    <SafeAreaView style={styles.container}>
      <Image source={background} style={styles.backgroundImage} />
      <Image source={logo} style={styles.overlayImage} />
      
      <Image source={contentImage} style={styles.overlayImage} />

      <Text style={{
        fontFamily: 'CinzelDecorative-Regular',
        fontSize: 40,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 200,
        
        }}>CENA</Text>

      <TouchableOpacity 
        style={[styles.reservationButton, isHovered && styles.hover]}
        activeOpacity={1}
        onPress={() => navigation.navigate('Res1')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={styles.buttonText}>Reservation</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={1}
        onPress={() => navigation.navigate('Dine1')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={styles.buttonText}>Dine-in Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: width,
    height: 900,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlayImage: {
    width: width,
    height: height,
    position: 'absolute',
    top: 10,
    left: 3,
    
  },
  reservationButton: {
    width: 250,
    height: 30,
    bottom: -300,
    padding: 5,
    backgroundColor: '#4F5B38',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjusted for layout
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 1 },
    elevation: 5, 
    
  },
  orderButton: {
    width: 250,
    height: 30,
    bottom: -300,
    padding: 5,
    backgroundColor: '#4F5B38',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjusted for layout
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 1 },
    elevation: 5, 
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'Quicksand-R',
    letterSpacing: 3

  },
  hover: {
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 2 },
    elevation: 20, // For Android shadow effect
  },
});


