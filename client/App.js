import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import imageHome from './assets/25694.png';
import Api from './Page1';
import Cam from './Page2';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Api} options={{
          drawerIcon: ({ color, size }) => (
            <Image source={imageHome} style={{ width: size, height: size, tintColor: color }} />
          ),
        }} />

        <Drawer.Screen name="To Do List" component={Cam} options={{
          drawerIcon: ({ color, size }) => (
            <Image source={imageHome} style={{ width: size, height: size, tintColor: color }} />
          ),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
