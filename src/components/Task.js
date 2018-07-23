
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

// import * as actions from '../actions';

class Task extends Component {


  setBackgroundColor(card_type){
    switch(card_type) {
      case 'task':
        return '#51B8F3'
      case 'support':
        return '#E66C72'
      case 'issue':
        return '#F8C67A'
      case 'improvement':
        return '#9AD5E2'
      case 'ticket_support':
      return '#E66C72'
      }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        canBeActivated={this.props.canBeActivated}
        activationKey={this.props.activationKey}>
        <View style={[styles.containerStyle, this.props.customStyle]}  backgroundColor={this.setBackgroundColor(this.props.card_type)} opacity={this.props.active ? 1 : 0.6}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
  }
};

const mapStateToProps = (state, ownProps) => {
  let active;
  if (state.tasks.selectedTask){
     if (ownProps.canBeActivated && state.tasks.selectedTask.id == ownProps.activationKey){
        active = true
     }
   }
   else {
     active = false
   }
   return { active }
  // return { authorsData: state.authorsData };
};

export default connect(mapStateToProps, null)(Task);
