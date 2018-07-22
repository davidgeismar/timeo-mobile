
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

// import * as actions from '../actions';

class LinkCard extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} canBeActivated={this.props.canBeActivated} activationKey={this.props.activationKey}>
        <View style={[styles.containerStyle, this.props.customStyle]}  backgroundColor={this.props.active ? '#8CCDF8' : 'white'}>
          <Text style={[styles.textStyle, this.props.customTextStyle, {color: this.props.active ? 'white' : 'black'}]}>
            {this.props.children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    borderColor: '#8CCDF8',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15,
    color: 'black',
    alignSelf:'center',
  }
};

const isActiveClient = (ownProps, event) => {
  return (ownProps.canBeActivated && event.client_id == ownProps.activationKey)
}
const isActiveProject = (ownProps, event) => {
  return (ownProps.canBeActivated && event.project_id == ownProps.activationKey)
}

const isActiveKanban = (ownProps, event) => {
  return (ownProps.canBeActivated && event.kanban_id == ownProps.activationKey)
}

const mapStateToProps = (state, ownProps) => {
  console.log('in mapstatetoprops LinkCard')
  console.log(ownProps)
  console.log(state)
  const event = state.eventsData.events.find(event => event.id == state.eventsData.currentEventId)
  console.log(event)
  let active;
    if (event) {
       if (isActiveClient(ownProps, event) || isActiveProject(ownProps, event) || isActiveKanban(ownProps, event)){
         console.log('in active LinkCard')
          active = true
       }
       else {
         active = false
       }
    }
    else {
      active = false
    }
   return { active }
};

export default connect(mapStateToProps, null)(LinkCard);
