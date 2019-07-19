<template>
  <div class="flex auto column">
    <div class="title">soocore</div>
    <KakaoLogin
      style="margin-top:8vw;"
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
  components: {
    KakaoLogin
  },
  methods: {
    onSuccess(data){
      this.getUserInfo(data.access_token)
    },
    onFailure(data){
    },
    async getUserInfo(token){
      try{
        let userData = await this.$api.getKakaoUserInfo(token)
        console.log(userData)
        if(userData.data.id){
          this.$router.push('main')
        }
      }catch(e){
        console.error(e.message)
      }
    },
  }
}
</script>
 
<style>
</style>