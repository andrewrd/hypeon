import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Timeline from './components/timeline';
import HomeScreen from './components/HomeScreen';

import Exponent from 'expo';
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

import Router from './components/router';

class App extends React.Component {
    constructor(){
      super();
      this.state = {
        login: 1,
        loginClick: 0,
      }; 
      this._fbLogin = this._fbLogin.bind(this);
    }

    componentWillMount(){
      if(this.state.login !== 1){
        this._fbLogin();
      }
    }

    async _fbLogin() {
      const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
        '1222558047851704', {
          permissions: ['public_profile'],
        });
      console.log('launched');
      if (type === 'success') {
        this.setState({login: 1});
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert(
          'Logged in!',
          `Hi ${(await response.json()).name}!`,
        );
      }
    }

  render() {
    /**
      * NavigationProvider is only needed at the top level of the app,
      * similar to react-redux's Provider component. It passes down
      * navigation objects and functions through context to children.
      *
      * StackNavigation represents a single stack of screens, you can
      * think of a stack like a stack of playing cards, and each time
      * you add a screen it slides in on top. Stacks can contain
      * other stacks, for example if you have a tab bar, each of the
      * tabs has its own individual stack. This is where the playing
      * card analogy falls apart, but it's still useful when thinking
      * of individual stacks.
      */
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}

AppRegistry.registerComponent('main', () => App);
