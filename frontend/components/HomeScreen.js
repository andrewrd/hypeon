import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import Login from './login';
import Router from './router';
import Expo from 'expo';

export default class HomeScreen extends React.Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  constructor(){
    super();
    this.state = {
      authed: false,
    }
    this.logIn = this.logIn.bind(this);
  }
  static route = {
  }

  _goToTimeline = () => {
    this.props.navigator.push(Router.getRoute('timeline'));
  }

 async logIn() {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1222558047851704', {
      permissions: ['public_profile', 'email', ],
    });
  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    this.setState({authed: true});
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`);
  /*  Alert.alert(
      'Logged in!',
      //Put in localstorage the name + email + profile pic image so each post shows their name.
   //   `Hi ${(await response.json()).name}!`,
    ); */
  }
}
  render() {
    //trigger go to timeline if authed = true, keep it as true until cookie exp
     return this.state.authed === false ?

          <View style={styles.container}>
              <View style={styles.box}> 
                              <Text style={styles.titleText}>Destination</Text>
              <Image style={styles.image} source={{uri: 'https://s3-us-west-1.amazonaws.com/hypeon/dream.png'}} />
              </View>
              <View>
                <Text style={styles.title}>Share your journey to a global community.</Text>
              </View>
              <Login onPress={this.logIn}/>
          </View>

    : ( <View style={styles.container}>
              <View>
              { this._goToTimeline() }
                <Text style={styles.title}>Thanks for logging in.</Text>

              </View>
          </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  titleText: {
    fontSize: 40,
    textAlign:'center',
    color: 'black',
    fontWeight: '200' 
  },
  title: {
    textAlign:'center',
    fontSize: 15,
    color: 'black',
    paddingBottom: 30,
    fontWeight: '200' 
  },
  image: {
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 20,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});