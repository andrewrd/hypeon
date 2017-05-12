/**
 * If you're using Expo, uncomment the line below to import Exponent
 * BEFORE importing `@expo/ex-navigation`. This sets the status bar
 * offsets properly.
 */
 import Expo from 'expo';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

import AsyncStorage from 'react-native';

import Timeline from './timeline';
import HomeScreen from './HomeScreen';
import imagePicker from './imagePicker';
/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */

export async function logIn() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1222558047851704', {
      permissions: ['public_profile', 'email', 'user_friends'],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch( 
      `https://graph.facebook.com/me?access_token=${token}`);
    let username = await response.json().name
    await console.log(username);
  }
}
const Router = createRouter(() => ({
  home: () => HomeScreen,
  timeline: () => Timeline,
  imagePicker: () => imagePicker,
}));

export default Router;
