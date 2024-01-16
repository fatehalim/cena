import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert, TextInput } from 'react-native';
import { useFonts, Font } from 'expo-font';
import { db } from '../config';
import {ref, onValue} from 'firebase/database'
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import detail from '../assets/res_sum.png';
import contentImage from '../assets/coffee.png';
import s2 from '../assets/s3.png';
import s1 from '../assets/s5.png';
import minus from '../assets/minus.png';
import plus from '../assets/plus.png';
import drop from '../assets/drop.png';


const { width, height } = Dimensions.get('window');

export default function Res1 ({navigation}) {
  const [todoData, setTodoData] = useState([])

  useEffect (() => {
    const startCountRef = ref(db, 'post/')
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      console.log(newPosts);
      setTodoData(newPosts);
    });
  }, [])

  
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
  const [value, setValue] = useState(0);

  const incrementValue = () => {
    setValue(value + 1);
  };

  const decrementValue = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>


      <Image source={background} style={styles.backgroundImage} />
      <Image source={logo} style={styles.overlayImage} />
      <Image source={s1} style={styles.shape} resizeMode="contain" />
      <Image source={detail} style={styles.shape_D} resizeMode="contain" />

      
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 650,
        letterSpacing: 10
        }}>RESERVATION</Text>

<Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 16,
        top:260,
        left: 90,
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        letterSpacing: 2
        }}>Reservation Summary</Text>
      
      {
  todoData.length > 0 && (
    <View>
      <Text style={[styles.reservationButton, isHovered && styles.hover]}>
        {todoData[todoData.length - 1].name}
      </Text>

      <Text style={[styles.reservationButton, isHovered && styles.hover]}>
        {todoData[todoData.length - 1].contact}
      </Text>

      <Text style={[styles.reservationButton, isHovered && styles.hover]}>
        {todoData[todoData.length - 1].people}
      </Text>

      <Text style={[styles.reservationButton, isHovered && styles.hover]}>
        {todoData[todoData.length - 1].date}
      </Text>

      <Text style={[styles.reservationButton, isHovered && styles.hover]}>
        {todoData[todoData.length - 1].time}
      </Text>

      <Text style={[styles.reservationButton, isHovered && styles.hover]}>
        ADD RS ID PLEASE
      </Text>
    </View>
  )
}

      


      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Menu')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 14,
          color: 'black',
          letterSpacing: 3
        }}>Continue</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('End')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 14,
          color: 'black',
          letterSpacing: 3
        }}>Finish</Text>
      </TouchableOpacity>
      

      <Text style={{
          top: 710,
          left: 30,
          fontFamily: 'Quicksand-Regular',
          fontSize: 9,
          color: 'white',
          letterSpacing: 3,
          position: 'absolute',

        }}>Place an order beforehand ?</Text>


    </SafeAreaView>
  );
  
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText:{
    
    fontFamily: 'Quicksand-Regular',
    fontSize: 11,
    color: 'red',
    letterSpacing: 3,
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
    width: 390,
    opacity: 0.95,
    bottom: -43,
  },
  shape_D: {
    position: 'absolute',
    top:295,
    width: 244,
    opacity: 0.95,
  },
  minus: {
    position: 'absolute',
    top: 400,
    left: 55,
    elevation: 20,
    zIndex: 100

  },
  reservationButton: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 8,
    color: 'black',
    letterSpacing: 3,
    textAlignVertical: 'center',
    width: 220,
    height: 25,
    top:104,
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
    width: 220,
    height: 30,
    top: 190,
    backgroundColor: '#E4E6E0',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8, // Adjusted for layout
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


