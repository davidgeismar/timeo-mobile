import React, { Component } from 'react';
import { View, Text} from 'react-native'
import Avatar from './Avatar'
import Absent from './assets/Absent'
import Tab from './Tab'

// import * as actions from '../actions';
class Stat extends Component {

  render() {
    return (
      <View style={styles.monthlyStatsLine}>
        <Text>
        2018
        </Text>
        <Text>
        June
        </Text>
        <Text>
          Actions: 2 Total: 10mn
        </Text>
      </View>
    )
  }
}


export default Stat
