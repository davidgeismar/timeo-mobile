import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from './common/Button';
import {Actions} from 'react-native-router-flux'
import Close from './assets/Close.js'
import Search from './assets/Search.js'

class SearchBar extends Component {
  componentWillMount(){
    this.setState({
      expanded: false
    })
  }

  updateExpansionStatus(expanded){
    this.setState({expanded: expanded})
    this.props.updateSearchTaskStatus(expanded)
  }

 renderSearchBar(){
   const {containerStyle} = styles
    if (this.state.expanded){
      return(
        <View style={containerStyle}>
          <TouchableOpacity onPress={() => this.updateExpansionStatus(false)} >
            <Close style={{height: 15, width: 15}}/>
          </ TouchableOpacity>
          <TextInput
            style={{height: 40, width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
            placeholder="Search"
          />
        </View>
      )
    }
    else {
      return(
        <TouchableOpacity style={this.props.customStyle} onPress= {() => this.updateExpansionStatus(true)}>
          <Search style={{height: 24, width: 24}}/>
        </TouchableOpacity>
      )
    }
  }
  render() {
    console.log('in SearchBar')
    console.log(this.props)
    return (
      <View style={{flex: 1, alignSelf: 'center'}}>
        { this.renderSearchBar() }
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





export default connect(null, actions)(SearchBar);
