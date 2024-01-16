import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import Dine1 from '../components/Dine_1';
import Dine2 from '../components/Dine_2';
import Dine3 from '../components/Dine_3';
import Dine4 from '../components/Dine_4';
import Res1 from '../components/Res_1';
import Res2 from '../components/Res_2';
import End from '../components/End';
import Menu from '../components/Menu';
import Cart from '../components/Cart';
import Burger from '../components/Menu_comp/Burger';
import Drinks from '../components/Menu_comp/Drinks';
import Fries from '../components/Menu_comp/Fries';
import Ice from '../components/Menu_comp/Ice';
import Pizza from '../components/Menu_comp/Pizza';
import Sides from '../components/Menu_comp/Sides';



const Stack = createStackNavigator();

const MyStack = ()  => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerMode: 'float', // Set to 'float' to allow overlay
                headerTransparent: true, // Make the header transparent
              }}
            >
                <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                />
                <Stack.Screen 
                name="Dine1" 
                component={Dine1} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Dine2" 
                component={Dine2} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Dine3" 
                component={Dine3} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Dine4" 
                component={Dine4} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Res1" 
                component={Res1} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Res2" 
                component={Res2} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                />
                <Stack.Screen 
                name="Menu" 
                component={Menu} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Burger" 
                component={Burger} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Drinks" 
                component={Drinks} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Fries" 
                component={Fries} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Ice" 
                component={Ice} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Pizza" 
                component={Pizza} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Sides" 
                component={Sides} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="Cart" 
                component={Cart} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                /><Stack.Screen 
                name="End" 
                component={End} 
                options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: 'transparent', 
                    },
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }

export default MyStack;

