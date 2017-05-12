import Exponent from 'expo';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, Dimensions } from 'react-native'

export default class card extends React.Component {

  constructor(){
    super();
  }

  render() {
    return (
        <View style={styles.card}>
            <View style={styles.user}>
               <View style={styles.centerer}>
                 <Image style={styles.profile} source={require('./img.jpg')} />
                </View>
                <View style={styles.centerer}>
                  <Text style={styles.cardText}>Posted by {this.props.name}</Text>
                </View>
            </View>
            <Text style={styles.cardSub}>{this.props.message}</Text>
            <Image style={styles.image} source={{uri: this.props.image}} />
        </View>
    );
  }
}
var deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  cardText: {
    marginTop: 15,
    margin: 10,
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardSub: {
    textAlign:'left',
    fontSize: 15,
  },
  image: {
    marginTop: 10,
    width: deviceWidth - 30,
    height: deviceWidth - 30,
    alignItems: 'stretch',
    borderRadius: 5,
  },
  user: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
    borderColor: 'black'
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  centerer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
