import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets'

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

if(__DEV__) {
  console.disableYellowBox = true
}

export default class App extends Component {

  state = {
    activeScreen: 'FeedScreen',
    stack: ['FeedScreen']
  }

  handleRouteChange (screenName) {
    const { stack } = this.state
    if(this.state.activeScreen !== screenName) {
      this.setState({
        activeScreen: screenName,
        stack: [...stack, screenName]
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
    })
  }

  headerNav () {
    const { stack, activeScreen } = this.state
    const backButton = () => {
      if(stack.length > 1) {
        return <TouchableOpacity onPress={this.handleBackButtonPress.bind(this)}>
        <Image
          style={styles.icons}
          source={require('./assets/icons/back.png')}
        />
        </TouchableOpacity>
      }
    }
    const screenName = screens[activeScreen].name
    return <View style={[styles.headerNavigation, {paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop}]}>
      <View style={styles.headerLeft}>
        {backButton()}
      </View>
      <View style={styles.headerBody}>
        <Text style={styles.headerLabel}>{screenName}</Text>
      </View>
      <View  style={styles.headerRight}>

      </View>
    </View>
  }

  bottomNav () {
    return <View style={[styles.bottomNavigator, {paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom}]}>
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
        const zIndex = activeScreen !== i ? { display: 'none' } : {}
        return <View key={i} style={[styles.singleScreenWrapper, zIndex]}>
          <Screen />
        </View>
      })}
    </View>
  }

  render() {
    return (
      <View style={[styles.rnRouter, {
        paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
        paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft,
        paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight,
      }]}>
        {this.headerNav()}
        {this.renderAllScreens()}
        {this.bottomNav()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rnRouter: {
    flex: 1,
  },
  bottomNavigator: {
    borderTopWidth: 1,
    borderColor: '#eaf1f8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#eaf1f8',
    // height: 85,
  },
  icons: {
    width: 20,
    height: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  headerLeft: {
    // borderWidth: 1,
    flex: 0,
    justifyContent: 'center',
  },
  headerBody: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  headerRight: {
    // borderWidth: 1,
    flex: 0,
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    paddingVertical: 10,
  }
})
