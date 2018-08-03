
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import Avatar from './Avatar'
// import * as actions from '../actions';

class SmallCard extends Component {

  setBackgroundColor(card_type){
    switch(card_type) {
      case 'task':
        return '#51B8F3'
      case 'support':
        return '#E66C72'
      case 'issue':
        return '#F8C67A'
      case 'improvement':
        return '#9AD5E2'
      case 'ticket_support':
      return '#E66C72'
      }
  }

  userThumbUrl(affected_to_id){
    if (this.props.resources.length > 0 ){
      const affectedTo = this.props.resources.find((resource) => resource.id == affected_to_id)
      if (affectedTo){
        return affectedTo.user_info.logo_thumb
      }
      else {
        return ""
      }
    }
    else {
      return ""
    }
  }
  render() {
    const { card } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress} >
        <View style={[styles.containerStyle, this.props.customStyle]}
              backgroundColor={this.setBackgroundColor(card.card_type)}>
          <Avatar
              size="small"
              rounded
              source={{uri: this.userThumbUrl(card.affected_to_id)}}
              activeOpacity={0.7}
              />
          <Text style= {{fontSize: 9, color: 'white'}}>
            {card.client__name} {card.project__name} {"\n"} > {card.subject} {card.reference}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#8CCDF8',
    borderWidth: 2,
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  return {
    card: state.eventsData.currentEventCard,
    resources: state.resources.resources
  }
}

export default connect(mapStateToProps, null)(SmallCard);
