
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import Avatar from './Avatar'
// import * as actions from '../actions';

class SmallTaskCard extends Component {

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
    const { task } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} >
        <View style={[styles.containerStyle, this.props.customStyle]}
              backgroundColor={this.setBackgroundColor(task.card_type)}>
          <Avatar
              size="small"
              rounded
              source={{uri: this.props.logo_thumb}}
              activeOpacity={0.7}
              />
          <Text style= {{fontSize: 9, color: 'white'}}>
            {task.client__name} {task.project__name} {"\n"} > {task.subject} {task.reference}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#8CCDF8',
    borderWidth: 2,
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  return {
    task: state.eventsData.currentEventTask
  }
}

export default connect(mapStateToProps, null)(SmallTaskCard);
