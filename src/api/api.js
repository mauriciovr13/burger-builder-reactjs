import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-a1316.firebaseio.com/'
});

export default instance;