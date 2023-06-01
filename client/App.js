import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image } from 'react-native';
import imageHome from './assets/25694.png';
import Api from './Page1';
import Cam from './Page2';
import Cal from './Page3';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Fetch" component={Api} options={{
          drawerIcon: ({ color, size }) => (
            <Image source={imageHome} style={{ width: size, height: size, tintColor: color }} />
          ),
        }} />

        <Drawer.Screen name="Camera" component={Cam} options={{
          drawerIcon: ({ color, size }) => (
            <Image source={imageHome} style={{ width: size, height: size, tintColor: color }} />
          ),
        }} />

        <Drawer.Screen name="Calendar" component={Cal} options={{
          drawerIcon: ({ color, size }) => (
            <Image source={imageHome} style={{ width: size, height: size, tintColor: color }} />
          ),
        }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
