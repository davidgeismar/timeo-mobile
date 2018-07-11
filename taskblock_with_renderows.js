
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Dimensions, ListView} from 'react-native'
import { connect } from 'react-redux';
import { setCurrentTask, changeTaskListScope } from '../actions';
import { Actions } from 'react-native-router-flux'
import Avatar from './Avatar';

import Task from './Task';

// import * as actions from '../actions';

class TaskBlock extends Component {
  componentWillMount() {
     console.log('in componentWillMount')
    console.log(this.props)
    this.createDataSource(this.props.tasks);
    this.setState({
      visible: true
    })
  }



  createDataSource( tasks ) {
    console.log('in createDataSource')
    console.log(tasks)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(tasks);
    console.log(this.dataSource)
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }


  hideTaskBlock(){
    this.setState({
      visible: false
    })
  }
  showTaskBlock(){
    this.setState({
      visible: true
    })
  }


  renderRow(task) {

    console.log('in renderRow')
      console.log(task)
    console.log(this.props)

    return (
      <Task
                customStyle={{width: 300, height: 80, margin: 5,}}
                onPress={()=> this.props.setCurrentTask(task)}
                canBeActivated={true}
                activationKey={task.id}
                kindColor={task.kindColor}
                >
                <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 4}}>
                  <Text style={{ fontSize: 10, color: 'white'}}>
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
                <View>
                <Text style={{fontSize: 12, position: 'absolute', top: 3, right: 3, color: 'white'}}>
                  {task.creationDate}
                </Text>
                </View>
              </Task>

    )
  }
  // renderTasks(tasks){
  //   console.log('in render tasks')
  //   console.log(tasks)
  //   console.log(this.props)
  //   return tasks.map(
  //             task => <Task
  //                       customStyle={{width: 300, height: 80, margin: 5,}}
  //                       onPress={()=> this.props.setCurrentTask(task)}
  //                       canBeActivated={true}
  //                       activationKey={task.id}
  //                       kindColor={task.kindColor}
  //                       >
  //                       <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 4}}>
  //                         <Text style={{ fontSize: 10, color: 'white'}}>
  //                           {task.clientName} {task.projectName} > {task.status} > {task.taskNumber}
  //                         </Text>
  //                         <Text style={{fontSize: 10}}>
  //                           {task.description}
  //                         </Text>
  //                         <View>
  //                           <Avatar
  //                             size="small"
  //                             rounded
  //                             source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
  //                             onPress={() => Actions.events()}
  //                             activeOpacity={0.7}
  //                             />
  //                         </View>
  //                       </View>
  //                       <View>
  //                       <Text style={{fontSize: 12, position: 'absolute', top: 3, right: 3, color: 'white'}}>
  //                         {task.creationDate}
  //                       </Text>
  //                       </View>
  //                     </Task>
  //               )
  // }

  render() {
    console.log('in render taskblock')
    console.log(this.props.tasks)
    if (this.state.visible) {
      return (
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}} >
          <TouchableOpacity style={{position: 'absolute', left: 0, top: 13}} onPress={()=> this.hideTaskBlock()}>
            <Text style={{transform: [{ rotate: '-90deg'}], fontSize: 14, color: '#BFBFBF'}}>
              {this.props.tasks[0]['status']}
            </Text>
          </TouchableOpacity>
          <View style={{borderLeftColor: '#8CCDF8', borderLeftWidth: 2, marginBottom: 10}}>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow.bind(this)}
              />
          </View>
        </View>
      )
    }
    else {
      const marginLeft = ((Dimensions.get("window").width - 300)/2)- 10
      return (
        <View style={{alignSelf: 'flex-start', marginLeft: marginLeft, marginBottom: 10 }}>
          <TouchableOpacity onPress={()=> this.showTaskBlock()}>
            <Text style={{fontSize: 14, color: '#BFBFBF'}}>
              {this.props.tasks[0]['status']}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}




export default connect(null, { setCurrentTask, changeTaskListScope })(TaskBlock);
