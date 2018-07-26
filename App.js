import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Starter from './src/components/Starter';
import Avatar from './src/components/Avatar';
import Button from './src/components/common/Button';
import Chrono from './src/components/assets/Chrono';
import Router from './src/Router';
import API from './src/actions/Api';

import { persistor, store } from  './src/store'
console.disableYellowBox = true

export default class App extends React.Component {
  componentDidMount(){
    console.log('in app componentDidmount')

  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
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
