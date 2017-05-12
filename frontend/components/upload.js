import Exponent from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class upload extends React.Component {
  constructor(){
    super();
  }
//Refactor the touch opacity to a button component, you can parse a return () prop to 
  render() {

        return (
          <TouchableOpacity onPress={this.props.takePhoto} style={styles.uploadButton} >
            <Text style={styles.uploadText}>Share your journey </Text>
            <Image style={styles.camera}source={require('./camera.png')} />
          </TouchableOpacity>
        );

  }
}

//Make upload button the consistent button look that you can parse a button colour & text colour to. 
const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: '#2ecc71',
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  uploadText: {
    fontSize: 20,
  },
  camera: {
    width: 30,
    height: 30,
  }
});
