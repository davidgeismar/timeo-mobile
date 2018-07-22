
  import axios from 'axios';

  export default axios.create({
    baseURL: 'http://staging.obeya.xair.cloud'
  });
  // (async function getToken() {
  //   console.log('in getTOOOOKENNN')
  //   await AsyncStorage.getItem('token')
  //     .then((token) => {
  //       console.log('setting token')
  //       console.log(token)
  //       Server.defaults.headers.common['Authorization'] = token === null ? '' : token;
  //     });
  // })()
