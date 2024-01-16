import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, ScrollView, ScrollViewComponent } from 'react-native';
import { useFonts } from 'expo-font';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config';
import minus from '../../assets/minus.png';
import plus from '../../assets/plus.png';

const { width, height } = Dimensions.get('window');

export default function Burger({ navigation, selectedItems, setSelectedItems }) {
  const [menuData, setMenuData] = useState({});
  const selectedCategory = 'pizza';

  useEffect(() => {
    const menuRef = ref(db, 'menu');

    onValue(menuRef, (snapshot) => {
      if (snapshot.exists()) {
        setMenuData(snapshot.val());
      }
    });
  }, []);

  // Load fonts at the top level of your component
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
    "NanumMyeongjo-Regular": require("../../assets/fonts/NanumMyeongjo-Regular.ttf"),
    "Handjet-Regular": require("../../assets/fonts/Handjet-Regular.ttf"),
  });

  if (!fontsLoaded && fontError) {
    return <Text>Loading...</Text>;
  }

  const handleIncrement = (itemName, itemPrice) => {
    setSelectedItems((prevItems) => {
      const newItem = prevItems[itemName] || { quantity: 0, totalPrice: 0 };
  
      return {
        ...prevItems,
        [itemName]: {
          quantity: newItem.quantity + 1,
          totalPrice: newItem.totalPrice + itemPrice
        },
      };
    });
  };

  const handleDecrement = (itemName, itemPrice) => {
    setSelectedItems((prevItems) => {
      const newItem = prevItems[itemName];
  
      if (newItem && newItem.quantity > 0) {
        return {
          ...prevItems,
          [itemName]: {
            quantity: newItem.quantity - 1,
            totalPrice: newItem.totalPrice - itemPrice
          },
        };
      }
  
      return prevItems;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Check if the selected category exists before rendering */}
      {menuData[selectedCategory] && (
        <View>
          
          <ScrollView>
          {Object.entries(menuData[selectedCategory]).map(([itemId, itemDetails]) => (
            <View key={itemId} style={[styles.reservationButton, styles.menuItem]}>
              <Text style={styles.infoTitle}>{itemDetails.name}</Text>
              <Text style={styles.infoText}>{itemDetails.desc}</Text>
  
              {/* Accessing the quantity and totalPrice from the selectedItems object */}
              <Text style={styles.quantity}>
                {selectedItems[itemDetails.name]?.quantity || 0}
              </Text>
              {/* 
              <Text style={styles.totalPrice}>
                Total Price: {selectedItems[itemDetails.name]?.totalPrice || 0}
              </Text>
              */}
  
              <TouchableOpacity onPress={() => handleIncrement(itemDetails.name, itemDetails.price)} style={styles.plus}>
                <Image source={plus} />
              </TouchableOpacity>
  
              <TouchableOpacity onPress={() => handleDecrement(itemDetails.name, itemDetails.price)} style={{ top: -10, left: 255, width: 10 }}>
                <Image source={minus} />
              </TouchableOpacity>
            </View>
          ))}
          <Text></Text>
          </ScrollView>
          <Text style={styles.itemName}>{selectedCategory}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:2,
    justifyContent: 'flex-start',
    
    alignItems: 'center',

    width: '90%',
    height: '30%',
    top: 420,
    position: 'absolute',


  },
  infoTitle: {
    top: 0,
    zIndex: 100,
    fontFamily: 'Quicksand-Regular',
    fontSize: 11,
    color: 'black',
    letterSpacing: 3,
    left: 50,
  },
  infoText: {
    zIndex: 100,
    fontFamily: 'Handjet-Regular',
    fontSize: 8,
    color: 'black',
    letterSpacing: 3,
    width: 250,
    left: 50,
  },
  plus: {
    position: 'absolute',
    top: 40,
    left: 290,
  },
  quantity: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 9,
    position: 'absolute',
    top: 43,
    left: 283,
  },
  reservationButton: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 9,
    color: 'black',
    letterSpacing: 3,
    textAlignVertical: 'center',
    width: 320,
    height: 65,
    top: 15,
    padding: 3,
    backgroundColor: '#E4E6E0',
    borderRadius: 10,
    marginVertical: 8,
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
  },
  itemName: {
    fontFamily: 'NanumMyeongjo-Regular',
    fontSize: 16,
    top: -40,
    left: 20,
    color: 'black',
    width: 280,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    letterSpacing: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 17,
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
    position: 'absolute',

  },
});
