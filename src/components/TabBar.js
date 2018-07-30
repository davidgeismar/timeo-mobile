import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import Avatar from './Avatar';
import {Actions} from 'react-native-router-flux'
import { activateTab, fetchEvents, fetchClients, loadClientProjects } from '../actions';
import Chrono from './assets/Chrono';
import Absent from './assets/Absent';
import Tab from './Tab';


// SPEC
// au cours de la creation de l evenement c'est step by step
// si pas de selection du time rien n'est actif (a part time)
//  si time est selectionne time + client devienne actif
// si client est selectionne time / client / project devienne actif
// si project est selectionne time / client / project/ INFO devient actif
// avatar est toujours actif
//  une fois qu'un event a ete creer tout est actif

// import * as actions from '../actions';


class TabBar extends Component {
  renderIcon(){
    if (this.props.enableChronoNav && this.props.activeChrono){
      return <Chrono style={styles.svgStyle} fill="#8CCDF8"/>
    }
    else if (this.props.enableChronoNav){
      return (
              <Chrono style={styles.svgStyle} fill="#BFBFBF"/>
            )
    }
    else {
      return <Absent style={styles.svgStyle} fill='#BFBFBF'/>
    }
  }

  redirectToInfoTab(){
    if (this.props.kanbans.length > 0){
      this.props.activateTab('info')
    }
  }

  render() {
    const {textStyle, containerStyle, svgStyle } = styles
    const {clientId} = this.props
    return (
      <View style={containerStyle}>
          <Tab forceActivation={this.props.enableChronoNav} onPress={() => this.props.enableChronoNav ? this.props.activateTab('chrono') : null} activationKey='chrono'>
            {this.renderIcon()}
          </Tab>
          <Tab onPress={() => this.props.activateTab('time')} activationKey='time'>
            <Text style={[textStyle, {color: this.props.activeTime ? '#00AFFA' : '#BFBFBF' }]}>TIME</Text>
          </Tab>
          <Tab onPress={() => this.props.fetchClients()} activationKey='client'>
            <Text style={[textStyle, {color: this.props.activeClient ? '#00AFFA' : '#BFBFBF' }]}>CLIENT</Text>
          </Tab>
          <Tab onPress={()=> clientId ? this.props.loadClientProjects(clientId): null} activationKey='projects'>
            <Text style={[textStyle, {color: this.props.activeProject ? '#00AFFA' : '#BFBFBF' }]}>PROJECT</Text>
          </Tab>
          <Tab onPress={()=> this.props.activateTab('info')} activationKey='info'>
            <Text style={[textStyle, {color: this.props.activeInfo ? '#00AFFA' : '#BFBFBF' }]}>INFO</Text>
          </Tab>
            <Avatar
              size="small"
              rounded
              source={{uri: this.props.logo_thumb}}
              onPress={() => this.props.fetchEvents()}
              activeOpacity={0.7}
              />

      </View>
    )

  }
}

const styles = {
  textStyle: {
    alignSelf: 'center'
  },
  containerStyle: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  svgStyle: {
    alignSelf: 'center',
    height: 30,
    width: 30
  }
};

const mapStateToProps = (state) => {
  const event = state.eventsData.currentEvent
  let enableChronoNav = true
  let clientId

  if (event) {
    clientId = event.client_id
    if (event.measure_kind == 'manual') {
         enableChronoNav = false
    }
  }

  const activeChrono = state.tabs.activeTab == 'chrono'
  const activeTime = state.tabs.activeTab == 'time'
  const activeClient = state.tabs.activeTab == 'client'
  const activeProject = state.tabs.activeTab == 'projects'
  const activeInfo = state.tabs.activeTab == 'info'
  const logo_thumb = state.user.user_info.logo_thumb
  const kanbans = state.kanbans.list
  return {
    enableChronoNav,
    activeChrono,
    activeTime,
    activeClient,
    activeProject,
    activeInfo,
    logo_thumb,
    kanbans,
    clientId
  }
}

export default connect(mapStateToProps, { activateTab, fetchEvents, fetchClients,loadClientProjects })(TabBar)
