<template>
  <div id="app">
    <KakaoLogin
      api-key="9722190d232d6bdad6cade31c9b8b0bb"
      image="kakao_login_btn_large"
      :on-success="onSuccess"
      :on-failure="onFailure"
      />
  </div>
</template>
 
<script>
import KakaoLogin from 'vue-kakao-login'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    KakaoLogin
  },
  methods: {
    onSuccess(data){
      console.log(data)
      console.log("success")
      this.getUserInfo(data.access_token)
    },
    onFailure(data){
      console.log(data)
      console.log("failure")
      this.sendLogin()
    },
    async getUserInfo(token){
      let userData = await this.$api.getKakaoUserInfo(token)
      console.log(userData)
    },
    async sendLogin(){
      console.log("sendlogin")
      let res = await this.$api.login({
        'id':'bbbbb',
        'name':'bbbbb',
        'phoneNumber':'bbbbb',
      }) 
    },
  }
}
</script>
 
<style>
</style>