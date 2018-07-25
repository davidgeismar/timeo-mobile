
import React, { Component } from 'react';
import { View, ScrollView} from 'react-native'
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


  render() {
    const {containerStyle, eventsWrapperStyle, footerStyle} = styles
    return (

      <View style={containerStyle}>
        <Header/>
        <ScrollView style={eventsWrapperStyle}>
          {this.renderEvents()}
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
  return { events: state.eventsData.events, currentEventId: state.eventsData.currentEventId}
}
export default connect(mapStateToProps, { setCurrentEvent, resetAppInfo, logoutUser })(EventList);
