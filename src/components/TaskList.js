
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import * as actions from '../actions';
import Button from './common/Button';
import Footer from './common/Footer';
import LinkCard from './LinkCard';
import TaskBlock from './TaskBlock';
import Header from './Header';
import Avatar from './Avatar';
import SearchBar from './SearchBar';
import Search from './assets/Search.js'

class TaskList extends Component {

  renderTasks(){
    console.log('in renderTasks')
    console.log(this.props.tasks)
    const tasks = this.props.tasks
    let taskBuckets = {}
    for (i = 0; i < tasks.length; i++) {
        let status = tasks[i].status
        if (taskBuckets[status]){
          taskBuckets[status].push(tasks[i])
        }
        else{
          taskBuckets[status] = [tasks[i]]
        }
        console.log(taskBuckets)
    }
    console.log(taskBuckets)
    let taskblocks = []
    for (key in taskBuckets){
      taskblocks.push(<TaskBlock tasks={taskBuckets[key]} status={key}/>)
    }
    return (
        taskblocks

    )

  }

  renderHeader(){
    const {taskHeaderStyle} = styles
    if (this.props.searchInit){
      return (
        <View style={taskHeaderStyle}>
          <SearchBar closeAction={() => this.props.updateSearchTaskStatus(false)} />
        </View>
      )
    }
    else {
      return (
        <View style={taskHeaderStyle}>
          <Text style={{color: '#8CCDF8', alignSelf: 'center', borderBottomColor: 'red', borderBottomWidth: 1, padding: 5}}>
            Link to a Kameo Task
          </Text>
          <Text  style={{ alignSelf: 'center'}}>
          my tasks
          </Text>
          <TouchableOpacity style={{ alignSelf: 'center'}} onPress= {() => this.props.updateSearchTaskStatus(true)}>
            <Search style={{height: 24, width: 24}}/>
          </TouchableOpacity>
        </View>
      )
    }
  }

  saveTask(){
    console.log('in savekanban')
    console.log(this.props.eventId)
    console.log(this.props.selectedTask)
    this.props.saveTask(this.props.eventId, this.props.selectedTask)
  }
  renderSelectedKanban(selectedKanban){
    console.log('in renderSelectedKanban')
    if (selectedKanban){
      return (
        <LinkCard customStyle={{width: '80%', height: 80, marginBottom: 10}} onPress={() => Actions.kanbanList()}>{selectedKanban.name}</LinkCard>
      )
    }
  }
  render() {
    const { containerStyle, tasksWrapperStyle, footerStyle} = styles
    return (
      <View style={{height: '100%'}}>
        <View style={containerStyle}>
          {this.renderHeader()}
          {this.renderSelectedKanban()}
          {this.renderTasks()}
        </View>
        <Footer customStyle={{backgroundColor: 'red'}}>
          <View style={styles.footerButtonsWrapper}>
            <Button customStyle={styles.footerButtonStyle} onPress={()=> this.props.removeSelectedTask()}>CANCEL</Button>
            <Button disabled={this.props.disabled} customStyle={styles.footerButtonStyle} onPress={()=> this.saveTask()}>SAVE</Button>
          </View>
        </Footer>
      </View>
    )

  }
}

const styles = {
  containerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonStyle: {
    width: 180
  },
  taskHeaderStyle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  footerButtonStyle: {
    width: 180
  }
};


const mapStateToProps = (state) => {
  console.log('in mapStateToProps tasks')
  console.log(state)
    const disabled = state.tasks.selectedTask ? false : true
  return { tasks: state.tasks.list,
           selectedKanban: state.kanbans.selectedKanban,
           searchInit: state.tasks.searchInit,
           selectedTask: state.tasks.selectedTask,
           eventId: state.eventsData.currentEventId,
           disabled: disabled
         }
}
export default connect(mapStateToProps, actions)(TaskList);
