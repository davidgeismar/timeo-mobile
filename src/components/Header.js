import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import Avatar from './Avatar';
import { Actions } from 'react-native-router-flux'
import { resetAppInfo } from '../actions';
import Chrono from './assets/Chrono';

// import * as actions from '../actions';

class Header extends Component {
  getCurrentMonth(){
    var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var now       = new Date();
    var monthIndex = now.getMonth();
    var monthName = months[monthIndex]
    console.log(monthName)
    return monthName
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={{flex: 1, flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>this.props.resetAppInfo()}>
            <Chrono style={styles.svgStyle} fill="#8CCDF8"/>
          </TouchableOpacity>
          <Text>{this.getCurrentMonth()}</Text>
          <Text>ACTIONS: {this.props.countEvents}</Text>
          <Text>TOTAL: {this.props.totalTimeSpent} </Text>

          <Avatar
            size="small"
            rounded
            source={{uri: this.props.logo_thumb}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            />
          </View>
      </View>
    )

  }
}

const styles = {
  containerStyle: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    fontFamily: "lato"
  },
  svgStyle: {
    height: 30,
    width: 30
  }
};

const mapStateToProps = (state) => {
  const totalTimeSpent = '10h05'
  return {
    totalTimeSpent: totalTimeSpent,
    countEvents: state.eventsData.events.length,
    logo_thumb: state.user.user_info.logo_thumb
  }
}

export default connect(mapStateToProps, { resetAppInfo })(Header)

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
