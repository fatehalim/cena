import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useFonts, Font } from 'expo-font';

// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';

import contentImage from '../assets/coffee.png';
import s2 from '../assets/s2.png';

const { width, height } = Dimensions.get('window');

export default function Dine1 ({navigation}) {
  // Load fonts at the top level of your component
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "NanumMyeongjo-Regular": require("../assets/fonts/NanumMyeongjo-Regular.ttf"),
  });
  if (!fontsLoaded && fontError) {
    return <Text>Loading...</Text>;
  }
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    Alert.alert('Button Pressed!');
  };


  return (
    <SafeAreaView style={styles.container}>
      <Image source={background} style={styles.backgroundImage} />
      <Image source={logo} style={styles.overlayImage} />
      <Image source={contentImage} style={styles.overlayImage} />
      <Image source={s2} style={styles.shape} />
      
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 200,
        letterSpacing: 10
        }}>Dine-in Order</Text>
      
      <TouchableOpacity 
        style={[styles.reservationButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={handlePress}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 10,
          color: 'black',
          letterSpacing: 2
        }}>QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Dine2')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 10,
          color: 'black',
          letterSpacing: 2
        }}>Table Number</Text>
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
  shape: {
    position: 'absolute',
    top: 670,
  },
  reservationButton: {
    width: 250,
    height: 30,
    bottom: -340,
    padding: 5,
    backgroundColor: '#E4E6E0',
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
    bottom: -340,
    padding: 5,
    backgroundColor: '#E4E6E0',
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

  hover: {
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 2 },
    elevation: 20, // For Android shadow effect
  },
});


