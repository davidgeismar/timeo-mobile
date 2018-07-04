
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux';
import { createEvent, activateTab, stopChrono, setChronoRunning } from '../actions';
import { Actions } from 'react-native-router-flux';
import Button from './common/Button'
import Footer from './common/Footer'
import Chrono from './assets/Chrono'
import Avatar from './Avatar'
import TabBar from './TabBar'
import ResumeChronoButton from './ResumeChronoButton'
import SelectChronoButton from './SelectChronoButton'
import * as utilities from '../lib/Utilities';
// import * as actions from '../actions';

class Starter extends Component {

  renderTabBar(){
    if (this.props.hasRun){
      console.log('rendering tabbar')
      return (
        <TabBar />
      )
    }
  }
  renderAvatar(){
    if (!this.props.isRunning && !this.props.hasRun){
      return(
        <Avatar
          size="small"
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => Actions.events()}
          activeOpacity={0.7}
          />
      )
    }
  }
  renderButtons(){
    if (this.props.isRunning && !this.props.isSaved && !this.props.onHold){
      console.log('in isRunning')
      return(
        <View style={styles.buttonWrapperStyle}>
          <Button customStyle={styles.basicButtonStyle} onPress={() => this.stopChrono()}>Stop</Button>
        </View>
      )
    }
    else if (this.props.isOnHold && !this.props.isRunning && !this.props.isSaved ){
      console.log('in isonhold')
      return(
        <View style={styles.chronoButtonsWrapper}>
          <ResumeChronoButton onPress={()=>this.startChrono()}/>
          <SelectChronoButton onPress={()=>Actions.time()}/>
          <Button customStyle={styles.saveButtonStyle} onPress={()=>this.props.createEvent('chrono', this.state.timerValue)}>Save</Button>
        </View>
      )
    }
    else if (!this.props.isRunning && !this.props.isSaved && !this.props.isOnHold){
      console.log('in basic')
      return(
        <View style={styles.buttonWrapperStyle}>
          <Button customStyle={styles.basicButtonStyle} onPress={() => this.props.activateTab('time')}>Add</Button>
        </View>

      )
    }
  }

  stopChrono(){
    clearInterval(this.timerValue);
    this.props.stopChrono(this.state.timerValue)
    // this.props.stopChrono()
  }



  startChrono(){
    this.props.setChronoRunning()
    console.log('in startchrono')
    console.log(this.props.timerValue)
    this.setState({
      startDate: new Date()
    });

    // console.log(this.state.startDate)
    this.timerValue = setInterval(() => {
                      this.setState({
                        timerValue: new Date() - this.state.startDate + this.props.timerValue
                      })
                    }, 30);

    // },30);
  }
  renderChrono(){

    if (this.props.isRunning || this.props.isOnHold || (!this.props.isRunning && this.props.isSaved)) {
      console.log('in renderChrono')
      console.log(this.state)
      let timerValue
      if (this.state) {
        timerValue = this.state.timerValue ? this.state.timerValue : 0
      }
      else {
        timerValue = 0
      }
      return(
        <View style={styles.chronoContainer}>
          <Text style={[styles.hoursStyle, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
            {utilities.spitHours(timerValue)}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.minutesStyle, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              {utilities.spitMinutes(timerValue)}
            </Text>
            <Text style={[{fontSize: 40}, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              MN
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
            <Text style={[styles.secondsStyle, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              {utilities.spitSeconds(timerValue)}
            </Text>
            <Text style={[{fontSize: 20}, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              SEC
            </Text>
          </View>
        </View>
      )
    }
    else {
      return (
        <TouchableOpacity onPress={()=>this.startChrono()}>
          <Chrono style={styles.svgStyle} fill="#00AFFA"/>
        </TouchableOpacity>
      )
    }

  }
  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderTabBar()}
        <View style={styles.avatarWrapperStyle}>
          {this.renderAvatar()}
        </View>
        <View style={styles.chronoWrapperStyle}>
          {this.renderChrono()}
        </View>
        <Footer>
          {this.renderButtons()}
        </Footer>
      </View>
    )
  }
}

const styles = {
  chronoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  },
  hoursStyle: {
    alignSelf: 'flex-start',
    fontSize: 40,
    color: 'orange'
  },
  minutesStyle: {
    fontSize: 130,
    color: 'orange'
  },
  secondsStyle: {
    fontSize: 40,
    color: 'orange',
    alignSelf: 'flex-end'
  },
  basicButtonStyle: {
    width: 200
  },
  saveButtonStyle: {
    width: 120
  },
  chronoButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarWrapperStyle: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 20
  },
  chronoWrapperStyle: {
    flex: 1,
    marginTop: 60 // height of tabbar
  },
  svgStyle: {
    height: 180,
    width: 180
  },
  buttonWrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  console.log('in mapStateToProps starter')
  console.log(state)
  const event = state.eventsData.events.find(event => event.id == state.eventsData.currentEventId)
  if (event){
    console.log('in event')
    if (event.duration.kind == 'chrono'){
      return {
        isChrono: true,
        isSaved: true,
        isRunning: event.duration.isRunning,
        hasRun: event.duration.hasRun,
        chronoStart: event.duration.chronoStart,
        timerValue: event.duration.timerValue,
        eventId: event.id
      }
    }
    else {
      console.log('not chrono')
      return {
        isChrono: false
      }
    }
  }
  else {
    console.log('no currrent event yo')
    console.log(state)
    return {
      hasRun: state.chrono.hasRun,
      isRunning: state.chrono.isRunning,
      isSaved: state.chrono.isSaved,
      chronoValue: state.chrono.chronoValue,
      isOnHold: state.chrono.isOnHold,
      timerValue: state.chrono.timerValue
    }
  }
}


export default connect(mapStateToProps, { createEvent, activateTab, stopChrono, setChronoRunning })(Starter);
