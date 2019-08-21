import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    me: localStorage.me ? JSON.parse(localStorage.me):{id: '', name: ''},
    mode:localStorage.mode ? localStorage.mode : '',
    accessToken: localStorage.accessToken ? localStorage.accessToken : '',
    kakaoToken: localStorage.kakaoToken ? localStorage.kakaoToken : '',
    kakaoTokenRefresh: localStorage.kakaoTokenRefresh ? localStorage.kakaoTokenRefresh : '',
  },
  mutations: {
    mode (state, value) { 
      localStorage.setItem('mode',value) 
      state.mode = value 
    },
    accessToken (state, value) { 
      localStorage.setItem('accessToken',value) 
      state.accessToken = value 
    },
    kakaoToken (state, value) { 
      localStorage.setItem('kakaoToken',value) 
      state.kakaoToken = value 
    },
    kakaoTokenRefresh (state, value) { 
      localStorage.setItem('kakaoTokenRefresh',value) 
      state.kakaoTokenRefresh = value 
    },
    me (state, value) {
      localStorage.setItem('me',JSON.stringify(value)) 
      state.me = value
    },
  }
})

export default store
