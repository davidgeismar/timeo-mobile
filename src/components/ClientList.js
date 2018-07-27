import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import {updateEvent} from '../actions';
import Spinner from './common/Spinner';
import LinkCard from './LinkCard';
import TabBar from './TabBar';


class ClientList extends Component {
  selectClient(client){
    this.props.updateEvent('client_id', client.id, this.props.duration, this.props.measureKind, this.props.currentEventId)
  }
  renderClients(){
    return this.props.clients.map(
      client => <LinkCard key={client.id} activationKey={client.id} canBeActivated={true}
                          client={client} customStyle={{width: '47%', height: 60, margin: 5}}
                          onPress={()=> this.selectClient(client)}> {client.name}</LinkCard>
    )
  }
  render() {
    const {containerStyle, eventsWrapperStyle} = styles
    if (this.props.loading){
      return <Spinner size="large" />;
    }
    else {
      return (
        <View>
          <TabBar/>
          <View style={containerStyle}>
            <View style={eventsWrapperStyle}>
              {this.renderClients()}
            </View>
          </View>
        </View>
      )
    }

  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  eventsWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '100%'
  }
};


const mapStateToProps = (state) => {
  const event = state.eventsData.currentEvent
  return { events: state.eventsData.events,
           currentEventId: state.eventsData.currentEventId,
           clients: state.clients,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null,
           loading: state.loading
         }


}
export default connect(mapStateToProps, {updateEvent} )(ClientList);
