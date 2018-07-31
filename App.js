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
    console.log('in componentWillMount')
    this.checkStoredTokenValidity()
      .then(resp => this.checkAuthTokenValidity(resp))
      .catch(error => console.log(error))
      .then(resp => this.authTokenCheckSuccess(resp))
      .catch(err => this.authTokenCheckError(err))
  }

  componentDidMount(){
    console.log('in component did mount app')
    if (!this.state.validToken){
      store.dispatch({
        type: RESET_INFO,
        payload: true
      })
    }
  }

  async checkStoredTokenValidity(){
      const data = await AsyncStorage.getItem('persist:root')
      console.log('checkStoredTokenValidity')
      console.log(data)
      return JSON.parse(data)
  }
  async checkAuthTokenValidity(resp){
   console.log('in checkAuthTokenValidity')
   const token = JSON.parse(resp.authentication).token
   const config = {
     method: 'GET',
     url: 'http://staging.obeya.xair.cloud/internal/timeo/api/v0/auth/ping',
     headers: {
       Accept: 'application/json',
       Authorization: 'Bearer ' + token
     }
    }
    return await axios(config)
  }


  authTokenCheckSuccess(resp, token){
    // return new Promise((resolve, reject) => {
       console.log(resp)
       console.log('authTokenCheckSuccess')
       console.log(resp.data.message)
       if (resp.data.message === 'pong'){
         console.log('token valid')
         API.defaults.headers.common['Accept'] = 'application/json'
         API.defaults.headers.common['Authorization'] = 'Bearer ' + token
         this.setState({
           validToken: true
         })
         // return resolve(true)
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
     console.log('authTokenCheckError')
     console.log(err)
     API.defaults.headers.common['Accept'] = 'application/json'
     API.defaults.headers.common['Authorization'] = null
     this.setState({
       ready: true
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
