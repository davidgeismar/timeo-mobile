
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux'

// import * as actions from '../actions';

class Task extends Component {

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        canBeActivated={this.props.canBeActivated}
        activationKey={this.props.activationKey}>
        <View style={[styles.containerStyle, this.props.customStyle]}  backgroundColor={this.props.active ? '#8CCDF8' : 'white'}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    borderColor: '#8CCDF8',
    borderWidth: 2,
  },
  textStyle: {
    fontSize: 15,
    alignSelf:'center',
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('in mapstatetoprops Task')
  console.log(ownProps)
  console.log(state)
  let active;
  if (state.tasks.selectedTask){
     if (ownProps.canBeActivated && state.tasks.selectedTask.id == ownProps.activationKey){
       console.log('in active Task')
        active = true
     }
   }
   else {
     active = false
   }
   return { active }
  // return { authorsData: state.authorsData };
};

export default connect(mapStateToProps, actions)(Task);
