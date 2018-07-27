import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { updateEvent } from '../actions';
import Button from './common/Button';
import Spinner from './common/Spinner';
import LinkCard from './LinkCard';
import Event from './Event';
import TabBar from './TabBar';

class ProjectList extends Component {
  renderProjects(){
    return this.props.projects.map(
      project => <LinkCard  key={project.id}
                            canBeActivated={true}
                            activationKey={project.id}
                            project={project}
                            customStyle={{width: '47%', height: 60, margin: 5}}
                            onPress={()=> this.props.updateEvent('project_id', project.id, this.props.duration, this.props.measureKind, this.props.currentEventId)}
                            > {project.name}</LinkCard>
    )
  }
  render() {
    const {containerStyle, projectsWrapperStyle} = styles
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    else {
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
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  projectsWrapperStyle: {
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
           projects: state.projects,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null,
           loading: state.loading
         }
}
export default connect(mapStateToProps, { updateEvent } )(ProjectList);
