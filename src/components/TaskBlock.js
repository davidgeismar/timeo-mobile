
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux'
import Avatar from './Avatar';

import Task from './Task';

// import * as actions from '../actions';

class TaskBlock extends Component {

  renderTasks(tasks){
    console.log('in render tasks')
    console.log(tasks)
    return tasks.map(
              task => <Task
                        customStyle={{width: '100%', height: 80, margin: 5, justifyContent: 'flex-start', alignItems: ''}}
                        onPress={()=> this.props.setCurrentTask(task)}
                        canBeActivated={true}
                        activationKey={task.id}
                              >
                        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', height: '100%', padding: 4}}>
                          <Text style={{ fontSize: 10, color: '#8CCDF8'}}>
                            {task.clientName} {task.projectName} > {task.status} > {task.taskNumber}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            {task.description}
                          </Text>
                          <View>
                            <Avatar
                              size="small"
                              rounded
                              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                              onPress={() => Actions.events()}
                              activeOpacity={0.7}
                              />
                          </View>
                        </View>
                        <Text style={{fontSize: 12, position: 'absolute', top: 3, right: 3, color: '#8CCDF8'}}>
                          {task.creationDate}
                        </Text>
                      </Task>
                )
  }

  render() {
    console.log('in render taskblock')
    console.log(this.props.tasks)
    return (
      <View style={{borderLeftColor: '#8CCDF8', borderLeftWidth: 2, width: '82%', marginBottom: 10}}>
        {this.renderTasks(this.props.tasks)}
      </View>
    )
  }
}

const styles = {
};

const mapStateToProps = (state, ownProps) => {
  console.log('in mapStateToProps Taskblock')
  return {
  }
};

export default connect(mapStateToProps, actions)(TaskBlock);
