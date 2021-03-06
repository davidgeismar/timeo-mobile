
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Image, TextInput, Platform, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import { loginUser, authUpdate, fetchImageOfTheDay} from '../actions';
import { Actions } from 'react-native-router-flux'
import StylishInput from './common/StylishInput';
import Spinner from './common/Spinner';
import Great from './assets/Great'
import Happy from './assets/Happy'
import None from './assets/None'
import Sad from './assets/Sad'
import Stressed from './assets/Stressed'
import Tired from './assets/Tired'
import Sick from './assets/Sick'
import Displeased from './assets/Displeased'
import Angry from './assets/Angry'
import Absent from './assets/Absent'

class LoginForm extends Component {
  componentWillMount(){
    this.props.fetchImageOfTheDay()
  }
  loginUser(mood){
    this.setState({
      loading: true
    });
    this.props.loginUser({username: this.props.username, password: this.props.password, mood: mood})
  }

  renderError(){
    if (this.props.error){
      return <Text style={styles.errorStyle}>{this.props.error}</Text>
    }
  }
  renderForm(){
    if (Platform.OS === 'ios'){
      return (
        <View style={{width: '100%'}}>
          <StylishInput
            style={{height: 40, width: '60%', borderBottomColor: 'grey', borderBottomWidth: 1, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}
            value={this.props.username}
            placeholder="Login"
            onChangeText={text => this.props.authUpdate({prop: 'username', value: text})}
          />
          <StylishInput
            style={{height: 40, width: '60%', borderBottomColor: 'grey', borderBottomWidth: 1, color: 'white', alignSelf: 'center', fontWeight: 'bold'}}
            secureTextEntry={true}
            placeholder="Password"
            value={this.props.password}
            onChangeText={text => this.props.authUpdate({prop: 'password', value: text})}
          />
        </View>
      )
    }
    else {
      return (
        <View style={{width: '100%'}}>
        <TextInput
          style={{height: 50, width: '60%', alignSelf: 'center', color: 'white', fontWeight: 'bold' }}
          value={this.props.username}
          placeholder="Login"
          placeholderTextColor= 'white'
          onChangeText={text => this.props.authUpdate({prop: 'username', value: text})}
        />
        <TextInput
          style={{height: 50, width: '60%', color: 'white', alignSelf: 'center', fontWeight: 'bold'}}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor= 'white'
          value={this.props.password}
          onChangeText={text => this.props.authUpdate({prop: 'password', value: text})}
        />
        </View>
      )
    }
  }
  render() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    else {
      return (
        <ImageBackground style={styles.containerStyle} source={{uri: this.props.backgroundImage ? this.props.backgroundImage : ""}}>
              {this.renderForm()}
              <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
                <ScrollView horizontal={true}>
                  <TouchableOpacity onPress={() => this.loginUser('great')}>
                    <Great style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('happy')}>
                    <Happy style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('none')}>
                    <None style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('sad')}>
                    <Sad style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('stressed')}>
                    <Stressed style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('tired')}>
                    <Tired style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('tired')}>
                    <Sick style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('tired')}>
                    <Displeased style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('tired')}>
                    <Angry style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.loginUser('tired')}>
                    <Absent fill="#ef5350" style={{height: 50, width: 50}}/>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              {this.renderError()}
        </ImageBackground>
      )
    }
  }
}

const styles = {
  containerStyle: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorStyle: {
    color: 'red',
    marginTop: 25
  }
};

const mapStateToProps = (state, ownProps) => {
  const { username, password } = state.authentication;
  const {error, loading, backgroundImage} = state
  return { username, password, error, loading, backgroundImage };
};

export default connect(mapStateToProps, { loginUser, authUpdate, fetchImageOfTheDay })(LoginForm);
