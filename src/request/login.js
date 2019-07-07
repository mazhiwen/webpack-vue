import axios from './axiosConfig';

export default {
  login: () => {
    axios.get('v1/login');
  },
};
