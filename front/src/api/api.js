
import axios from 'axios'
const API_URL = "http://18.182.214.16:3002"

export default {
  getKakaoUserInfo:function(token){
     return axios.get(`${API_URL}/users/kakaoUserInfo`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
  },
  login: function(param) {
    return axios.post(`${API_URL}/users/login`,param,{
      headers: {
          'Content-Type': 'application/json',
        }
    })
  },
 
}