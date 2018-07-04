

//  TO DELETE PROBABLY
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import LinkCard from './LinkCard';
import {Actions} from 'react-native-router-flux';

// import Utilities from '../lib/Utilities'


class Client extends Component {

  render() {
    // destructuring
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={[containerStyle, this.props.customStyle]}>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderColor: '#8CCDF8',
    borderWidth: 2
  }
};



export default connect(null, actions)(Client);
