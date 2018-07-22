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
    console.log('in renderEvents')
    console.log(this.props.currentEventId)
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
  console.log('in mapStateToProps ProjectList')
  const event = state.eventsData.events.find(event => event.id == state.eventsData.currentEventId)
  console.log(event)

  return { events: state.eventsData.events,
           currentEventId: state.eventsData.currentEventId,
           projects: state.projects,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null,
           loading: state.loading
         }
}
export default connect(mapStateToProps, { updateEvent } )(ProjectList);
