import React, { Component } from 'react';
import { Text } from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux'
import Starter from './components/Starter'
import Header from './components/Header'
import Empty from './components/Empty'
import TimeCardList from './components/TimeCardList'
import ActionList from './components/ActionList'
import Info from './components/Info'
import EventList from './components/EventList'
import ClientList from './components/ClientList'
import Chrono from './components/assets/Chrono'
import ProjectList from './components/ProjectList'
import KanbanList from './components/KanbanList'
import DeleteConfirmation from './components/DeleteConfirmation'
import { connect } from 'react-redux';
import TaskList from './components/TaskList'
import LoginForm from './components/LoginForm'
const TabIcon = ({selected, title}) => {
  return (
    <Text style={{color: selected ? 'red' : 'black'}}> {title}</Text>
  );
};
const ChronoIcon = () => {
  return (
    <Text style={{color: selected ? 'red' : 'black'}}>Brutasse</Text>

  );
};

class RouterComponent  extends Component {
    render() {
    return (
      <Router>
        <Scene key='main'>
          <Scene
            key='login'
            renderBackButton={()=>(null)}
            component={LoginForm}
            title='TIMEO'
            initial
            />
          <Scene
            leftTitle="Logout"
            key='starter'
            component={Starter}
            />
            <Scene
              key='actionList'
              component={ActionList}
              />
            <Scene
              key='taskList'
              component={TaskList}
              hideNavBar
              />

             <Scene key='chrono' hideNavBar component={Starter}/>
             <Scene key='time' hideNavBar title='TIME' component={TimeCardList} icon={ChronoIcon}/>
             <Scene key='client' hideNavBar title='CLIENT' component={ClientList} icon={TabIcon}/>
             <Scene key='projects' hideNavBar title='PROJECT' component={ProjectList} icon={TabIcon}/>
             <Scene key='info' hideNavBar title='INFO' component={Info} icon={TabIcon}/>

            <Scene
              key='kanbanList'
              component={KanbanList}
              />
            <Scene key='events' hideNavBar title='EVENTS' component={EventList} icon={TabIcon}/>
            <Scene key='deleteEvent' hideNavBar title='DELETE' component={DeleteConfirmation} />

        </Scene>
      </Router>

    )
  }
}

const mapStateToProps = (state) => {
  const event = state.eventsData.events.find(event => event.id == state.eventsData.currentEventId)
  let disableChronoTab
  if (event) {
   disableChronoTab = event.duration.kind == 'selection' ? true : false
  }
  else {
    disableChronoTab = false
  }
  return {
    disableChronoTab: disableChronoTab
  }
}
export default connect(mapStateToProps, null)(RouterComponent)
