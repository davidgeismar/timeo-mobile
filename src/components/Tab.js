import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import Avatar from './Avatar';
import { Actions } from 'react-native-router-flux'
import Chrono from './assets/Chrono';

// import * as actions from '../actions';

class Tab extends Component {

  render() {
    return (

      <TouchableOpacity onPress={this.props.disabled ? null : this.props.onPress} activationKey={this.props.activationKey}>
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

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
