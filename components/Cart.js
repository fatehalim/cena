import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert, TextInput, ScrollView } from 'react-native';
import { useFonts, Font } from 'expo-font';
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import total from '../assets/D_sum.png';
import s1 from '../assets/s1_Copy.png';
import minus from '../assets/minus.png';
import plus from '../assets/plus.png';




const { width, height } = Dimensions.get('window');

export default function Cart ({ route, navigation }) {
  const { selectedItems } = route.params;
  // Now you can use the selectedItems data in your Cart component
  console.log(selectedItems);
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

  const calculateTotalPrice = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, itemDetails]) => {
      return total + (itemDetails.quantity * itemDetails.price);
    }, 0);
  };

  const [totalPrice, setTotalPrice] = React.useState(calculateTotalPrice());


  return (
    <SafeAreaView style={styles.container}>
      <Image source={background} style={styles.backgroundImage} />
      <Image source={logo} style={styles.overlayImage} />
      <Image source={s1} style={styles.shape} resizeMode="contain" />
      <Image source={total} style={styles.shape_t} resizeMode="contain" />
      
      
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 660,
        letterSpacing: 10
        }}>Order Details</Text>

    <Text style={styles.itemName}>Order Summary</Text>
      

      
    <View style={styles.infoscroll}>
      <ScrollView>
      
        {/* Render the selected items data in your Cart screen */}
        {Object.entries(selectedItems).map(([itemId, itemDetails]) => (
          <View key={itemId} style={[styles.reservationButton, isHovered && styles.hover]}>
            <Text  style={[styles.infoText, isHovered && styles.hover]}
            >{itemId}</Text>
            <Text  style={[styles.infoq, isHovered && styles.hover]}
            >{itemDetails.quantity}</Text>
            {/* Add more information about the item as needed */}
          </View>
        ))}
        <Text></Text>
      </ScrollView>
    </View>
<Text style={[styles.total, isHovered && styles.hover]}>{
      Object.values(selectedItems).reduce((acc, { totalPrice }) => acc + totalPrice, 0)
    }</Text>

      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Dine4', {selectedItems})}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 14,
          color: 'black',
          letterSpacing: 3
        }}>Submit Order</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={[styles.cancle, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Home')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 14,
          color: 'white',
          letterSpacing: 3
        }}>Cancle</Text>
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
  infoscroll: {
    flex:2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: '30%',
    top: 335,
    position: 'absolute',
    
  },
  total: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 11,
    color: 'black',
    letterSpacing: 3,
    textAlignVertical: 'center',
    width: 250,
    height: 25,
    top: 624,
    left: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6, // Adjusted for layout
    position: 'absolute',

  },
  infoText:{
    fontFamily: 'Quicksand-Regular',
    fontSize: 11,
    color: 'black',
    letterSpacing: 3,
  },
  infoq:{
    top: -15,
    left: 290,
    fontFamily: 'Quicksand-Regular',
    fontSize: 11,
    color: 'black',
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
    width: 370,
    opacity: 0.95,
    bottom: -43,
  },
  shape_t: {
    position: 'absolute',
    width: 300,
    opacity: 0.95,
    bottom: 160,
    left: -20,
  },
  shape_D: {
    position: 'absolute',
    top:295,
    width: 150,
    left:-17,
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
    fontSize: 9,
    color: 'black',
    letterSpacing: 3,
    textAlignVertical: 'center',
    width: 320,
    height: 25,
    top: 25,
    padding: 3,
    backgroundColor: '#E4E6E0',
    borderRadius: 10,
    marginVertical: 8, // Adjusted for layout
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 1 },
    elevation: 5, 
  },

  itemName: {
    fontFamily: 'NanumMyeongjo-Regular',
    fontSize: 16,
    top:300,
    color: 'white',
    width: 280, 
    height: 35,
    textAlign: 'left',
    textAlignVertical: 'center',
    position: 'absolute',
    letterSpacing: 3,
  },

  orderButton: {
    width: 220,
    height: 30,
    top: 340,
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
  cancle: {
    width: 220,
    height: 30,
    top: 340,
    color: "white",
    backgroundColor: '#EA1717',
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


