import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';

export default class App extends React.Component {

  constructor (props) {
    super(props);
    let screenWidth = Dimensions.get('window').width,
        screenHeight = Dimensions.get('window').height;
    this.state = {
      MainPosition: [ {width: screenWidth * 2}, {height: screenHeight}, {marginTop: 0}, {marginLeft: 0}],
      paneDimensions: [ {width: screenWidth}, {height: screenHeight}]
    }
  }
  componentWillMount() {
    this.animatedLeftMargin = new Animated.Value(0)
  }
  SlidePane =(direction)=> {
    let screenHeight = Dimensions.get('window').height,
        screenWidth = Dimensions.get('window').width,
        theLeftMargin;
    if (direction === 'right') {
      theLeftMargin = parseInt('-' + screenWidth);
      Animated.timing(this.animatedLeftMargin, {
        toValue: theLeftMargin,
        duration: 300
      }).start()
    }
    this.setState({
      MainPosition: [ {width: screenWidth * 2}, {height: screenHeight}, {marginTop: 0}]
    })
  }

  render() {
    return (
       <SafeAreaView>
        <Animated.View style={[this.state.MainPosition, {marginLeft: this.animatedLeftMargin}]}>
          <StatusBar hidden />
          <View style={this.state.paneDimensions}>
            <View>
              <TouchableOpacity onPress={() => this.SlidePane('right')}>
                  <Text>Slide Right</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={this.state.paneDimensions}>
            <Text>Right Pane</Text>
          </View>
        </Animated.View>
        </SafeAreaView>
    ); // end return
  } // end render
} // end export