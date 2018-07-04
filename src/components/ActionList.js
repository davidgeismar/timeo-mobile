
import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import {updateEventAction} from '../actions';
import {Actions} from 'react-native-router-flux'
import LinkCard from './LinkCard'



// import * as actions from '../actions';

class ActionList extends Component {
//  will need to make dynamic
  render() {
    const {currentEventId} = this.props
    const {containerStyle, cardStyle} = styles
    return (
      <View style={containerStyle}>
        <LinkCard onPress={()=>this.props.updateEventAction('call', currentEventId)} canBeActivated={true} activationKey='call' customStyle={cardStyle}>Call</LinkCard>
        <LinkCard onPress={()=>this.props.updateEventAction('email', currentEventId)} canBeActivated={true} activationKey='email' customStyle={cardStyle}>Email</LinkCard>
        <LinkCard onPress={()=>this.props.updateEventAction('meeting', currentEventId)} canBeActivated={true} activationKey='meeting' customStyle={cardStyle}>Meeting</LinkCard>
        <LinkCard onPress={()=>this.props.updateEventAction('video conf', currentEventId)} canBeActivated={true} activationKey='video conf' customStyle={cardStyle}>Video Conf</LinkCard>
      </View>
    )

  }
}
const styles = {
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardStyle: {
    width: '40%',
    padding: 20,
    backgroundColor: 'white'
  }
}

const mapStateToProps = state => {
  console.log('in mapstatetoprops ActionList')
  console.log(state.selectedAction)
  return { selectedAction: state.selectedAction, currentEventId: state.eventsData.currentEventId };
};

export default connect(mapStateToProps, {updateEventAction})(ActionList);
