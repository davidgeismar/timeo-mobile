import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Starter from './src/components/Starter';
import Avatar from './src/components/Avatar';
import Button from './src/components/common/Button';
import Chrono from './src/components/assets/Chrono';
import Router from './src/Router';
import store from  './src/store'
console.disableYellowBox = true

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
// });
