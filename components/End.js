import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useFonts, Font } from 'expo-font';
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import thumb from '../assets/thumb.png';
import contentImage from '../assets/coffee.png';
import s2 from '../assets/s2.png';

const { width, height } = Dimensions.get('window');

export default function End ({navigation}) {
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
      <Image source={thumb} style={styles.thumb} resizeMode="contain" />
      
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 200,
        width:600,
        letterSpacing: 8
        }}>Reservation Summary</Text>
      
      <Text style={{
        fontFamily: 'Quicksand-Regular',
        fontSize: 10,
        flex: 1,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 75,
        width: 190,
        letterSpacing: 4
        }}>Your Reservation has been confirmed</Text>

        <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Home')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={[styles.reservationButton, isHovered && styles.hover]} >
      Please come on your selected time</Text> 
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
  thumb: {
    position: 'absolute',
    width: 250,
    bottom: 110,
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
    fontFamily: 'Quicksand-Bold',
    fontSize: 9,
    color: 'black',
    letterSpacing: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 270,
    height: 30,
    top:374,
    padding: 3,
    backgroundColor: '#E4E6E0',
    borderRadius: 100,
    marginVertical: 17, // Adjusted for layout
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


