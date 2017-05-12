import Exponent from 'expo';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default class login extends React.Component {

  constructor(){
    super();
    this.fbStart = this.fbStart.bind(this);
  }

  fbStart(){

  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}style={styles.login} >
        <Text style={styles.loginText}>Log in with Facebook</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: '#3b5998',
    padding: 17,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginText: {
    fontSize: 20,
    color: 'white'
  },
});
