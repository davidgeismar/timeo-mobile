  import 'babel-polyfill';
  import axios from 'axios';


  if (__DEV__) {
    const baseUrl = 'http://192.168.43.92:3000';
  }
  else {
    const baseUrl = 'https://staging.obeya.io';
  }

  export default axios.create({
    baseURL: 'http://192.168.43.92:3000'
  });
