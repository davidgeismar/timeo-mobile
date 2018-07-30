
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { removeSelectedTask, updateEvent, changeTaskListScope, searchTasks } from '../actions';
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

  returnTaskBlock(taskBucket){
    if (taskBucket.cards.length > 0){
      return <TaskBlock tasks={taskBucket.cards} status={taskBucket.name}/>
    }
  }
  renderTasks(){
    const tasks = this.props.tasks
    return tasks.map(
      taskBucket => this.returnTaskBlock(taskBucket)
    )
  }
  renderSwitch(){
    if (!this.props.searchInit){
      const switchValue = this.props.limitToMine ? false : true
      return (
          <Switch
            onValueChange={ (switchValue) => this.props.changeTaskListScope(switchValue, this.props.searchPattern, this.props.selectedKanban.id) }
            value={switchValue}
            style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }],   alignSelf: 'center' }}/>
      )
    }
  }

  renderTitle(){
    if (!this.props.searchInit){
      return(
        <View style={{height: '100%', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: 'red'}}>
          <Text style={{color: '#00AFFA',  alignSelf: 'center', fontSize: 12}}>
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
        <View style={{height: '100%', width: this.props.searchInit ? '90%' : 20, flexDirection: 'row',   alignSelf: 'center'}}>
          <SearchBar
            onChangeText={(pattern)=> this.props.searchTasks(this.props.selectedKanban.id, pattern, this.props.limitToMine)}
            value={this.props.searchPattern}
            />
        </View>
      </Header>
    )
  }

  saveTask(){
    this.props.updateEvent('card_id', this.props.selectedTask.id, this.props.duration, this.props.measureKind, this.props.eventId)
    // this.props.saveTask(this.props.eventId, this.props.selectedTask)
  }
  renderSelectedKanban(selectedKanban){
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
        <ScrollView style={{marginBottom: 130}}>
          {this.renderTasks()}
        </ScrollView>
        <Footer customStyle={{backgroundColor: '#E62B5A'}}>
          <View style={ footerButtonsWrapper }>
            <Button customStyle={ footerButtonStyle } onPress={()=> this.props.removeSelectedTask()}>CANCEL</Button>
            <Button disabled={this.props.disabled} customStyle={footerButtonStyle} onPress={()=> this.saveTask()}>SAVE</Button>
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
    width: 170
  },
  taskHeaderStyle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  }
};


const mapStateToProps = (state) => {
  const disabled = state.tasks.selectedTask ? false : true
  const event = state.eventsData.currentEvent
  return { tasks: state.tasks.list,
           selectedKanban: state.kanbans.selectedKanban,
           searchInit: state.tasks.searchInit,
           selectedTask: state.tasks.selectedTask,
           eventId: state.eventsData.currentEventId,
           limitToMine: state.tasks.limitToMine,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null,
           disabled: disabled,
           searchPattern: state.tasks.searchPattern
         }
}
export default connect(mapStateToProps, { removeSelectedTask, updateEvent, changeTaskListScope, searchTasks })(TaskList);
