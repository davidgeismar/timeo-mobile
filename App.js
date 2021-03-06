import React from 'react';
import { StyleSheet, Text, View, AsyncStorage} from 'react-native';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Starter from './src/components/Starter';
import Avatar from './src/components/Avatar';
import Button from './src/components/common/Button';
import Chrono from './src/components/assets/Chrono';
import {SET_LOADER, RESET_INFO} from './src/actions/types'
import Router from './src/Router';
import API from './src/actions/Api';
import Spinner from './src/components/common/Spinner';
import { persistor, store } from  './src/store'
import axios from 'axios';
console.disableYellowBox = true

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {ready: false, validToken: false}
  }

  componentWillMount(){
    this.checkStoredTokenValidity()
      .then(resp => this.checkAuthTokenValidity(resp))
      .catch(error => this.authTokenCheckError(error))
      .then(resp => this.authTokenCheckSuccess(resp))
      .catch(err => this.authTokenCheckError(err))
  }

  componentDidMount(){
    if (!this.state.validToken){
      store.dispatch({
        type: RESET_INFO,
        payload: true
      })
    }
  }

  async checkStoredTokenValidity(){
      const data = await AsyncStorage.getItem('persist:root')
      return JSON.parse(data)
  }

  async checkAuthTokenValidity(resp){
   const token = JSON.parse(resp.authentication).token
   const config = {
     method: 'GET',
     url: 'http://staging.obeya.xair.cloud/internal/timeo/api/v0/auth/ping',
     headers: {
       Accept: 'application/json',
       Authorization: 'Bearer ' + token
     }
    }
    const data = await axios(config)
    return await { data: data, token: token }
  }


  authTokenCheckSuccess(resp, token){
      if (resp.data.data.message === 'pong'){
         API.defaults.headers.common['Accept'] = 'application/json'
         API.defaults.headers.common['Authorization'] = 'Bearer ' + resp.token
         this.setState({
           validToken: true
         })
       }
       else {
         API.defaults.headers.common['Accept'] = 'application/json'
         API.defaults.headers.common['Authorization'] = null
         this.setState({
           validToken: false
         })
         // return reject(false)
       }
       this.setState({
         ready: true
       })
    // })
  }

  authTokenCheckError(err){
     API.defaults.headers.common['Accept'] = 'application/json'
     API.defaults.headers.common['Authorization'] = null
     this.setState({
       ready: true,
       validToken: false
     })
  }
  render() {
    if (this.state.ready){
      return (
        <Provider store={store}>
          <PersistGate
            loading={<Spinner />}
            persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      );
    }
    else {
      return <Spinner />
    }
  }
}
