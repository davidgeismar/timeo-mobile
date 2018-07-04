
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'

// import * as actions from '../actions';

class LinkCard extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} canBeActivated={this.props.canBeActivated} activationKey={this.props.activationKey}>
        <View style={[styles.containerStyle, this.props.customStyle]}  backgroundColor={this.props.active ? '#8CCDF8' : 'white'}>
          <Text style={[styles.textStyle, {color: this.props.active ? 'white' : 'black'}]}>
            {this.props.children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    borderColor: '#8CCDF8',
    borderWidth: 2,
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
  console.log('in mapstatetoprops LinkCard')
  console.log(ownProps)
  console.log(state)
  let active;
   if (ownProps.canBeActivated && state.selectedAction == ownProps.activationKey){
     console.log('in active LinkCard')
      active = true
   }
   else if (state.kanbans.selectedKanban){
     if (ownProps.canBeActivated && state.kanbans.selectedKanban.id == ownProps.activationKey){
       console.log('in active LinkCard kanban')
        active = true
     }
   }
   else {
     active = false
   }
   return { active }
};

export default connect(mapStateToProps, null)(LinkCard);
