import Exponent from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class inputText extends React.Component {
  constructor(){
    super();
  }
  //Make this part render a button, full width 
  render() {
// Make this work for buttons, pass in two styles within the touchable opacity with the colour prop 
        return (
        <TouchableOpacity style={styles.button}>
            <Text  style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
        );

  }
}

//Make upload button the consisnt button look that you can parse a button colour & text colour to. 
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ecc71',
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
