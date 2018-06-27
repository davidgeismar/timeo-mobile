
import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'
import * as actions from '../actions';
import Button from './common/Button'
import Footer from './common/Footer'
import Event from './Event'
import Header from './Header'

class EventList extends Component {

  renderEvents(){
    console.log('in renderEvents')
    console.log(this.props.currentEventId)
    return this.props.events.map(
      event => <Event key={event.id} event={event} onPress={()=> this.props.setCurrentEvent(this.props.currentEventId)}/>
    )
  }
  render() {
    const {containerStyle, eventsWrapperStyle, footerStyle} = styles
    return (

      <View style={containerStyle}>
        <Header/>
        <View style={eventsWrapperStyle}>
          {this.renderEvents()}
        </View>
        <Footer>
          <View style={styles.footerButtonsWrapper}>
            <Button customStyle={styles.footerButtonStyle} onPress = {() => this.props.resetAppInfo()}>NEW</Button>
            <Button customStyle={styles.footerButtonStyle}>SIGN OUT</Button>
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
    width: 180
  },
  avatarWrapperStyle: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 20
  },
  eventsWrapperStyle: {
    marginTop: 50,
    padding: 30,
    width: '100%'
  },
  buttonWrapperStyle: {
    marginBottom: 100,
    width: '100%'

  }
};


const mapStateToProps = (state) => {
  console.log('in mapStateToProps events')
  console.log(state)
  console.log(state.eventsData.currentEventId)
  return { events: state.eventsData.events, currentEventId: state.eventsData.currentEventId}
}
export default connect(mapStateToProps, actions)(EventList);
