
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { setEventToDelete } from '../actions';
import {Actions} from 'react-native-router-flux'
import Timeo from './assets/Timeo'
import Kameo from './assets/Kameo'
import Close from './assets/Close'
import TimeFormatter from 'minutes-seconds-milliseconds'
import * as utilities from '../lib/Utilities';


class Event extends Component {
  // this should be in utility class
  spitDate(date){
    const ts = new Date (date)
    return ts.toLocaleDateString()
  }
  spitTime(date){
    const ts = new Date (date)
    return ts.toLocaleTimeString()
  }
  formatDuration(ms){
    let time = new Date(ms);
    let hours = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
    let minutes = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
    let seconds = time.getUTCSeconds() < 10 ? `0${time.getUTCSeconds()}` : time.getUTCSeconds();
    return hours + ":" + minutes + ":" + seconds
  }
  renderIcon(){
    if (this.props.event.card_id){
      return <Kameo style={styles.svgStyle} fill='red'/>
    }
    else {
        return <Timeo style={styles.svgStyle}/>
    }
  }
  render() {
    // destructuring
    const event = this.props.event
    const { created_at, creationTime, client__name, action, duration, kanban__name, project__name } = this.props.event;
    const { textWrapperStyle, svgStyle, containerStyle, textStyle } = styles
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={[containerStyle, this.props.customStyle]}>
            <View style={textWrapperStyle}>
              <Text style={[textStyle, {color: '#8CCDF8'}]}>
                {this.spitDate(created_at)}{"\n"}
                {this.spitTime(created_at)}
              </Text>
            </View>
            <View style={textWrapperStyle}>
              <Text style={textStyle}>
                  {client__name ? client__name : ''}
              </Text>
            </View>
            <View style={textWrapperStyle}>
              <Text style={textStyle}>
                {project__name ? project__name : ''}
              </Text>
            </View>
            <View style={textWrapperStyle}>
              <Text style={textStyle}>
                { this.formatDuration(duration)  }
              </Text>
            </View>
            <View style={textWrapperStyle}>
              { this.renderIcon() }
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=> this.props.setEventToDelete(event)}>
          <Close style={styles.svgStyle} fill='red'/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: '85%',
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



export default connect(null, { setEventToDelete })(Event);
