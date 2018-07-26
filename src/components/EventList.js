
import React, { Component } from 'react';
import { View, ScrollView, Text} from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { setCurrentEvent, resetAppInfo, logoutUser } from '../actions';
import Button from './common/Button'
import Footer from './common/Footer'
import Event from './Event'
import Header from './Header'

class EventList extends Component {

  renderEvents(){
    return this.props.events.map(
      event => <Event key={event.id} event={event} onPress={()=> this.props.setCurrentEvent(event.id)}/>
    )
  }

  renderMonthlyStats(){
    return (
      <View style={styles.monthlyStatsWrapper}>
        <View style={styles.monthlyStatsLine}>
          <Text>
          2018
          </Text>
          <Text>
          June
          </Text>
          <Text>
            Actions: 2 Total: 10mn
          </Text>
        </View>
        <View style={styles.monthlyStatsLine}>
          <Text>
          2018
          </Text>
          <Text>
          June
          </Text>
          <Text>
            Actions: 2 Total: 10mn
          </Text>

        </View>
      </View>
    )
  }
  render() {
    const {containerStyle, eventsWrapperStyle, footerStyle} = styles
    return (

      <View style={containerStyle}>
        <Header/>
        <ScrollView style={eventsWrapperStyle}>
          {this.renderEvents()}
          {this.renderMonthlyStats()}
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

// i should create actionBucket like
// {year: {
      // month: {
      //   actionsCount:
      //   total:
      // }
// }}

const mapStateToProps = (state) => {
  console.log('in mapStateToProps eventlist')
  console.log(state.eventsData.events)
  // function createEventsBucket(events){
  //   // group by year
  //   var i = 0, val, groupedByYear = [];
  //   for ( ;i < events.length; i++){
  //     val = new Date(events[i]['created_at']).getFullYear()
  //     // si la date existe je push
  //     if (result[val]){
  //       console.log(index)
  //       console.log(result)
  //       groupedByYear[val].push(events[i])
  //     }
  //     // sinon je cree la clé puis je push
  //     else {
  //       groupedByYear[val] = []
  //       groupedByYear[val].push(events[i])
  //     }
  //   }
  //   var i = 0, val,
  //         groupedByMonth = [];
  //
  //   for ( ;i < groupedByYear.length; i++){
  //     for (j=0, j< groupedByYear[i].length; j++){
  //       val = new Date(groupedByYear[i][j]['created_at'].getFullMonth())
  //       if groupedByYear[i][j]
  //     }
  //   }
  //
  //   console.log('before result')
  //   console.log(result)
  //   return result
  // }


  // createEventsBucket(state.eventsData.events)
  return { events: state.eventsData.events,
           currentEventId: state.eventsData.currentEventId}
        }
export default connect(mapStateToProps, { setCurrentEvent, resetAppInfo, logoutUser })(EventList);
