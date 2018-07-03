
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux'
import Button from './common/Button';
import StylishInput from './common/StylishInput';

// import * as actions from '../actions';

class LoginForm extends Component {

  render() {
    return (
      <View style={styles.containerStyle}>

        <StylishInput
          style={{height: 40, width: '60%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
          placeholder="Login"
        />

        <StylishInput
          style={{height: 40, width: '60%', borderBottomColor: 'grey', borderBottomWidth: 1 }}
          placeholder="Password"
        />
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 15,
    color: 'black',
    alignSelf:'center',
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('in mapstatetoprops LoginForm')
  return {}
};

export default connect(mapStateToProps, actions)(LoginForm);
