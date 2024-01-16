import React, { useEffect, useState, useCallback } from 'react';
import { Button, Platform, ScrollView, View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Alert, TextInput } from 'react-native';
import { useFonts, Font } from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../config';
import {ref, set} from 'firebase/database'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Importing assets
import background from '../assets/bg.png';
import logo from '../assets/logo.png';
import detail from '../assets/res_detail.png';
import contentImage from '../assets/coffee.png';
import s2 from '../assets/s3.png';
import s1 from '../assets/s1.png';
import minus from '../assets/minus.png';
import plus from '../assets/plus.png';
import drop from '../assets/drop.png';

const { width, height } = Dimensions.get('window');


export default function Res1 ({navigation}) {
  const [name, setname] = useState('');
  const [contact, setcontact] = useState('');
  const [people, setpeople] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, settime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');
  const [text2, setText2] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    if (mode === 'date') {
      const newDate = new Date(currentDate);
      const formattedDate = newDate.toLocaleDateString(); // Format date as you like
      setDate(newDate);
      setText(formattedDate);
    } else if (mode === 'time') {
      // Create a new Date object combining the date from 'date' state and time from 'selectedDate'
      const newTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
      );
      settime(newTime);
  }
}

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }


  const dataAddon = () =>{
    set (ref(db, 'post/' + name), {
        name: name,
        contact: contact,
        people: people,
        date: date.toLocaleDateString(),
        time: time.toLocaleTimeString(),
    });
    setname ('')
    setcontact ('')
    setpeople ('')
    setDate (new Date())
    settime (new Date())
  }


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
      

      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        top: -220,
        letterSpacing: 10

        }}>RESERVATION</Text>



<View style={styles.infoscroll}>
        <ScrollView Style={styles.contentContainer}>

        <Image source={s1} style={styles.shape} resizeMode="contain" />
      <Image source={detail} style={styles.shape_D} resizeMode="contain" />
      <Text style={{
        fontFamily: 'NanumMyeongjo-Regular',
        fontSize: 16,
        top: 320,
        left: 40,
        color: 'white',
        textAlign: 'center',
        letterSpacing: 2,
        position: 'absolute'
        }}>Reservation details</Text>
      <TextInput
          style={[styles.reservationButton, isHovered && styles.hover]}
          value={name}
          onChangeText={(text) => setname(text)}
          />

      <TextInput
          style={[styles.reservationButton, isHovered && styles.hover]}
          value={contact}
          onChangeText={(text) => setcontact(text)}
          keyboardType="numeric"
          />


        <TouchableOpacity 
      style={[styles.minus, isHovered && styles.hover, { zIndex: 100 }]}
      activeOpacity={0.7}
      onPress={decrementValue}
      // onMouseEnter and onMouseLeave will not work on mobile
        >
      <Text style={{
            fontFamily: 'Quicksand-Regular',
            fontSize: 10,
            color: 'black',
            position: 'absolute',
            
          }}>-</Text>

        </TouchableOpacity>

      <TextInput
          style={[styles.reservationButton, isHovered && styles.hover]}
          value={people}
          onChangeText={(text) => setpeople(text)}
          keyboardType="numeric"
          />
        <View>
        
          <TouchableOpacity onPress={() => showMode('date')}>
              <Text style={styles.reservationButton}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

          
          <TouchableOpacity onPress={() => showMode('time')}>
              <Text style={styles.reservationButton}>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>

  
        </View>
        {show && (
      <DateTimePicker
        testID='dateTimePicker'
        value={mode === 'date' ? date : time} 
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}
      />
    )}
      
      <TouchableOpacity 
        style={[styles.orderButton, isHovered && styles.hover]}
        activeOpacity={0.7}
        onPress={() => {
          dataAddon();
          navigation.navigate('Res2');
        }}
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
      </View>

      
    </SafeAreaView>
    
  );
  
  
}
const styles = StyleSheet.create({
  container: {
 
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoscroll: {
    
    width: '90%',
    height: '100%', 
    top: -400,
    
    
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
    
    top: 450,
    left: 0,
  },
  shape: {
    top:190,
    width: 350,

  },
  shape_D: {
    top:-600,
    left:30,
    width: 280,
    opacity: 0.95,
    
  },
  minus: {
    position: 'absolute',
    top: 400,
    left: 55,
    elevation: 20,
    

  },
  reservationButton: {
    
    fontFamily: 'Quicksand-Bold',
    fontSize: 9,
    color: 'black',
    letterSpacing: 3,
    textAlignVertical: 'center',
    width: 250,
    height: 25,
    padding: 5,
    top: -903,
    left: 45,
    backgroundColor: '#E4E6E0',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16, // Adjusted for layout 
    shadowOpacity: 0.7,
    shadowRadius: 2,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
    
    
  },
  orderButton: {
    width: 220,
    height: 35,
    top: 730,
    left: 65,
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
    position: 'absolute'
  },

  hover: {
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#000', // Added shadow color
    shadowOffset: { width: 0, height: 2 },
    elevation: 20, // For Android shadow effect
  },
});


