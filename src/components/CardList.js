
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert} from 'react-native';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { removeSelectedCard, updateEvent, changeCardListScope, searchCards, setErrorState } from '../actions';
import Button from './common/Button';
import Footer from './common/Footer';
import Spinner from './common/Spinner';
import Header from './common/Header';
import LinkCard from './LinkCard';
import CardBlock from './CardBlock';
import Avatar from './Avatar';
import SearchBar from './SearchBar';


// here I would like cardlist to be able to know if searchbar is in expanded state in order to hide some stuff
// in this parent component
// how is it possible to transmit from child to parent without redux that seems

export class UnconnectedCardList extends Component {

  returnCardBlock(cardBucket){
    if (cardBucket.cards.length > 0){
      return <CardBlock cards={cardBucket.cards} status={cardBucket.name}/>
    }
  }
  renderCards(){
    const cards = this.props.cards
    return cards.map(
      cardBucket => this.returnCardBlock(cardBucket)
    )
  }
  renderSwitch(){
    if (!this.props.searchInit){
      const switchValue = this.props.limitToMine ? false : true
      return (
          <Switch
            onValueChange={ (switchValue) => this.props.changeCardListScope(switchValue, this.props.searchPattern, this.props.selectedKanban.id) }
            value={switchValue}
            style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }],   alignSelf: 'center' }}/>
      )
    }
  }

  renderTitle(){
    if (!this.props.searchInit){
      return(
        <View style={{height: '100%', flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: 'red'}}>
          <Text style={{color: '#00AFFA',  alignSelf: 'center', fontSize: 12}}>
            Link to a Kameo Card
          </Text>
        </View>
      )
    }
  }

  renderToggle(){
    if (!this.props.searchInit){
      return (
        <View style={{height: '100%', flexDirection: 'row'}}>
          <Text  style={{color: '#00AFFA', fontSize: 12, alignSelf: 'center'}}>
            my cards
          </Text>
          {this.renderSwitch()}
          <Text  style={{color: '#BFBFBF', fontSize: 12,   alignSelf: 'center'}}>
            all
          </Text>
        </View>
      )
    }

  }

  renderHeader(){
    const {cardHeaderStyle} = styles
    return (
      <Header>
        {this.renderTitle()}
        {this.renderToggle()}
        <View style={{height: '100%', width: this.props.searchInit ? '90%' : 20, flexDirection: 'row',   alignSelf: 'center'}}>
          <SearchBar
            onChangeText={(pattern)=> this.props.searchCards(this.props.selectedKanban.id, pattern, this.props.limitToMine)}
            value={this.props.searchPattern}
            />
        </View>
      </Header>
    )
  }

  saveCard(){
    this.props.updateEvent('card_id', this.props.selectedCard.id, this.props.duration,
                            this.props.measureKind, this.props.eventId, true, false, this.props.selectedCard)
    // this.props.saveCard(this.props.eventId, this.props.selectedCard)
  }
  renderSelectedKanban(){
    if (this.props.selectedKanban){
      return (
        <LinkCard customStyle={{ alignSelf: 'center', width: 300, marginTop: 30, height: 80, marginBottom: 10}} onPress={() => Actions.kanbanList()}>{this.props.selectedKanban.name}</LinkCard>
      )
    }
  }

  renderError(){
    if (this.props.error){
      Alert.alert(
        'An Error occured',
         this.props.error,
        [
          {text: 'Dismiss', onPress: () => this.props.setErrorState(null), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { containerStyle, footerButtonsWrapper, footerButtonStyle} = styles
    if (this.props.loading){
      return <Spinner size="large" />;
    }
    else {
      return (
        <View style={containerStyle}>
          {this.renderHeader()}
          {this.renderSelectedKanban()}
          <ScrollView style={{marginBottom: 130}}>
            {this.renderError()}
            {this.renderCards()}
          </ScrollView>
          <Footer customStyle={{backgroundColor: '#E62B5A'}}>
            <View style={ footerButtonsWrapper }>
              <Button customStyle={ footerButtonStyle } onPress={()=> this.props.removeSelectedCard()}>CANCEL</Button>
              <Button disabled={this.props.disabled} customStyle={footerButtonStyle} onPress={()=> this.saveCard()}>SAVE</Button>
            </View>
          </Footer>
        </View>
      )
    }

  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  footerButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonStyle: {
    width: 170
  },
  cardHeaderStyle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  }
};


const mapStateToProps = (state) => {
  const disabled = state.cards.selectedCard ? false : true
  const event = state.eventsData.currentEvent
  return { cards: state.cards.list,
           selectedKanban: state.kanbans.selectedKanban,
           selectedKanbanName: event ? event.kanban__name : null,
           searchInit: state.cards.searchInit,
           selectedCard: state.cards.selectedCard,
           eventId: state.eventsData.currentEventId,
           limitToMine: state.cards.limitToMine,
           duration: event ? event.duration : null,
           measureKind: event ? event.measure_kind : null,
           disabled: disabled,
           searchPattern: state.cards.searchPattern,
           loading: state.loading,
           error: state.error
         }
}
export default connect(mapStateToProps, { removeSelectedCard, updateEvent, changeCardListScope, searchCards, setErrorState })(UnconnectedCardList);
