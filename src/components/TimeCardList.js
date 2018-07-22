import React, { Component } from 'react';
import { View, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import { activateTab, updateEventDuration, createEvent, updateEvent } from '../actions';
import { Actions } from 'react-native-router-flux';
import TimeCard from './TimeCard';
import Spinner from './common/Spinner';
import Button from './common/Button';
import Footer from './common/Footer';
import TabBar from './TabBar';
import TimeFormatter from 'minutes-seconds-milliseconds';



class TimeCardList extends Component {
  renderHours(){
    var hours = [];
    for (var index = 0; index < 25; index++) {
        const hour = index < 10 ? ('0' + index) : index
        hours.push(
          <TimeCard type='large' key={index + 'hours'} kind='hour' value={index}>{hour}</TimeCard>
        )
     }
     return (
       hours
     )
   }

   renderTimeCard(index) {
     const prefix = index < 10 ? '0' : ''
     if (index%5 == 0) {
       return(
         <TimeCard key={index + 'minutes'} type='large' kind='minute' value={index}>{prefix + index}</TimeCard>
       )
     }
     else {
       return(
         <View style={styles.smallContainer}>
          <TimeCard key={index + 'minutes'} type='small' kind='minute' value={index}>{prefix +index}</TimeCard>
          <TimeCard key={(index + 1) + 'minutes'} type='small' kind='minute' value={index+1}>{prefix +(index + 1)}</TimeCard>
          <TimeCard key={(index + 2)+ 'minutes'} type='small' kind='minute' value={index+2}>{prefix +(index + 2)}</TimeCard>
          <TimeCard key={(index + 3)+ 'minutes'} type='small' kind='minute' value={index+3}>{prefix +(index + 3)}</TimeCard>
         </View>
      )
     }
   }
   renderMinutes(){
     var minutes = [];
     for (var index = 0; index < 60;) {
         minutes.push(
           this.renderTimeCard(index)
         )
         index%5 != 0 ? index = index + 4 : index++;
      }
      return (
        minutes
      )
    }

    generateEventId(){
      return '_' + Math.random().toString(36).substr(2, 9);
    }
    getMillisFromTimeSelection(timeSelection){
      console.log('in getMillisFromTimeSelection')
      console.log(timeSelection)
      let hoursMillis = timeSelection.selectedHour*3600*1000
      let minutesMillis = timeSelection.selectedMinute*60*1000
      return hoursMillis+minutesMillis
    }
    saveEvent(){
      const duration = this.getMillisFromTimeSelection(this.props.timeSelection)
      if (!this.props.eventId){
        console.log('in createEvent')
        this.props.createEvent('manual', duration)
      }
      else {
        console.log('in updateEvent')
        this.props.updateEvent('duration', duration, duration, 'manual', this.props.eventId)
      }
    }
  render() {
    const { containerStyle, buttonWrapperStyle } = styles
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    else {
      return (
        <View style={{flex: 1}}>
          <TabBar/>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flexDirection: 'row', flex: 1}}>
                <ScrollView style={containerStyle}>
                  {this.renderHours()}
                </ScrollView>
                <ScrollView style={containerStyle}>
                  {this.renderMinutes()}
                </ScrollView>
            </View>
            <Footer>
              <View style={buttonWrapperStyle}>
                <Button customStyle={{width: '50%'}} onPress={()=>this.saveEvent()}>
                  Save
                </Button>
              </View>
            </Footer>
          </View>
        </View>
      )
    }
  }
}
const styles = {
  containerStyle: {
    width: '50%',
    flexDirection:'column'
  },
  smallContainer: {
      flexDirection:'row',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10
  },
  buttonWrapperStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}


const mapStateToProps = (state) => {
  const hour = state.selectedDuration.selectedHour
  const minute = state.selectedDuration.selectedMinute
  const timeSelection = {selectedHour: hour, selectedMinute: minute}

  return {
    eventId: state.eventsData.currentEventId,
    loading: state.loading,
    timeSelection: timeSelection
  }
}

export default connect(mapStateToProps, { activateTab, updateEventDuration, createEvent, updateEvent })(TimeCardList);
