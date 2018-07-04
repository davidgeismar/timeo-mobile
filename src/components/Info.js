import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { updateEventComment, loadProjectKanbans } from '../actions';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux';
import Attachment from './assets/Attachment';
import Kameo from './assets/Kameo';
import LinkCard from './LinkCard';
import * as utilities from '../lib/Utilities';
import TimeFormatter from 'minutes-seconds-milliseconds';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Footer from './common/Footer'
import StylishInput from './common/StylishInput'
import TabBar from './TabBar';


// import * as actions from '../actions';

class Info extends Component {
  renderKanbanInfo(kanban){
    console.log('renderKanbanInfo')
    if (kanban) {
      return <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => Actions.kanbanList()}>{kanban.name}</LinkCard>
    }
  }
  renderTaskInfo(task){
    console.log('renderTaskInfo')
    if (task) {
        return (<LinkCard customStyle={{margin: 5, padding:3, fontSize: 8, alignSelf: 'stretch'}} onPress={() => Actions.taskList()}>
                {task.clientName} {task.projectName} > {task.status} > {task.taskNumber}
                </LinkCard>
            )
    }
  }

  renderProject(project){
    console.log('in renderProject')
    if (project){
      return (
        <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => Actions.project()}>{project.name}</LinkCard>
      )
    }
  }

  showDocumentPicker(){
    DocumentPicker.show({
        filetype: [DocumentPickerUtil.images()],
      },(error,res) => {
        // Android
        console.log(
           res.uri,
           res.type, // mime type
           res.fileName,
           res.fileSize
        );
      });
  }
  render() {
    const {comment, hour, minute, action, clientName, project, timerKind, timerValue, eventId, kanban, task} = this.props
    const {containerStyle, formWrapperStyle, footerStyle, svgStyle} = styles
    return (

        <View style={containerStyle}>
          <TabBar/>
          <View style={formWrapperStyle}>
            {this.renderProject(project)}
            <LinkCard customStyle={{margin: 5, padding:3}}  onPress={() => Actions.client()}>{clientName }</LinkCard>
            <LinkCard customStyle={{margin: 5, padding:3}}  onPress={() => Actions.time()}>{timerKind == "chrono" ? TimeFormatter(timerValue) : utilities.formatDuration(hour, minute)}</LinkCard>
            <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => Actions.actionList()}>{action}</LinkCard>
            <View style={{flexDirection: 'row', width: '100%'}}>
              {this.renderKanbanInfo(kanban)}
              {this.renderTaskInfo(task)}
            </View>

            <StylishInput
              style={{height: 40, width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
              placeholder="Comments"
              onChangeText={(comment) => this.props.updateEventComment(comment, eventId)}
              value={comment}
            />

          </View>
          <Footer>
            <View style={styles.footerButtonsWrapper}>
              <TouchableOpacity onPress={()=>{this.showDocumentPicker()}}>
                <Attachment style={svgStyle} fill="#8CCDF8"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.props.loadProjectKanbans(project.id)}}>
                <Kameo style={svgStyle} fill='red'/>
              </TouchableOpacity>
              <Button customStyle={styles.footerButtonStyle}onPress={()=> Actions.events()} >SAVE</Button>
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formWrapperStyle: {
    padding: 30,
    width: '100%'
  },
  footerButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  footerButtonStyle: {
    width: 150
  },
  svgStyle: {
    height: 60,
    width: 60
  }
};

const mapStateToProps = (state) => {
  console.log('in mapstatetoprops Info')
  console.log(state)
  const event = state.eventsData.events.find(event => event.id == state.eventsData.currentEventId)
  console.log(event)
  if (event){
    console.log('in event Info')
    return { hour: event.duration.selectedHour,
             minute: event.duration.selectedMinute,
             timerValue: event.duration.timerValue,
             timerKind: event.duration.kind,
             clientName: event.client ? event.client.name : 'client',
             project: event.project,
             action: event.action != "" ? event.action : "Actions",
             comment: event.comment,
             eventId: event.id,
             kanban: event.kanban,
             task: event.task

            };
  }
  else{
    return { hour: '',
             minute: '',
             action: "Actions"
            };
  }
};



export default connect(mapStateToProps, { updateEventComment, loadProjectKanbans })(Info);
