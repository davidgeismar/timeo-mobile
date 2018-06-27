import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'


// import * as actions from '../actions';

const Tab = ({ onPress, children }) => {
  const { buttonStyle, textStyle, tabStyle, viewStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={onPress}  style={tabStyle}>
      <View style={viewStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
}
const styles = {
  tabStyle: {
    borderColor: 'black',
    borderWidth: 1
  },
  textStyle: {
    borderColor: 'black',
    borderWidth: 1
  },
  viewStyle: {
    borderColor: 'black',
    borderWidth: 1
  }
};


export default Tab

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
