import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from './common/Button';
import {Actions} from 'react-native-router-flux'
import Close from './assets/Close.js'


// import * as actions from '../actions';

class SearchBar extends Component {
  render() {
    console.log('in SearchBar')
    console.log(this.props)
    const {containerStyle} = styles
    return (
        <View style={containerStyle}>
          <TouchableOpacity onPress={this.props.closeAction} >
            <Close style={{height: 15, width: 15}}/>
          </ TouchableOpacity>
          <TextInput
            style={{height: 40, width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
            placeholder="Search"
          />
        </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};





export default SearchBar;
