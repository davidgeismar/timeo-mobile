import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import Avatar from './Avatar';
import { Actions } from 'react-native-router-flux'
import Chrono from './assets/Chrono';

// import * as actions from '../actions';

class Tab extends Component {
  onPressTab(){
    if (this.props.forceActivation){
      console.log('in forceActivation')
      return this.props.onPress
    }
    else if (this.props.disabled){
      return null
    }
    else{
      return this.props.onPress
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={this.onPressTab()} activationKey={this.props.activationKey}>
        <View style={{height: '100%', flexDirection: 'row'}} borderBottomWidth= {this.props.active ? 2 : null} borderBottomColor={this.props.active ? 'red' : null}>
          {this.props.children}
        </View>
      </TouchableOpacity>

    )

  }
}


const mapStateToProps = (state, ownProps) => {
  let active;
  let disabled;
  console.log('in mapStateToProps tab')
  console.log(state.tabs.disabledTabs)
  if (state.tabs.disabledTabs.includes(ownProps.activationKey)){
    disabled = true
  }
  else{
    disabled = false
  }
  if (state.tabs.activeTab == ownProps.activationKey){
     active = true
  }
  else {
    active = false
  }
  return { active, disabled}
}

export default connect(mapStateToProps, null)(Tab)
