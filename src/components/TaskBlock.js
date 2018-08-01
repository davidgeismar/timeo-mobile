
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import { setCurrentTask, changeTaskListScope, getResources } from '../actions';
import { Actions } from 'react-native-router-flux'
import Avatar from './Avatar';
import Task from './Task';

// import * as actions from '../actions';

class TaskBlock extends Component {

  componentWillMount(){
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

  userThumbUrl(affected_to_id){
    if (this.props.resources){
      if (this.props.resources.resources.length > 0 ){
        const affectedTo = this.props.resources.resources.find((resource) => resource.id == affected_to_id)
        if (affectedTo){
          console.log('in affectedTo')
          console.log(affectedTo)
          return affectedTo.user_info.logo_thumb
        }
        else {
          return ""
        }
      }
      else {
        return ""
      }
    }
    else {
      return ""
    }
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
                              source={{uri: this.userThumbUrl(task.affected_to_id)}}
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
  console.log('mapStateToProps taskblock')
  console.log(state)
  return {
    logo_thumb: state.user.user_info.logo_thumb,
    resources: state.resources
  }

}

export default connect(mapStateToProps, { setCurrentTask, changeTaskListScope, getResources })(TaskBlock);
