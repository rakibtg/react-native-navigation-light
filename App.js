import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Text, View, SafeAreaView, 
  Animated, Easing, Dimensions
} from 'react-native'

import FeedScreen from './screens/feed.screen'
import ProfileScreen from './screens/profile.screen'
import SearchScreen from './screens/search.screen'

const screens = {
  'FeedScreen': {
    screen: FeedScreen,
    name: 'My Feed',
  },
  'ProfileScreen': {
    screen: ProfileScreen,
    name: 'Profile',
  },
  'SearchScreen': {
    screen: SearchScreen,
    name: 'Search',
  },
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

if(__DEV__) {
  console.disableYellowBox = true
}

export default class App extends Component {

  state = {
    activeScreen: 'FeedScreen',
    stack: ['FeedScreen'],
    MainPosition: [ 
      {width: screenWidth * 2}, 
      {height: screenHeight}, 
      {marginTop: 0}, 
      {marginLeft: 0}
    ],
    paneDimensions: [
      {width: screenWidth}, 
      {height: screenHeight}
    ],
    animatedLeftMargin: new Animated.Value(0)
  }

  SlidePane = (direction = 'right')=> {
    console.log('di', direction)
    let theLeftMargin;
    if (direction === 'right') {
      theLeftMargin = parseInt('-' + screenWidth);
      Animated.timing(this.state.animatedLeftMargin, {
        toValue: theLeftMargin,
        duration: 300
      }).start()
    }
    this.setState({
      MainPosition: [ {width: screenWidth * 2}, {height: screenHeight}, {marginTop: 0}]
    })
  }

  handleRouteChange (screenName) {
    const { stack } = this.state
    if(this.state.activeScreen !== screenName) {
      this.setState({
        activeScreen: screenName,
        stack: [...stack, screenName]
      }, () => {
        console.log(this.state)
        this.SlidePane()
      })
    }
  }

  handleBackButtonPress () {
    const { stack } = this.state
    stack.pop()
    const lastComponent = stack[stack.length - 1]
    this.setState({
      activeScreen: lastComponent,
      stack,
    }, () => {
      console.log(this.state)
      this.SlidePane()
    })
  }

  headerNav () {
    const { stack, activeScreen } = this.state
    const backButton = () => {
      if(stack.length > 1) {
        return <TouchableOpacity onPress={this.handleBackButtonPress.bind(this)}>
          <Text>⬅</Text>
        </TouchableOpacity>
      }
    }
    const screenName = screens[activeScreen].name
    return <View style={styles.headerNavigation}>
      {backButton()}
      <Text>{screenName}</Text>
    </View>
  }

  bottomNav () {
    return <View style={styles.bottomNavigator}>
      {Object.keys(screens).map(i => {
        const screen = screens[i]
        return <TouchableOpacity
          onPress={this.handleRouteChange.bind(this, i)}
          style={styles.bottomNavigatorItem} key={i}>
          <Text style={{
            ...(i === this.state.activeScreen) && { color: 'blue', fontWeight: 'bold' }
          }}>{screen.name}</Text>
        </TouchableOpacity>
      })}
    </View>
  }

  renderAllScreens () {
    const { activeScreen } = this.state
    return <View style={styles.allScreenWrapper}>
      {Object.keys(screens).map(i => {
        const Screen = screens[i]['screen']
        const zIndex = activeScreen === i ? { zIndex: 1 } : {}
        return <Animated.View 
          style={[this.state.MainPosition, {marginLeft: this.state.animatedLeftMargin}]}
          key={i} style={[styles.singleScreenWrapper, zIndex]}>
          <Screen />
        </Animated.View>
      })}
    </View>
  }

  render() {
    return (
      <SafeAreaView style={styles.rnRouter}>
        {this.headerNav()}
        {this.renderAllScreens()}
        {this.bottomNav()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  rnRouter: {
    flex: 1,
  },
  bottomNavigator: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bottomNavigatorItem: {
    padding: 10
  },
  allScreenWrapper: {
    flex: 1,
    position: 'relative',
  },
  singleScreenWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  headerNavigation: {
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'green',
    position: 'absolute',
    height: '100%',
    width: '100%',
  }

})
