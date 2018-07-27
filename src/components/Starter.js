
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Keyboard, Animated  } from 'react-native'
import { connect } from 'react-redux';
import { createEvent, activateTab, stopChrono, setChronoRunning, fetchEvents, updateEvent } from '../actions';
import { Actions } from 'react-native-router-flux';
import Button from './common/Button'
import Footer from './common/Footer'
import Spinner from './common/Spinner';
import Chrono from './assets/Chrono'
import Avatar from './Avatar'
import TabBar from './TabBar'
import ResumeChronoButton from './ResumeChronoButton'
import SelectChronoButton from './SelectChronoButton'
import * as utilities from '../lib/Utilities';

// import * as actions from '../actions';

class Starter extends Component {

  componentWillMount() {
    Keyboard.dismiss();
    if (this.props.isSaved) {
      console.log('in ancestral state')
      this.setState({
        timerValue: this.props.timerValue ? this.props.timerValue : this.state.timerValue
      })
    }
    else if (!this.state){
      this.setState({
        timerValue: 0
      })
    }
  }
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
          source={{uri: this.props.logo_thumb}}
          onPress={() => this.props.fetchEvents()}
          activeOpacity={0.7}
          />
      )
    }
  }

  saveEvent(){
    if (this.props.eventId){
      this.props.updateEvent('duration', this.state.timerValue, this.state.timerValue, 'automatic', this.props.eventId)
    }
    else {
      this.props.createEvent('automatic', this.state.timerValue)
    }
  }
  renderButtons(){
    console.log('render buttons')
    console.log(this.props.isRunning)
    console.log(this.props.onHold)
    if (this.props.isRunning  && !this.props.onHold){
      console.log('in isRunning')
      console.log(this.props)
      return(
        <View style={styles.buttonWrapperStyle}>
          <Button customStyle={styles.basicButtonStyle} onPress={() => this.stopChrono()}>Stop</Button>
        </View>
      )
    }
    else if ((this.props.isOnHold && !this.props.isRunning)){
      console.log('in isonhold')
      console.log(this.props)
      return(
        <View style={styles.chronoButtonsWrapper}>
          <ResumeChronoButton onPress={()=> this.startChrono()}/>
          <SelectChronoButton onPress={()=> this.props.activateTab('time')}/>
          <Button customStyle={styles.saveButtonStyle} onPress={()=>this.saveEvent()}>Save</Button>
        </View>
      )
    }
    else if (!this.props.isRunning && !this.props.isSaved && !this.props.isOnHold){
      console.log('in basic')
      console.log(this.props)
      return(
        <View style={styles.buttonWrapperStyle}>
          <Button customStyle={styles.basicButtonStyle} onPress={() => this.props.activateTab('time')}>ADD</Button>
        </View>

      )
    }
  }

  stopChrono(){
    console.log('in stopChrono')
    console.log(this.timerValue)
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
      timerValue = this.state.timerValue

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
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    else {
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
    backgroundColor: 'white'
  },
  avatarWrapperStyle: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 20
  },
  chronoWrapperStyle: {
    flex: 1,
    marginTop: 120 // height of tabbar
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
  console.log(state.user.user_info)
  const event = state.eventsData.currentEvent
  console.log(state)
  if (event){
    console.log('in event')
    console.log(event)
    if (event.measure_kind == 'automatic'){
      return {
        logo_thumb: state.user.user_info.logo_thumb,
        isChrono: true,
        isSaved: true,
        isOnHold: state.chrono.isOnHold,
        isRunning: state.chrono.isRunning,
        hasRun: state.chrono.hasRun,
        chronoStart: state.chrono.chronoStart,
        timerValue: event.duration,
        eventId: event.id,
        loading: state.loading
      }
    }
    else {
      // should never be here
      console.log('not chrono')
      return {
        logo_thumb: state.user.user_info.logo_thumb,
        isChrono: false,
        loading: state.loading
      }
    }
  }
  else {
    console.log('no currrent event yo')
    console.log(state.user.user_info)
    return {
      logo_thumb: state.user.user_info.logo_thumb,
      hasRun: state.chrono.hasRun,
      isRunning: state.chrono.isRunning,
      isSaved: state.chrono.isSaved,
      chronoValue: state.chrono.chronoValue,
      isOnHold: state.chrono.isOnHold,
      timerValue: state.chrono.timerValue,
      loading: state.loading
    }
  }
}


export default connect(mapStateToProps, { createEvent, activateTab, stopChrono, setChronoRunning, fetchEvents, updateEvent })(Starter);
