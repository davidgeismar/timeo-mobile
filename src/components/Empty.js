import React, { Component } from 'react';
import { View, Text} from 'react-native'
import Avatar from './Avatar'
import Absent from './assets/Absent'
import Tab from './Tab'

// import * as actions from '../actions';
class Empty extends Component {

  render() {
    return (
      <View >

      </View>
    )

  }
}


export default Empty

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
