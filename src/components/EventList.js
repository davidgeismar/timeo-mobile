
import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList} from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { setCurrentEvent, resetAppInfo, logoutUser } from '../actions';
import Button from './common/Button'
import Footer from './common/Footer'
import Event from './Event'
import Header from './Header'
import * as utilities from '../lib/Utilities';

class EventList extends Component {


  formatDuration(ms){
    let time = new Date(ms);
    let hours = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
    let minutes = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
    let seconds = time.getUTCSeconds() < 10 ? `0${time.getUTCSeconds()}` : time.getUTCSeconds();

    return hours + ":" + minutes + ":" + seconds
  }
  renderEvents(){
    if (this.props.events.length > 0){
      return (
        <FlatList
          data={this.props.events}
          renderItem={({item}) => <Event key={item.id} event={item} onPress={()=> this.props.setCurrentEvent(item.id)}/>}
          style={{flex: 1}}
        />
      )
    }
  }
  renderMonthlyStats(){
    var years = Object.keys(this.props.stats)
    for ( i=0;i < years.length; i++){
      var currentYear = years[i]
      var months = Object.keys(this.props.stats[currentYear])
      for (j=0; j<months.length; j++){
        var currentMonth = months[j]
        return (
          <View style={styles.monthlyStatsLine}>
            <Text>
              {currentYear}{" "}
            </Text>
            <Text>
              {currentMonth}{" "}
            </Text>
            <Text>
               Actions: {this.props.stats[currentYear][currentMonth]["total"]} Total: {this.formatDuration(this.props.stats[currentYear][currentMonth]["duration"])}
            </Text>
          </View>
        )
      }
    }
  }
  render() {
    const {containerStyle, eventsWrapperStyle, footerStyle} = styles
    return (

      <View style={containerStyle}>
        <Header/>
        <ScrollView style={eventsWrapperStyle}>
          {this.renderEvents()}
          <View style={styles.monthlyStatsWrapper}>
            {this.renderMonthlyStats()}
          </View>
        </ScrollView>
        <Footer>
          <View style={styles.footerButtonsWrapper}>
            <Button customStyle={styles.footerButtonStyle} onPress = {() => this.props.resetAppInfo()}>NEW</Button>
            <Button customStyle={styles.footerButtonStyle} onPress={() => this.props.logoutUser()}>SIGN OUT</Button>
          </View>
        </Footer>
      </View>
    )

  }
}

const styles = {
  monthlyStatsWrapper: {
    marginBottom: 150,
    margin: 10,
    flexDirection: 'column'
  },
  monthlyStatsLine: {
    width: '85%',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonStyle: {
    width: 170
  },
  eventsWrapperStyle: {
    marginTop: 50,
    padding: 30,
    flex: 1,
    marginBottom: 40
  }
};

const mapStateToProps = (state) => {
  var groupedByYear = utilities.groupByYear(state.eventsData.events);
  var groupedByMonth = utilities.groupByMonth(groupedByYear)
  var stats = utilities.aggregateDurations(groupedByMonth)
  return { events: state.eventsData.events,
           stats: stats,
           currentEventId: state.eventsData.currentEventId}
        }
export default connect(mapStateToProps, { setCurrentEvent, resetAppInfo, logoutUser })(EventList);
