
  import axios from 'axios';

  export default axios.create({
    //baseURL: 'https://staging.obeya.io'
    baseURL: 'http://dev.obeya.local:8080'
  });
