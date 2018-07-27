
import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import {updateEvent} from '../actions';
import {Actions} from 'react-native-router-flux'
import LinkCard from './LinkCard'



// import * as actions from '../actions';

class ActionList extends Component {
//  will need to make dynamic
  renderActionKinds(){
    const {cardStyle} = styles
    return this.props.actionKinds.map(
      actionKind => <LinkCard onPress={()=>this.props.updateEvent('kind_id', actionKind.id, this.props.duration, this.props.measureKind, this.props.currentEventId)} canBeActivated={true} activationKey={actionKind.name} customStyle={cardStyle}>{actionKind.name}</LinkCard>
    )

  }
  render() {
    const {currentEventId} = this.props
    const {containerStyle} = styles
    return (
      <View style={containerStyle}>
        {this.renderActionKinds()}
      </View>
    )

  }
}
const styles = {
  containerStyle: {
    paddingTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardStyle: {
    width: '40%',
    padding: 20,
    margin: 10,
    backgroundColor: 'white'
  }
}

const mapStateToProps = state => {
  const event = state.eventsData.currentEvent
  return { selectedAction: state.selectedAction,
           actionKinds: state.actionKinds,
           currentEventId: state.eventsData.currentEventId,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null
        };


};

export default connect(mapStateToProps, {updateEvent})(ActionList);
