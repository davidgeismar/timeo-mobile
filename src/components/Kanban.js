
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import { setCurrentKanban } from '../actions';
import { Actions } from 'react-native-router-flux'

// import * as actions from '../actions';

class Kanban extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={() =>this.props.setCurrentKanban(this.props.currentKanbanId) }>
        <View style={styles.containerStyle} backgroundColor={this.props.active ? '#8CCDF8' : 'white'}>
          <Text style={[styles.textStyle, {color: this.props.active ? 'white' : '#8CCDF8'}]}>
            {this.props.children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    width: '90%',
    height: 150,
    margin: 10,
    borderColor: '#8CCDF8',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 50,
    alignSelf:'center',
  }
};

const mapStateToProps = (state, ownProps) => {
  const event = state.eventsData.currentEvent
  let active;
  if (event) {
     if ((event.selectedKanban.id == ownProps.id){
        active = true
     }
     else {
       active = false
     }
   }
   return { active, currentEventId: state.eventsData.currentEventId }
};

export default connect(mapStateToProps, { setCurrentKanban } )(Kanban);
