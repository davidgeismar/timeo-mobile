import React, { Component } from 'react';
import { View} from 'react-native'
import { connect } from 'react-redux';




// import * as actions from '../actions';

class Header extends Component {

  render() {
    return (
      <View style={styles.containerStyle}>
        {this.props.children}
      </View>
    )

  }
}

const styles = {
  containerStyle: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FCFCFC',
  }
};



export default Header

// const mapStateToProps = state => {
//   console.log('in mapstatetoprops authorlist')
//   console.log(state.authorsData)
//   return { authorsData: state.authorsData };
// };
//
// export default connect(mapStateToProps, actions)(AuthorList);
