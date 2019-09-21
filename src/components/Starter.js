
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Keyboard, Animated  } from 'react-native'
import { connect } from 'react-redux';
import { createEvent, activateTab, stopChrono, setChronoRunning, updateEvent, startTimer, stopTimer} from '../actions';
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

  componentDidMount() {
    // le composant est rerendered a interval regulier
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
 }
  renderTabBar(){
    if (this.props.hasRun){
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
          source={{uri: this.props.logo_thumb, initials: this.props.initials}}
          onPress={() => Actions.events()}
          activeOpacity={0.7}
          />
      )
    }
  }

   getElapsedTime(baseTime, startedAt= new Date().getTime(), stoppedAt = new Date().getTime()) {
      if (this.props.eventId && !startedAt) {
         return baseTime;
       }
       else if (!startedAt){
         return 0
       }
       else {
         return stoppedAt - startedAt + baseTime;
      }

    }


  renderButtons(){
    const { baseTime, startedAt, stoppedAt } = this.props;
    const elapsed = this.getElapsedTime(baseTime, startedAt, stoppedAt);
    if (this.props.isRunning  && !this.props.onHold){
      return(
        <View style={styles.buttonWrapperStyle}>
          <Button customStyle={styles.basicButtonStyle} onPress={() => this.props.stopTimer(elapsed)}>Stop</Button>
        </View>
      )
    }
    else if ((this.props.isOnHold && !this.props.isRunning) || (this.props.isSaved)){
      return(
        <View style={styles.chronoButtonsWrapper}>
          <ResumeChronoButton onPress={()=> this.props.startTimer(elapsed)}/>
          <SelectChronoButton onPress={()=> this.props.activateTab('time')}/>
          <Button customStyle={styles.saveButtonStyle} onPress={()=>this.saveEvent()}>Save</Button>
        </View>
      )
    }
    else if (!this.props.isRunning && !this.props.isSaved && !this.props.isOnHold){
      return(
        <View style={styles.buttonWrapperStyle}>
          <Button customStyle={styles.basicButtonStyle} onPress={() => this.props.activateTab('time')}>ADD</Button>
        </View>

      )
    }
  }

  saveEvent(){
    const { baseTime, startedAt, stoppedAt } = this.props;
    const elapsed = this.getElapsedTime(baseTime, startedAt, stoppedAt);
    if (this.props.eventId){
      this.props.updateEvent('duration', elapsed, elapsed, 'automatic', this.props.eventId)
    }
    else {
      this.props.createEvent('automatic', elapsed)
    }
  }

  renderChrono(){
   const { baseTime, startedAt, stoppedAt } = this.props;
   const elapsed = this.getElapsedTime(baseTime, startedAt, stoppedAt);
    if (this.props.isRunning || this.props.isOnHold || (!this.props.isRunning && this.props.isSaved)) {

      return(
        <View style={styles.chronoContainer}>
          <Text style={[styles.hoursStyle, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
            {utilities.spitHours(elapsed)}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.minutesStyle, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              {utilities.spitMinutes(elapsed)}
            </Text>
            <Text style={[{fontSize: 40}, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              MN
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
            <Text style={[styles.secondsStyle, {color: this.props.isRunning ? 'orange' : '#00AFFA'}]}>
              {utilities.spitSeconds(elapsed)}
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
        <TouchableOpacity onPress={()=>this.props.startTimer(0)}>
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
  const event = state.eventsData.currentEvent
  if (event){
    if (event.measure_kind == 'automatic'){
      return {
        logo_thumb: state.user.user_info ? state.user.user_info.logo_thumb : null,
        initials: state.user.user_info ? state.user.user_info.initials : null,
        isChrono: true,
        isSaved: true,
        isOnHold: state.chrono.isOnHold,
        isRunning: state.chrono.isRunning,
        hasRun: state.chrono.hasRun,
        baseTime: state.chrono.baseTime,
        startedAt: state.chrono.startedAt,
        stoppedAt: state.chrono.stoppedAt,
        eventId: event.id,
        loading: state.loading
      }
    }
    else {
      return {
        logo_thumb: state.user.user_info ? state.user.user_info.logo_thumb : null,
        initials: state.user.user_info ? state.user.user_info.initials : null,
        isChrono: false,
        loading: state.loading
      }
    }
  }
  else {
    return {
      logo_thumb: state.user.user_info ? state.user.user_info.logo_thumb : null,
      initials: state.user.user_info ? state.user.user_info.initials : null,
      hasRun: state.chrono.hasRun,
      isRunning: state.chrono.isRunning,
      isSaved: state.chrono.isSaved,
      chronoValue: state.chrono.chronoValue,
      isOnHold: state.chrono.isOnHold,
      timerValue: state.chrono.timerValue,
      loading: state.loading,
      baseTime: state.chrono.baseTime,
      startedAt: state.chrono.startedAt,
      stoppedAt: state.chrono.stoppedAt
    }
  }
}


export default connect(mapStateToProps, { createEvent, activateTab, stopChrono, setChronoRunning, updateEvent, startTimer, stopTimer })(Starter);
