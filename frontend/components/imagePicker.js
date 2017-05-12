import React from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Exponent, {
  Constants,
  ImagePicker,
  registerRootComponent,
} from 'expo';
import Input from './input';
import Router from './router';

export default class imagePicker extends React.Component {
  constructor(){
    super();
    this.createPost = this.createPost.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.placeholderImage = this.placeholderImage.bind(this);
    this._goToTimeline = this._goToTimeline.bind(this);
    this.state = {
      image: null,
      uploading: false,
      message: "woop woop",
      username: 'Andrew',
    }
    console.log(this.state.message);
  }

  _goToTimeline = () => {
    this.props.navigator.push(Router.getRoute('timeline'));
  }

  placeholderImage() {
    if (this.state.image == null) {
      return <Text style={styles.timelineText}>Share your journey.</Text>;
    }
    else {
      return null;
    }
  }

  onChangeText = (message) => {this.setState({message})}
  //This posts the username to the server along with message and image url. Change the state to pull the actual facebook name.
  createPost(){
    if(this.state.image !== null && this.state.message !== null){
      console.log('got through');
      this.props.navigator.push(Router.getRoute('timeline'));
      //post the image, message to the server as well as a randomised username
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:3000/createpost?message=${this.state.message}&image=${this.state.image}&username=${this.state.username}`);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            console.log(JSON.parse(xhr.responseText));
            console.log("uploaded");
          }
        }
      };
      xhr.send();
    } else {
      alert("You have not completed all the fields!")
    }
  }

  setMessage(message){
    this.setState({message});
  }
  render() {
    let { image } = this.state;

    return (
      <View style={styles.timeline}>
      <View style={styles.header}>
      <Text style={styles.timelineText}>Destination</Text>
      <Input onChangeText={this.onChangeText} message={this.setMessage} placeholder="Enter your message here"/>
      </View>    
      <View style={styles.content}>    
          <View style={styles.aligner}>
          { this._maybeRenderImage() }
          { this.placeholderImage() }
          </View>
          { this._maybeRenderUploadingOverlay() }

      <View>
          <View style={styles.spanner}>
            <TouchableOpacity onPress={this._pickImage} style={styles.uploadButton}>
                <Image style={styles.camera} source={require('./gallery.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._takePhoto} style={styles.uploadButton}>
                <Image style={styles.camera} source={require('./camera.png')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
              <Text onPress={this.createPost} style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}]}>
          <ActivityIndicator
            color="#fff"
            animating
            size="large"
          />
        </View>
      );
    }
  }

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
          <Image source={{uri: image}} style={styles.image}/>
    );
  }

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  }

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  }

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    });
    this._handleImagePicked(pickerResult);
  }

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      this.setState({uploading: true});

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({image: uploadResult.location});
      }
    } catch(e) {
      console.log({uploadResponse});
      console.log({uploadResult});
      console.log({e});
      console.log('flsdo;kl');
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({uploading: false});
    }
  }
}


//I need to secure this with the 
async function uploadImageAsync(uri) {
  let apiUrl = 'http://localhost:3000/uploadphoto';
  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}
var deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start'
  },
  content: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
  },
  timeline: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2c3e50',
    alignItems: 'stretch',
    padding:5,
  },
  timelineText: {
    marginTop:20,
    marginBottom:0,
    fontSize: 15,
    textAlign:'center',
    color:'white',
  },
  textStyle: {
    fontSize: 20, 
    marginBottom: 20, 
    textAlign: 'center', 
    marginHorizontal: 15,
    color:'white',
  },
  footer: {
    marginTop: 10,
    textAlign:'center',
    fontSize: 10,
    color: 'white',
  },
  image: {
    width: deviceWidth - 30,
    height: deviceWidth - 30,
    alignItems: 'stretch',
  },
  camera: {
    width: 30,
    height: 30,
  },
  aligner: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  spanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});