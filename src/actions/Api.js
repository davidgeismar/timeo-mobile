  import 'babel-polyfill';
  import axios from 'axios';

  export default axios.create({
    baseURL: 'https://staging.obeya.io'
  });
