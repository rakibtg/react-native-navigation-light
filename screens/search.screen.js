import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class SearchScreen extends Component {

  componentDidMount () {
    console.log('From search screen')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Search Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: 'green'
  },
});
