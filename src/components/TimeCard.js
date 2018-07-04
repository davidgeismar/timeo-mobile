
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import { selectEventDuration } from '../actions';
import {Actions} from 'react-native-router-flux'

// import * as actions from '../actions';

class TimeCard extends Component {

  render() {
    const { containerStyle, textStyle, smallContainerStyle, smallTextStyle} = styles
    if (this.props.type == 'large') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectEventDuration({kind: this.props.kind, value: this.props.value})}>
          <View style={containerStyle} backgroundColor={this.props.active ? '#8CCDF8' : 'white'}>
            <Text style={[textStyle, {color: this.props.active ? 'white' : '#8CCDF8'}]}>
              {this.props.children}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    else if (this.props.type == 'small') {
      return (
        <TouchableWithoutFeedback onPress={() => this.props.selectEventDuration({kind: this.props.kind, value: this.props.value})}>
          <View style={smallContainerStyle} backgroundColor={this.props.active ? '#8CCDF8' : 'white'}>
            <Text style={[smallTextStyle, {color: this.props.active ? 'white' : '#8CCDF8'}]}>
              {this.props.children}
            </Text>
          </View>
        </TouchableWithoutFeedback>

      )
    }
  }
}

const styles = {
  smallContainerStyle: {
    flex: 1,
    borderColor: '#00AFFA',
    borderWidth: 2,
    margin: 5
  },
  containerStyle: {
    width: '90%',
    height: 150,
    margin: 10,
    borderColor: '#00AFFA',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 50,
    alignSelf:'center',
  },
  smallTextStyle: {
    fontSize: 15,
    alignSelf:'center',
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('in mapStateToProps TimeCard')
   if ((state.selectedDuration.selectedHour == ownProps.value && ownProps.kind == 'hour') || (state.selectedDuration.selectedMinute == ownProps.value && ownProps.kind == 'minute')){
      active = true
   }
   else {
     active = false
   }

   return { active, currentEventId: state.eventsData.currentEventId }
};

export default connect(mapStateToProps, { selectEventDuration })(TimeCard);
