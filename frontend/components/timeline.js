import Exponent from 'expo';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import Card from './card';
import Upload from './upload';
import Router from './router';

export default class timeline extends React.Component {

  constructor(){
    super();
    this.takePhoto = this.takePhoto.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      name: "Loading",
      image: null,
      message: "Loading",
      response: null,
      loading: true,
    }
  }
  /* 
      <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{rowData}</Text>} />
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = { dataSource: ds.cloneWithRows(['row 1', 'row 2']), };
  */
  takePhoto(){
    this.props.navigator.push(Router.getRoute('imagePicker'));
  }
  componentWillMount(){
    this.getPosts();
  }
  getPosts(){
    fetch('http://localhost:3000/getposts')
     .then(function(response) { 
      return response.json() 
    })
     .catch((error) => console.warn("fetch error:", error))
     .then((response) => {

      this.setState({
        name: response.firstName,
        image: response.image,
        message: response.message,
      });
      if(this.state.image !== null){
      this.setState({loading: false});
      console.log(this.state.name);
      }
    });
  }

  render() {
    return this.state.loading === true ? 
        <View style={styles.timeline}>
            <Text style={styles.timelineText}>Destination</Text>
            <Text style={styles.timelineText}>Loading..</Text>
        </View> : (
        <View style={styles.timeline}>
            <Text style={styles.timelineText}>Destination</Text>
            <Upload takePhoto={this.takePhoto}/>
            <Card name={this.state.name} message={this.state.message} image={this.state.image}/>
            <Text style={styles.footer}> An app by andrewrd.com </Text> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  timeline: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#2c3e50',
    alignItems: 'stretch',
    padding:5,
  },
  timelineText: {
    marginTop:20,
    marginBottom:0,
    fontSize: 20,
    textAlign:'center',
    color: 'white',

  },
  footer: {
    marginTop: 10,
    textAlign:'center',
    fontSize: 10,
    color: 'white',
  },
});
