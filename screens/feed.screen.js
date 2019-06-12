import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class FeedScreen extends Component {

  componentDidMount () {
    console.log('From feed screen')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Feed Screen</Text>
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
    color: 'blue'
  },
});
