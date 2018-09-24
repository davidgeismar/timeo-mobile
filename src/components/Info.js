import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, Platform} from 'react-native'
import { connect } from 'react-redux';
import { updateEvent, updateEventComment, loadProjectKanbans, activateTab, fetchActionKinds, sendFileToApi } from '../actions';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { Actions } from 'react-native-router-flux';
import Attachment from './assets/Attachment';
import Kameo from './assets/Kameo';
import LinkCard from './LinkCard';
import SmallCard from './SmallCard'
import * as utilities from '../lib/Utilities';
import TimeFormatter from 'minutes-seconds-milliseconds';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Footer from './common/Footer'
import StylishInput from './common/StylishInput'
import TabBar from './TabBar';


// import * as actions from '../actions';

class Info extends Component {
  renderKanbanInfo(kanbanName){
    if (kanbanName) {
      return <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => Actions.kanbanList()}>{kanbanName}</LinkCard>
    }
  }
  renderCardInfo(card){
    if (card) {
        return (<SmallCard
                  customStyle={{margin: 5, padding:3,
                                fontSize: 8, alignSelf: 'stretch',
                                backgroundColor: '#8CCDF8'}}
                  onPress={() => Actions.cardList()}
                />)

    }
  }

  renderProject(projectName){
    if (projectName){
      return (
        <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => this.props.activateTab('projects')}>{projectName}</LinkCard>
      )
    }
  }

  renderClient(client){
    if (client){
      return (
        <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => this.props.activateTab('client')}>{client}</LinkCard>
      )
    }
  }

  showDocumentPicker(){
    DocumentPicker.show({
        filetype: [DocumentPickerUtil.images()],
      },(error,res) => {
        // console.log('in picker')
        // console.log(Object.getOwnPropertyNames(res))
        // console.log(res.fileName)
        // console.log(res.type, res.uri)
        this.props.sendFileToApi(this.props.eventId, res)
        // this.props.sendFileToA
      });
  }


  formatDuration(ms){
    let time = new Date(ms);
    let hours = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
    let minutes = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
    let seconds = time.getUTCSeconds() < 10 ? `0${time.getUTCSeconds()}` : time.getUTCSeconds();
    return hours + ":" + minutes + ":" + seconds
  }

  renderKameoButton(){
    const {svgStyle} = styles
    if (this.props.kanbans){
      if (this.props.kanbans.length > 0){
        return (
          <TouchableOpacity onPress={()=> Actions.kanbanList()}>
            <Kameo style={svgStyle} fill='red'/>
          </TouchableOpacity>
        )
      }
    }
  }
  renderCommentInput(){
    if (Platform.OS === 'ios'){
      return (
        <StylishInput
          style={{height: 40, width: '100%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
          placeholder="Comments"
          onChangeText={(comment) => this.props.updateEventComment(comment)}
          value={this.props.comment}
        />
      )
    }
    else {
      return (
        <TextInput
          style={{height: 40, width: '100%' }}
          placeholder="Comments"
          onChangeText={(comment) => this.props.updateEventComment(comment)}
          value={this.props.comment}
        />
      )
    }
  }
  render() {
    const {comment, hour, minute, kindName, clientName, projectName, projectId, timerKind, duration, eventId, kanbanName, card} = this.props
    const {containerStyle, formWrapperStyle, footerStyle, svgStyle} = styles
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    else {
      return (

        <View style={containerStyle}>
          <TabBar/>
          <View style={formWrapperStyle}>
            {this.renderClient(clientName)}
            {this.renderProject(projectName)}
            <LinkCard customStyle={{margin: 5, padding:3}}  onPress={() => this.props.activateTab('time')}>{this.formatDuration(duration)}</LinkCard>
            <LinkCard customStyle={{margin: 5, padding:3}} onPress={() => this.props.fetchActionKinds()}>{kindName}</LinkCard>
            <View style={{flexDirection: 'row', width: '100%'}}>
              {this.renderKanbanInfo(kanbanName)}
              {this.renderCardInfo(card)}
            </View>
            {this.renderCommentInput()}
          </View>
          <Footer>
            <View style={styles.footerButtonsWrapper}>
              <TouchableOpacity onPress={()=>{this.showDocumentPicker()}}>
                <Attachment style={svgStyle} fill="#8CCDF8"/>
              </TouchableOpacity>
              {this.renderKameoButton()}
              <Button customStyle={styles.footerButtonStyle}onPress={()=>  this.props.updateEvent('subject', comment, duration, timerKind, eventId)} >SAVE</Button>
            </View>
          </Footer>
        </View>

    )
    }
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
  const event = state.eventsData.currentEvent
  if (event){
    let comment
    if (state.eventsData.currentEventComment == ""){
      comment = ""
    }
    else if (state.eventsData.currentEventComment == null && event.subject == null){
      comment = ""
    }
    else if (state.eventsData.currentEventComment){
      comment = state.eventsData.currentEventComment
    }
    else {
      comment = event.subject
    }
    return { hour: event.duration.selectedHour,
             minute: event.duration.selectedMinute,
             duration: event.duration,
             timerKind: event.measure_kind,
             clientId: event.client_id,
             clientName: event.client__name ? event.client__name : 'client',
             projectName: event.project__name,
             projectId: event.project_id,
             kindName: event.kind__name ? event.kind__name : "Actions",
             comment: comment ,
             eventId: event.id,
             kanbanName: event.kanban__name,
             kanbanId: event.kanban_id,
             card: state.eventsData.currentEventCard,
             kanbans: state.kanbans.list,
             loading: state.loading
          };
  }
  else{
    return { hour: '',
             minute: '',
             action: "Actions",
             comment: state.eventsData.currentEventComment,
             loading: state.loading
            };
  }
};



export default connect(mapStateToProps, { updateEvent,  updateEventComment, loadProjectKanbans, activateTab, fetchActionKinds, sendFileToApi})(Info);
