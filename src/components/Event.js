
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux'
import Timeo from './assets/Timeo'
import Kameo from './assets/Kameo'
import Close from './assets/Close'
import TimeFormatter from 'minutes-seconds-milliseconds'
import * as utilities from '../lib/Utilities';


class Event extends Component {
  // this should be in utility class
  renderIcon(){
    if (this.props.event.task){
      return <Kameo style={styles.svgStyle} fill='red'/>
    }
    else {
        return <Timeo style={styles.svgStyle}/>
    }
  }
  render() {
    // destructuring
    const { creationDate, creationTime, client, action, duration, task, project } = this.props.event;
    const { textWrapperStyle, svgStyle, containerStyle, textStyle } = styles
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={[containerStyle, this.props.customStyle]}>
            <View style={textWrapperStyle}>
              <Text style={[textStyle, {color: '#8CCDF8'}]}>
                {creationDate}{"\n"}
                {creationTime}
              </Text>
            </View>
            <View style={textWrapperStyle}>
              <Text style={textStyle}>
                  {client ? client.name : ''}
              </Text>
            </View>
            <View style={textWrapperStyle}>
              <Text style={textStyle}>
                {project ? project.name : ''}
              </Text>
            </View>
            <View style={textWrapperStyle}>
              <Text style={textStyle}>
                { duration.kind == "chrono" ? TimeFormatter(duration.timerValue) : utilities.formatDuration(duration.selectedHour, duration.selectedMinute) }
              </Text>
            </View>
            <View style={textWrapperStyle}>
              { this.renderIcon() }
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=> Actions.deleteEvent({eventId: this.props.event.id})}>
          <Close style={styles.svgStyle} fill='red'/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderColor: '#8CCDF8',
    borderWidth: 2
  },
  textWrapperStyle: {
    height: '100%',
    borderLeftColor: 'grey',
    borderLeftWidth: 1,
    padding: 5
  },
  textStyle: {
    fontSize: 8,
    alignSelf:'center',
  },
  svgStyle: {
    width: 30,
    height: 30
  }
};



export default connect(null, actions)(Event);
