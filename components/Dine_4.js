import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert, ScrollView} from 'react-native';
import { useFonts, Font } from 'expo-font';
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import cover from '../assets/no_of_people.png';
import contentImage from '../assets/coffee.png';
import s3 from '../assets/s5.png';
import s4 from '../assets/s4.png';
import thumb from '../assets/thumb.png';
import home from '../assets/home.png';
import summary_back from '../assets/D_sum.png';

const { width, height } = Dimensions.get('window');

export default function Dine4 ({ route, navigation }) {
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
      <Image source={s3} style={styles.shape3} resizeMode="contain" />
      <Image source={summary_back} style={styles.shape4} resizeMode="contain" />
      <Image source={thumb} style={styles.thumb} resizeMode="contain" />
      
      <TouchableOpacity 
        style={[ isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Home')}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Image source={home} style={styles.home} resizeMode="contain" />
      </TouchableOpacity>
    
      
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 650,
        letterSpacing: 10
        }}>Dine-in Order</Text>


    <View style={styles.infoscroll}>
          <ScrollView>
          
            {/* Render the selected items data in your Cart screen */}
            {Object.entries(selectedItems).map(([itemId, itemDetails]) => (
              <View key={itemId} style={[styles.reservationButton, isHovered && styles.hover]}>
                <Text  style={{textAlign: "left",fontFamily: 'Quicksand-Regular',fontSize: 11,color: 'black',letterSpacing: 3,top: 5,left:-10}}
                >{itemId}</Text>
                <Text  style={{top: -10,left: 110,fontFamily: 'Quicksand-Regular',fontSize: 11,color: 'black',letterSpacing: 3,}}
                >{itemDetails.quantity}</Text>
                {/* Add more information about the item as needed */}
              </View>
            ))}
            <Text></Text>
          </ScrollView>
        </View>
    <Text style={{fontFamily: 'Quicksand-Bold',
    fontSize: 11,
    color: 'black',
    letterSpacing: 3,
    top: 561,
    left: 90,
    position: 'absolute'}}>{
          Object.values(selectedItems).reduce((acc, { totalPrice }) => acc + totalPrice, 0)
        }</Text>

<Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 550,
        letterSpacing: 2
        }}>Order Summary</Text>

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
        bottom: 145,
        width: 190,
        letterSpacing: 4
        }}>Your order has been confirmed</Text>
      
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
        bottom: 65,
        width: 270,
        letterSpacing: 3
        }}>Your order will be brought to your table in 40 minutes</Text>
    
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
    top: 124,
    left: -10,
    position: 'absolute',
    
  },
  infoText:{
    textAlignVertical: 'center',
    textAlign: "left",
    fontFamily: 'Quicksand-Regular',
    fontSize: 11,
    color: 'black',
    letterSpacing: 3,
    top: 5,
  },
  infoscroll: {
    flex:2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '70%',
    height: '27%',
    top: 302,
    position: 'absolute',
  },
  infoq:{
    top: 410,
    left: 120,
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
    left: 0,
  },
  shape3: {
    position: 'absolute',
    width: 400,
 
  },
  shape4: {
    position: 'absolute',
    left: 35,
    top: 530,
    width: 250,
    bottom: 260,
  },
  thumb: {
    position: 'absolute',
    width: 250,
    bottom: 190,
  },
  home: {
    position: 'absolute',
    width: 30,
    left: -10,
    bottom: -400,
  },
  reservationButton: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 9,
    color: 'black',
    letterSpacing: 3,
    
    textAlignVertical: 'center',
    width: 250,
    height: 25,
    top: 5,
    padding: 5,
    backgroundColor: '#E4E6E0',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6, // Adjusted for layout
  },
  total: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 11,
    color: 'black',
    letterSpacing: 3,
    textAlignVertical: 'center',
    width: 250,
    height: 25,
    top: 40,
    left: 13,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6, // Adjusted for layout
  },

  orderButton: {
    width: 220,
    height: 35,
    bottom: -340,
    padding: 4,
    backgroundColor: '#E4E6E0',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10, // Adjusted for layout
  },

  hover: {
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 2 },
    elevation: 20, // For Android shadow effect
  },
});


