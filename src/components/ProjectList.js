import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux'
import * as actions from '../actions';
import Button from './common/Button';
import LinkCard from './LinkCard';
import Event from './Event';
import TabBar from './TabBar';

class ProjectList extends Component {
  renderProjects(){
    console.log('in renderEvents')
    console.log(this.props.currentEventId)
    return this.props.projects.map(
      project => <LinkCard key={project.id} project={project} customStyle={{width: '47%', height: 60, margin: 5}} onPress={()=> this.props.updateEventProject(project, this.props.currentEventId)}> {project.name}</LinkCard>
    )
  }
  render() {
    const {containerStyle, projectsWrapperStyle, footerStyle} = styles
    return (
      <View>
        <TabBar/>
        <View style={containerStyle}>
          <View style={projectsWrapperStyle}>
            {this.renderProjects()}
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
    alignItems: 'center'
  },
  footerStyle: {
    backgroundColor: '#FCFCFC',
    padding: 20,
    marginTop: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  },
  avatarWrapperStyle: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 20
  },
  projectsWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '100%'
  },
  buttonWrapperStyle: {
    marginBottom: 100,
    width: '100%'

  }
};


const mapStateToProps = (state) => {
  return { events: state.eventsData.events,
           currentEventId: state.eventsData.currentEventId,
           projects: state.projects
         }
}
export default connect(mapStateToProps, actions)(ProjectList);
