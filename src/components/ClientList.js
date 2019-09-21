import React, { Component } from 'react';
import { View, Alert} from 'react-native'
import { connect } from 'react-redux';
import {updateEvent, setErrorState} from '../actions';
import Spinner from './common/Spinner';
import LinkCard from './LinkCard';
import TabBar from './TabBar';


class ClientList extends Component {
  selectClient(client){
    this.props.updateEvent('client_id', client.id, this.props.duration, this.props.measureKind, this.props.currentEventId)
  }
  renderClients(){
    console.log("clients test")
    console.log(this.props.clients)
    return this.props.clients.map(
      client => <LinkCard key={client.id} activationKey={client.id} canBeActivated={true}
                          client={client} customStyle={{width: '47%', height: 60, margin: 5}}
                          onPress={()=> this.selectClient(client)}> {client.name}</LinkCard>
    )
  }
  renderError(){
    if (this.props.error){
      Alert.alert(
        'An Error occured',
         this.props.error,
        [
          {text: 'Dismiss', onPress: () => this.props.setErrorState(null), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
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
              {this.renderError()}
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
           clients: state.clients.clients,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null,
           loading: state.loading
         }


}
export default connect(mapStateToProps, {updateEvent, setErrorState} )(ClientList);
