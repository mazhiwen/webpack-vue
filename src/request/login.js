import axios from './axiosConfig';

export default {
  login: () => 
    axios.get('v1/login', {
      params: {
        ID: 12345,
      },
      data: {
        aaa: 2,
      },
    })
  ,
  loginpost: (data) => 
    axios.post('v1/login', data)
  ,
  testMock:(data)=>
    axios.get('', data)
};
