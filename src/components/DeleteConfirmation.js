import React, { Component } from 'react';
import { View, Text} from 'react-native'
import { connect } from 'react-redux';
import Spinner from './common/Spinner';
import Footer from './common/Footer';
import Button from './common/Button';
import { Actions } from 'react-native-router-flux'
import { deleteEvent } from '../actions';

// import * as actions from '../actions';

class DeleteConfirmation extends Component {
  formatDuration(ms){
    let time = new Date(ms);
    let hours = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
    let minutes = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
    let seconds = time.getUTCSeconds() < 10 ? `0${time.getUTCSeconds()}` : time.getUTCSeconds();

    return hours + ":" + minutes + ":" + seconds
  }

  renderClient(){
    if (this.props.eventToDelete.client__name){
      return(
        <Text style= {{color: 'white'}}>
          {this.props.eventToDelete.client__name}
        </Text>
      )
    }
  }
  renderProject(){
    if (this.props.eventToDelete.project__name){
      return(
        <Text style= {{color: 'white'}}>
          {this.props.eventToDelete.project__name}
        </Text>
      )
    }
  }

  renderDuration(){
    if (this.props.eventToDelete.duration){
      return(
        <Text style= {{color: 'white'}}>
          {this.formatDuration(this.props.eventToDelete.duration)}
        </Text>
      )
    }
  }
  render() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    else {
      return (
        <View style={styles.containerStyle}>
          <Text style={{color: 'white', fontSize: 25, marginBottom: 10, marginTop: '40%'}}>
            Delete this? Really?
          </Text>
          {this.renderClient()}
          {this.renderProject()}
          {this.renderDuration()}
          <Footer customStyle={{backgroundColor: '#E62B5A'}} >
            <View style={styles.footerButtonsWrapper}>
              <Button customStyle={styles.footerButtonStyle} onPress={()=>Actions.events()}>NO</Button>
              <Button customStyle={styles.footerButtonStyle} onPress={()=> this.props.deleteEvent(this.props.eventToDelete.id)}>YES</Button>
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
  console.log('in mapStateToProps DeleteConfirmation')
  console.log(state)
  return {
    loading: state.loading,
    eventToDelete: state.eventsData.eventToDelete
  }
}

export default connect(mapStateToProps, {deleteEvent})(DeleteConfirmation)

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
