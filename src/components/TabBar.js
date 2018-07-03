import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import Avatar from './Avatar';
import {Actions} from 'react-native-router-flux'
import * as actions from '../actions';
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
    if (this.props.activeChrono){
      return <Chrono style={styles.svgStyle} fill="#8CCDF8"/>
    }
    else {
      return <Absent style={styles.svgStyle} fill='#BFBFBF'/>
    }
  }

  render() {
    const {textStyle} = styles
    return (
      <View style={styles.containerStyle}>
          <Tab onPress={() => this.props.activateTab('chrono')} activationKey='chrono'>
            {this.renderIcon()}
          </Tab>
          <Tab onPress={() => this.props.activateTab('time')} activationKey='time'>
            <Text style={[textStyle, {color: this.props.activeTime ? '#00AFFA' : '#BFBFBF' }]}>TIME</Text>
          </Tab>
          <Tab onPress={() => this.props.activateTab('client')} activationKey='client'>
            <Text style={[textStyle, {color: this.props.activeClient ? '#00AFFA' : '#BFBFBF' }]}>CLIENT</Text>
          </Tab>
          <Tab onPress={()=> this.props.activateTab('project')} activationKey='project'>
            <Text style={[textStyle, {color: this.props.activeProject ? '#00AFFA' : '#BFBFBF' }]}>PROJECT</Text>
          </Tab>
          <Tab onPress={()=> this.props.activateTab('info')} activationKey='info'>
            <Text style={[textStyle, {color: this.props.activeInfo ? '#00AFFA' : '#BFBFBF' }]}>INFO</Text>
          </Tab>
            <Avatar
              size="small"
              rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
              onPress={() => Actions.events()}
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
  const activeChrono = state.tabs.activeTab == 'chrono'
  const activeTime = state.tabs.activeTab == 'time'
  const activeClient = state.tabs.activeTab == 'client'
  const activeProject = state.tabs.activeTab == 'project'
  const activeInfo = state.tabs.activeTab == 'info'
  return {
    activeChrono,
    activeTime,
    activeClient,
    activeProject,
    activeInfo
  }
}

export default connect(mapStateToProps, actions)(TabBar)

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
