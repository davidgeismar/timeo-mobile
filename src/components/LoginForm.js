
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import {loginUser} from '../actions';
import {Actions} from 'react-native-router-flux'
import StylishInput from './common/StylishInput';

import Great from './assets/Great'
import Happy from './assets/Happy'
import None from './assets/None'
import Sad from './assets/Sad'
import Stressed from './assets/Stressed'
import Tired from './assets/Tired'

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
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => this.props.loginUser('great')}>
            <Great style={{height: 50, width: 50}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.loginUser('happy')}>
            <Happy style={{height: 50, width: 50}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.loginUser('none')}>
            <None style={{height: 50, width: 50}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.loginUser('sad')}>
            <Sad style={{height: 50, width: 50}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.loginUser('stressed')}>
            <Stressed style={{height: 50, width: 50}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.loginUser('tired')}>
            <Tired style={{height: 50, width: 50}}/>
          </TouchableOpacity>
        </View>
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
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('in mapstatetoprops LoginForm')
  return {}
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
