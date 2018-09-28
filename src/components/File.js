
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Alert} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { deleteActionFile } from '../actions';
import Close from './assets/Close'
import TimeFormatter from 'minutes-seconds-milliseconds'
import * as utilities from '../lib/Utilities';


class File extends Component {
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

  render() {
    const { textWrapperStyle, svgStyle, containerStyle, textStyle } = styles
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={[containerStyle, this.props.customStyle]}>
          <View style={textWrapperStyle}>
            <Text>
              {this.props.file.title}
            </Text>
          </View>
        </View>
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
