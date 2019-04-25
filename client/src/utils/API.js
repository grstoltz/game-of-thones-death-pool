import axios from 'axios';

export default {
  getUser: function(id) {
    return axios.get(`https://deathpool.appspot.com/api/user/${id}`);
  },
  getPool: function(id) {
    return axios.get(`https://deathpool.appspot.com/api/pool/${id}`);
  }
};
