import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import Avatar from './Avatar';
import Footer from './common/Footer';
import Button from './common/Button';
import {Actions} from 'react-native-router-flux'
import Chrono from './assets/Chrono';
import * as actions from '../actions';

// import * as actions from '../actions';

class DeleteConfirmation extends Component {
  render() {
    return (
      <View style={styles.containerStyle}>
        <Text style={{color: 'white', fontSize: 25, marginBottom: 10, marginTop: '40%'}}>
          Delete this? Really?
        </Text>
        <Text style= {{color: 'white'}}>
          1h5min
        </Text>
        <Footer customStyle={{backgroundColor: '#E62B5A'}} >
          <View style={styles.footerButtonsWrapper}>
            <Button customStyle={styles.footerButtonStyle} onPress={()=>Actions.events()}>NO</Button>
            <Button customStyle={styles.footerButtonStyle} onPress={()=> this.props.deleteEvent(this.props.eventId)}>YES</Button>
          </View>
        </Footer>
      </View>
    )

  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E62B5A',
    alignContent: 'baseline',
    alignItems: 'center'
  },
  footerButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonStyle: {
    width: 180
  },
};

const mapStateToProps = (state) => {

  return {

  }
}

export default connect(mapStateToProps, actions)(DeleteConfirmation)

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
