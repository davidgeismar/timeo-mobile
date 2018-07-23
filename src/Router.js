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
import API from './actions/Api';

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
            initial={this.props.initialPage == 'login'}
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

             <Scene key='chrono' hideNavBar component={Starter} initial={ this.props.initialPage == 'chrono' }/>
             <Scene key='time' hideNavBar title='TIME' component={TimeCardList} icon={ChronoIcon} initial={ this.props.initialPage == 'time'}/>
             <Scene key='client' hideNavBar title='CLIENT' component={ClientList} icon={TabIcon} initial={ this.props.initialPage == 'client'}/>
             <Scene key='projects' hideNavBar title='PROJECT' component={ProjectList} icon={TabIcon} initial={ this.props.initialPage == 'projects'}/>
             <Scene key='info' hideNavBar title='INFO' component={Info} icon={TabIcon} initial={ this.props.initialPage == 'info'}/>

            <Scene
              key='kanbanList'
              component={KanbanList}
              />
            <Scene key='events' hideNavBar title='EVENTS' component={EventList} icon={TabIcon} initial={ this.props.initialPage == 'events'}/>
            <Scene key='deleteEvent' hideNavBar title='DELETE' component={DeleteConfirmation} />

        </Scene>
      </Router>

    )
  }
}

const mapStateToProps = (state) => {
  console.log('in mapStateToProps')
  console.log(state)
  let initialPage = 'login'
  if (state._persist){
    if (state._persist.rehydrated && state.authentication.token){
      API.defaults.headers.common['Authorization'] = 'Bearer ' + state.authentication.token;
      console.log('fu')
      initialPage = state.tabs.activeTab
    }
  }
  console.log(initialPage)
  return {
    initialPage: initialPage
  }
}
export default connect(mapStateToProps, null)(RouterComponent)
