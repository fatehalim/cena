import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFonts, Font } from 'expo-font';
import { db } from '../config';
import {ref, onValue, get, exists} from 'firebase/database'
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import cover from '../assets/no_of_people.png';
import contentImage from '../assets/coffee.png';
import s2 from '../assets/s1.png';

const { width, height } = Dimensions.get('window');

export default function Dine2 ({navigation}) {
  const [tableNumber, setTableNumber] = useState('');

  const handleVerification = () => {
    // Perform a check if the entered table number exists in the database
    const tableRef = ref(db, `tables/${tableNumber}`);
    
    onValue(tableRef, (snapshot) => {
      const tableData = snapshot.val();
      if (tableData && tableData === 'N') {
        // Table number exists and is not occupied, navigate to the next page
        navigation.navigate('Menu');
      } else {
        // Table number doesn't exist or is not available, show an error message
        Alert.alert('Error', 'Table is either occupied or does not exist. Please try another table.');
      }
    }, {
      onlyOnce: true // This ensures the listener is called only once and not left open
    });
  };

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
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', }}>
        <Text style={{
          fontFamily: 'NanumMyeongjo-Regular',
          fontSize: 25,
          color: 'black',
          textAlign: 'center',
          textAlignVertical: 'center',
          position: 'absolute',
          bottom: -200,
          
          letterSpacing: 10
          }}>Dine-in Order</Text>
      </View>

      <View style={styles.infoscroll}>
      <KeyboardAvoidingView >
          <ScrollView Style={styles.contentContainer}>
            <Image source={s2} style={styles.shape} />
            <Image source={cover} style={{position: 'absolute',left: 28,top: 500,width: 325, height: 55,shadowOpacity: 0.7}} />
            <TextInput
                style={[styles.reservationButton, isHovered && styles.hover]}
                activeOpacity={0.7}
                value={tableNumber}
                onChangeText={(text) => setTableNumber(text)}
                keyboardType="numeric"
                />

            <TouchableOpacity 
              style={[styles.orderButton, isHovered && styles.hover]}
              activeOpacity={0.7}
              onPress= {handleVerification}
              // onMouseEnter and onMouseLeave will not work on mobile
            >
              <Text style={{
                fontFamily: 'Quicksand-Regular',
                fontSize: 14,
                color: 'black',
                letterSpacing: 3
              }}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
          </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoscroll: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%', 
    top: 210,
    left: 0,
    position: 'absolute',
    
  },
  contentContainer: {
    
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    
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
    left:-6,
    top:460,
  },
  reservationButton: {
    width: 300,
    height: 30,
    bottom: 417,
    left: 39,
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
    elevation: 2, 
  },
  orderButton: {
    width: 220,
    height: 35,
    bottom: 417,
    left: 79,
    padding: 4,
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


