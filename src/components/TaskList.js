
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { removeSelectedTask, saveTask, changeTaskListScope, searchTasks } from '../actions';
import Button from './common/Button';
import Footer from './common/Footer';
import Header from './common/Header';
import LinkCard from './LinkCard';
import TaskBlock from './TaskBlock';
import Avatar from './Avatar';
import SearchBar from './SearchBar';


// here I would like tasklist to be able to know if searchbar is in expanded state in order to hide some stuff
// in this parent component
// how is it possible to transmit from child to parent without redux that seems

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
    }

    let taskblocks = []
    for (key in taskBuckets){
      console.log(key)
      console.log(taskBuckets[key])
      taskblocks.push(<TaskBlock tasks={taskBuckets[key]} status={key}/>)
    }
    return (
        taskblocks
    )
  }
  renderSwitch(){
    if (!this.props.searchInit){
      console.log('in renderExtras')
      console.log(this.props.scope)
      const switchValue = this.props.scope == 'current_user' ? false : true
      console.log(switchValue)
      return (
          <Switch
            onValueChange={ (switchValue) => this.props.changeTaskListScope(switchValue) }
            value={switchValue}
            style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }],   alignSelf: 'center' }}/>
      )
    }
  }

  renderTitle(){
    if (!this.props.searchInit){
      return(
        <View style={{height: '100%', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: 'red'}}>
          <Text style={{color: '#00AFFA',  alignSelf: 'center', borderBottomColor: 'red', borderBottomWidth: 1, fontSize: 12}}>
            Link to a Kameo Task
          </Text>
        </View>
      )
    }
  }

  renderToggle(){
    if (!this.props.searchInit){
      return (
        <View style={{height: '100%', flexDirection: 'row'}}>
          <Text  style={{color: '#00AFFA', fontSize: 12, alignSelf: 'center'}}>
            my tasks
          </Text>
          {this.renderSwitch()}
          <Text  style={{color: '#BFBFBF', fontSize: 12,   alignSelf: 'center'}}>
            all
          </Text>
        </View>
      )
    }

  }

  renderHeader(){
    const {taskHeaderStyle} = styles
    return (
      <Header>
        {this.renderTitle()}
        {this.renderToggle()}
        <View style={{height: '100%', width: this.props.searchInit ? '90%' : null, flexDirection: 'row',   alignSelf: 'center', paddingRight: 15}}>
          <SearchBar onChangeText={(value)=> this.props.searchTasks(value)}/>
        </View>
      </Header>
    )
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
        <LinkCard customStyle={{ alignSelf: 'center', width: 300, marginTop: 30, height: 80, marginBottom: 10}} onPress={() => Actions.kanbanList()}>{selectedKanban.name}</LinkCard>
      )
    }
  }
  render() {
    const { containerStyle, footerButtonsWrapper, footerButtonStyle} = styles
    return (
      <View style={containerStyle}>
        {this.renderHeader()}
        {this.renderSelectedKanban(this.props.selectedKanban)}
        <ScrollView>
          {this.renderTasks()}
        </ScrollView>
        <Footer customStyle={{backgroundColor: '#E62B5A'}}>
          <View style={ footerButtonsWrapper }>
            <Button customStyle={ footerButtonStyle } onPress={()=> this.props.removeSelectedTask()}>CANCEL</Button>
            <Button disabled={this.props.disabled} customStyle={styles.footerButtonStyle} onPress={()=> this.saveTask()}>SAVE</Button>
          </View>
        </Footer>
      </View>
    )

  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
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
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
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
           scope: state.tasks.scope,
           disabled: disabled
         }
}
export default connect(mapStateToProps, { removeSelectedTask, saveTask, changeTaskListScope, searchTasks })(TaskList);
