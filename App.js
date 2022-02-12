/**
 * 
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppSwitchNavigator from './src/navigations/AppMainNavigator';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

import store from './src/store/configureStore';



export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
      <AppSwitchNavigator></AppSwitchNavigator>
      </Provider>
    );
  }
}

