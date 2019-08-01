
<script>
import axios from 'axios'
const API_URL = "https://api.soocore.com"
const KAKAO_AUTH_URL = "https://kauth.kakao.com"
let ctx = {}
export default {
  install(Vue, options){
    ctx.store = options.store
  },
  sendKakaoMessage:function(sendData){
    let param = {kakaoToken: ctx.store.state.kakaoToken, data:sendData}
    return axios.post(`${API_URL}/users/sendKakaoMessage`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  getKakaoFrinds:function(){
    let param = {kakaoToken: ctx.store.state.kakaoToken}
    return axios.post(`${API_URL}/users/getKakaoFriends`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  refreshKakaoToken: function(){
  let param = {kakaoTokenRefresh: ctx.store.state.kakaoTokenRefresh}
      return axios.post(`${API_URL}/users/refreshKakaoToken`,param,{
        headers: {
          Authorization: ctx.store.state.accessToken,
        }
      })
  },
  getKakaoTokenByCode:function(code){
    let param = {code: code}
    return axios.post(`${API_URL}/users/getKakaoTokenByCode`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
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
  //sections
  createSections: function(param) {
    return axios.post(`${API_URL}/sections/create`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  deleteSection: function(param){
     return axios.post(`${API_URL}/sections/delete`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  acceptSections: function(param) {
    return axios.post(`${API_URL}/sections/accept`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  getSections: function() {
    return axios.get(`${API_URL}/sections/get`,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  getSectionDetail: function(param) {
    return axios.post(`${API_URL}/sections/detail`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  getInvitedSection: function(param) {
    return axios.post(`${API_URL}/invite/get`,param, {
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  signUpload:function(file,filename){
    let formData = new FormData()
    formData.append('sign', file)
    axios.post(`${API_URL}/images/${filename}`, formData,{
      headers: {
        Authorization: ctx.store.state.accessToken,
       'content-type': 'multipart/form-data' // do not forget this 
      }
    })
  },
  //score
  createScore: function(param) {
    return axios.post(`${API_URL}/score/create`,param,{
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  getScore: function(param) {
    return axios.post(`${API_URL}/score/get`,param, {
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  getWaitScore: function(param) {
    return axios.post(`${API_URL}/score/getWait`,param, {
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  approveScore: function(param) {
    return axios.post(`${API_URL}/score/approve`,param, {
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
  deleteScore: function(param) {
    return axios.post(`${API_URL}/score/delete`,param, {
      headers: {
        Authorization: ctx.store.state.accessToken,
      }
    })
  },
}
</script>