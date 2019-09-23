  import 'babel-polyfill';
  import axios from 'axios';
  // import env from 'react-native-config'

  export default axios.create({
    // baseURL: env.API_HOST
    baseURL: 'http://192.168.43.92:3000'
  });
