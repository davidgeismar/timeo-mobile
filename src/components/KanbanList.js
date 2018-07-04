
import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { setCurrentKanban, saveKanban, removeSelectedKanban } from '../actions';
import Button from './common/Button';
import Footer from './common/Footer';
import LinkCard from './LinkCard';
import Header from './Header';

class KanbanList extends Component {

  renderKanbans(){
    console.log('in renderKanbans')
    console.log(this.props.kanbans)
    return this.props.kanbans.map(
      kanban => <LinkCard
                          customStyle={{width: '47%', height: 60, margin: 5}}
                          onPress={()=> this.props.setCurrentKanban(kanban)}
                          canBeActivated={true}
                          activationKey={kanban.id}
                          >
                  {kanban.name}
                </LinkCard>
    )
  }

  saveKanban(){
    console.log('in savekanban')
    console.log(this.props.eventId)
    console.log(this.props.selectedKanban)
    this.props.saveKanban(this.props.eventId, this.props.selectedKanban)
  }
  render() {
    const { kanbanHeaderStyle, containerStyle, kanbansWrapperStyle, footerStyle} = styles
    return (

      <View style={containerStyle}>
        <View style={kanbanHeaderStyle}>
          <Text style={{color: '#8CCDF8', alignSelf: 'center'}}>
            SELECT A KANBAN
          </Text>
        </View>
        <View style={kanbansWrapperStyle}>
          {this.renderKanbans()}
        </View>
        <Footer customStyle={{backgroundColor: '#E62B5A'}}>
          <View style={styles.footerButtonsWrapper}>
            <Button customStyle={styles.footerButtonStyle} onPress={() => this.props.removeSelectedKanban()}>CANCEL</Button>
            <Button disabled={this.props.disabled} customStyle={styles.footerButtonStyle} onPress={()=> this.saveKanban()}>SAVE</Button>
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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  kanbanHeaderStyle: {
    alignSelf: 'flex-start',
    borderBottomColor: '#E62B5A',
    borderBottomWidth: 1,
    padding: 5,
    marginLeft: 30,
    height: 40
  },
  kanbansWrapperStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '100%'
  },
  footerButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerButtonStyle: {
    width: 180
  }
};


const mapStateToProps = (state) => {
    console.log('in mapStateToProps kanbans')
  console.log(state)
  const disabled = state.kanbans.selectedKanban ? false : true
  return { kanbans: state.kanbans.list,
           selectedKanban: state.kanbans.selectedKanban,
           eventId: state.eventsData.currentEventId,
           disabled: disabled
         }
}
export default connect(mapStateToProps, { setCurrentKanban, saveKanban, removeSelectedKanban } )(KanbanList);
