  import 'babel-polyfill';
  import axios from 'axios';
  import env from 'react-native-config'

  export default axios.create({
    baseURL: env.API_HOST
  });
