
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Alert, Modal, TouchableHighlight, Image} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { deleteActionFile } from '../actions';
import Close from './assets/Close'
import TimeFormatter from 'minutes-seconds-milliseconds'
import * as utilities from '../lib/Utilities';
import env from 'react-native-config';


class File extends Component {
  constructor(props) {
   super(props);
   this.state = {modalVisible: false};
 }
  confirmDelete(fileId, eventId){
    Alert.alert(
    'Delete File',
    'Are you sure ?',
    [
      {text: 'Yes', onPress: () => this.props.deleteActionFile(eventId, fileId)},
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    ],
    { cancelable: false }
  )
  }
  setModalVisible(visible) {
   this.setState({modalVisible: visible});
  }
  render() {
    const { textWrapperStyle, svgStyle, containerStyle, textStyle } = styles
    console.log("FILE URL", env.S3_PREFIX + this.props.file.url.replace(/.*(?=paperclip_assets)/i, ""))
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View>
                <Image
                  style={{width: 200, height: 200}}
                  source={{uri: env.S3_PREFIX + this.props.file.url.replace(/.*(?=paperclip_assets)/i, "")}}
                />

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
              </View>
          </View>
        </Modal>
        <TouchableOpacity style={[containerStyle, this.props.customStyle]} onPress={() => {this.setModalVisible(true);}}>
          <View style={textWrapperStyle}>
            <Text>
              {this.props.file.title}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.confirmDelete(this.props.file.id, this.props.eventId)}>
          <Close style={styles.svgStyle} fill='red'/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderColor: '#8CCDF8',
    borderWidth: 2
  },
  textWrapperStyle: {
    height: '100%',
    padding: 5
  },
  textStyle: {
    fontSize: 8,
    alignSelf:'center',
  },
  svgStyle: {
    width: 30,
    height: 30
  }
};



export default connect(null, { deleteActionFile })(File);
