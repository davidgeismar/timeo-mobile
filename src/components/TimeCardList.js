
import React, { Component } from 'react';
import { View, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux';
import TimeCard from './TimeCard';
import Button from './common/Button';
import Footer from './common/Footer';
import TimeFormatter from 'minutes-seconds-milliseconds';



// import * as actions from '../actions';

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

    saveEvent(){
      if (!this.props.eventId){
        console.log('in createEvent')
        this.props.createEvent('selection', this.props.timeSelection)
      }
      else {
        console.log('in updateEvent')
        this.props.updateEventDuration("selection", this.props.timeSelection, this.props.eventId)
      }
    }
  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1}}>
            <ScrollView style={styles.containerStyle}>
              {this.renderHours()}
            </ScrollView>
            <ScrollView style={styles.containerStyle}>
              {this.renderMinutes()}
            </ScrollView>
        </View>
        <Footer>
          <View style={styles.buttonWrapperStyle}>
            <Button customStyle={{width: '50%'}} onPress={()=>this.saveEvent()}>
              Save
            </Button>
          </View>
        </Footer>
      </View>
    )

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
    timeSelection: timeSelection
  }
}

export default connect(mapStateToProps, actions)(TimeCardList);
