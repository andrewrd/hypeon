import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default class Input extends Component {
  constructor(){
    super();
  }
  //Poll the nomantim api and input search, then callapi to refresh with these values. Rewrite it with input.

  onSubmitEditing = () => {
  }

  render() {
    const {placeholder, onChangeText, text} = this.props

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={this.onSubmitEditing}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    textAlign: 'center',
    width:375,
    fontSize: 25,
  }
})
