import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { ref, onValue } from 'firebase/database';
import { db } from '../config'; // Import your Firebase configuration

import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import s1 from '../assets/s1_Copy.png';
import burger from '../assets/burger.png';
import fries from '../assets/fries.png';
import pizza from '../assets/pizza.png';
import ice from '../assets/ice.png';
import sides from '../assets/sides.png';
import drinks from '../assets/drinks.png';

import BurgerContent from './Menu_comp/Burger';
import PizzaContent from './Menu_comp/Pizza';
import DrinksContent from './Menu_comp/Drinks';
import FriesContent from './Menu_comp/Fries';
import IceContent from './Menu_comp/Ice';
import SidesContent from './Menu_comp/Sides';



const { width, height } = Dimensions.get('window');

export default function Menu({navigation}) {
  const handleSectionChange = (section) => {
    if (activeSection === section) {
      // Temporarily set to null or some other value
      setActiveSection(null);
  
      // Set back to the desired section
      setTimeout(() => {
        setActiveSection(section);
      }, 0);
    } else {
      setActiveSection(section);
    }
  };
  
  const [selectedItems, setSelectedItems] = useState({});
  const [fontsLoaded, fontError] = useFonts({
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'NanumMyeongjo-Regular': require('../assets/fonts/NanumMyeongjo-Regular.ttf'),
  });

  const [menuData, setMenuData] = useState({});
  const [activeSection, setActiveSection] = useState('burger');

  useEffect(() => {
    const menuRef = ref(db, 'menu');
    onValue(menuRef, (snapshot) => {
      if (snapshot.exists()) {
        setMenuData(snapshot.val());
      }
    });
  }, []); // Fetch menu data only once on mount

  if (!fontsLoaded && fontError) {
    return <Text>Loading...</Text>;
  }
  const [isHovered, setIsHovered] = useState(false);
  const renderContent = () => {
    switch (activeSection) {
      case 'burger':
        return (
          <BurgerContent
            menuData={menuData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
      case 'pizza':
        return (
          <PizzaContent
            menuData={menuData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
      case 'fries':
          return (
            <FriesContent
              menuData={menuData}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          );
      case 'drinks':
        return (
          <DrinksContent
            menuData={menuData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
        case 'ice':
        return (
          <IceContent
            menuData={menuData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
        case 'sides':
        return (
          <SidesContent
            menuData={menuData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={background} style={styles.backgroundImage} />
      <Image source={logo} style={styles.overlayImage} />
      <Image source={s1} style={styles.shape} resizeMode="contain" />
      
      <TouchableOpacity onPress={() => handleSectionChange('burger')}>
        <Image source={burger} style={styles.shape_D} resizeMode="contain" />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSectionChange('pizza')}>
        <Image source={pizza} style={[styles.shape_D, {left: -150}]} resizeMode="contain" />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSectionChange('drinks')}>
        <Image source={drinks} style={[styles.shape_D, {left: -100}]} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSectionChange('ice')}>
        <Image source={ice} style={[styles.shape_D, {left: -50}]} resizeMode="contain" />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSectionChange('fries')}>
        <Image source={fries} style={[styles.shape_D, {left: 0}]} resizeMode="contain" />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSectionChange('sides')}>
        <Image source={sides} style={[styles.shape_D, {left: 50}]} resizeMode="contain" />
        </TouchableOpacity>
      
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        bottom: 660,
        letterSpacing: 10
        }}>MENU</Text>
      
     
      {renderContent()}
     

      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Cart', {selectedItems})}
        // onMouseEnter and onMouseLeave will not work on mobile
      >
        <Text style={{
          fontFamily: 'Quicksand-Regular',
          fontSize: 14,
          color: 'black',
          letterSpacing: 3
        }}>View Order</Text>
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
  scrollContainer: {
    width: 320,
    height: 65,
    top: 200,
    padding: 3,
    borderColor: 'black', // Border color
    borderRadius: 100, // Border radius
    flex: 1, // Make the scrollable section take up the available space
    width: '100%', // Ensure the scrollable section takes the full width
  },
  menuContainer: {
    padding: 16, // Add padding to the scrollable content
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
    width: 370,
    opacity: 0.95,
    bottom: -43,
  },
  shape_D: {
    position: 'absolute',
    top:-130,
    width: 55,
    
    left:100,
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
    height: 65,
    top: 200,
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
    top:380,
    color: 'black',
    width: 280, 
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    letterSpacing: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
    top: 750,
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
    position: 'absolute',

  },
  cancle: {
    width: 220,
    height: 30,
    top: 710,
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
    position: 'absolute',
  },

  hover: {
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 2 },
    elevation: 20, // For Android shadow effect
  },
});


