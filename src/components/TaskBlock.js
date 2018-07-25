
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import { setCurrentTask, changeTaskListScope } from '../actions';
import { Actions } from 'react-native-router-flux'
import Avatar from './Avatar';
import API from '../actions/Api';
import Task from './Task';

// import * as actions from '../actions';

class TaskBlock extends Component {

  componentWillMount(){
    // API.get(`/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}/pattern?pattern=${pattern}&limit_to_mine=${limitToMine}`)
    //   .then(response => searchTasksSuccess(dispatch, response))
    //   .catch(error => onRequestErrorCallback(dispatch, error));
    this.setState({
      visible: true
    })
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

  renderTasks(tasks){

    return tasks.map(
              task => <Task
                        customStyle={{width: 300, height: 80, margin: 5,}}
                        onPress={()=> this.props.setCurrentTask(task)}
                        canBeActivated={true}
                        activationKey={task.id}
                        card_type={task.card_type}
                        >
                        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 4}}>
                          <Text style={{ fontSize: 10, color: 'white'}}>
                            {task.client__name} {task.project__name} > {task.card_type} > {task.reference}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            {task.subject}
                          </Text>
                          <View>
                            <Avatar
                              size="small"
                              rounded
                              source={{uri: this.props.logo_thumb}}
                              onPress={() => Actions.events()}
                              activeOpacity={0.7}
                              />
                          </View>
                        </View>
                        <Text style={{fontSize: 12, position: 'absolute', top: 3, right: 3, color: 'white'}}>
                          {task.creationDate}
                        </Text>
                      </Task>
                )
  }

  render() {
    if (this.state.visible) {
      return (
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}} >
          <TouchableOpacity style={{position: 'absolute', left: 0, top: 13}} onPress={()=> this.hideTaskBlock()}>
            <Text style={{transform: [{ rotate: '-90deg'}], fontSize: 14, color: '#BFBFBF'}}>
              {this.props.status}
            </Text>
          </TouchableOpacity>
          <View style={{borderLeftColor: '#8CCDF8', borderLeftWidth: 2, marginBottom: 10}}>
            {this.renderTasks(this.props.tasks)}
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
              {this.props.status}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    logo_thumb: state.user.user_info.logo_thumb
  }

}

export default connect(mapStateToProps, { setCurrentTask, changeTaskListScope })(TaskBlock);
