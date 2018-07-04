import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import {updateEventClient} from '../actions';
import LinkCard from './LinkCard';
import TabBar from './TabBar';


class ClientList extends Component {
  selectClient(client){
    this.props.updateEventClient(client, this.props.currentEventId)
  }
  renderClients(){
    console.log('in renderEvents')
    console.log(this.props.currentEventId)
    return this.props.clients.map(
      client => <LinkCard key={client.id} client={client} customStyle={{width: '47%', height: 60, margin: 5}} onPress={()=> this.selectClient(client)}> {client.name}</LinkCard>
    )
  }
  render() {
    const {containerStyle, eventsWrapperStyle} = styles
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
  console.log('in mapStateToProps clientlist')
  return { events: state.eventsData.events,
           currentEventId: state.eventsData.currentEventId,
           clients: state.clients
         }
}
export default connect(mapStateToProps, {updateEventClient} )(ClientList);
