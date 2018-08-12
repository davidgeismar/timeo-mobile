
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Dimensions} from 'react-native'
import { connect } from 'react-redux';
import { setCurrentCard, changeCardListScope, getResources } from '../actions';
import { Actions } from 'react-native-router-flux'
import Avatar from './Avatar';
import Card from './Card';

// import * as actions from '../actions';

class CardBlock extends Component {

  componentWillMount(){
    this.setState({
      visible: true
    })
  }

  hideCardBlock(){
    this.setState({
      visible: false
    })
  }
  showCardBlock(){
    this.setState({
      visible: true
    })
  }

  // userThumbUrl(affected_to_id){
  //   if (this.props.resources){
  //     if (this.props.resources.resources.length > 0 ){
  //       const affectedTo = this.props.resources.resources.find((resource) => resource.id == affected_to_id)
  //       console.log('userThumbUrl')
  //       console.log(affectedTo)
  //       if (affectedTo && affectedTo.user_info.logo_thumb){
  //         return affectedTo.user_info.logo_thumb
  //       }
  //       else {
  //         return ""
  //       }
  //     }
  //     else {
  //       return ""
  //     }
  //   }
  //   else {
  //     return ""
  //   }
  // }

  renderAvatar(affected_to_id){
    if (this.props.resources){
      if (this.props.resources.resources.length > 0 ){
        const affectedTo = this.props.resources.resources.find((resource) => resource.id == affected_to_id)
        console.log('userThumbUrl')
        console.log(affectedTo)
        if (affectedTo && affectedTo.user_info.logo_thumb.length > 0 ){
          return   <Avatar
              size="small"
              rounded
              source={{uri: affectedTo.user_info.logo_thumb}}
              onPress={() => Actions.events()}
              activeOpacity={0.7}
              />
        }
        else if (affectedTo){
          console.log('future')
          return <View style={{borderRadius:20, backgroundColor: 'grey', height: 40, width: 40}}>
                    <Text style={{justifyContent: 'center', alignSelf: 'center'}}>
                      {affectedTo.first_name[0]} {affectedTo.last_name[0]}
                    </Text>
                  </View>
        }
        else {
          return <View style={{borderRadius:20, backgroundColor: 'grey', height: 40, width: 40}}>
                  </View>
        }
      }
      else {
        return ""
      }
    }
    else {
      return ""
    }
  }
  renderCards(cards){
    return cards.map(
              card => <Card
                        customStyle={{width: 300, height: 80, margin: 5,}}
                        onPress={()=> this.props.setCurrentCard(card)}
                        canBeActivated={true}
                        activationKey={card.id}
                        card_type={card.card_type}
                        >
                        <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 4}}>
                          <Text style={{ fontSize: 10, color: 'white'}}>
                            {card.client__name} {card.project__name} > {card.card_type} > {card.reference}
                          </Text>
                          <Text style={{fontSize: 10}}>
                            {card.subject}
                          </Text>
                          <View>
                          {this.renderAvatar(card.affected_to_id)}
                          </View>
                        </View>
                        <Text style={{fontSize: 12, position: 'absolute', top: 3, right: 3, color: 'white'}}>
                          {card.creationDate}
                        </Text>
                      </Card>
                )
  }

  render() {
    if (this.state.visible) {
      return (
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}} >
          <TouchableOpacity style={{position: 'absolute', left: 0, top: 13}} onPress={()=> this.hideCardBlock()}>
            <Text style={{transform: [{ rotate: '-90deg'}], fontSize: 14, color: '#BFBFBF'}}>
              {this.props.status}
            </Text>
          </TouchableOpacity>
          <View style={{borderLeftColor: '#8CCDF8', borderLeftWidth: 2, marginBottom: 10}}>
            {this.renderCards(this.props.cards)}
          </View>
        </View>
      )
    }
    else {
      const marginLeft = ((Dimensions.get("window").width - 300)/2)- 10
      return (
        <View style={{alignSelf: 'flex-start', marginLeft: marginLeft, marginBottom: 10 }}>
          <TouchableOpacity onPress={()=> this.showCardBlock()}>
            <Text style={{fontSize: 14, color: '#BFBFBF'}}>
              {this.props.status}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    logo_thumb: state.user.user_info.logo_thumb,
    resources: state.resources
  }

}

export default connect(mapStateToProps, { setCurrentCard, changeCardListScope, getResources })(CardBlock);
