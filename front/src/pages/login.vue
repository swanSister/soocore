<template>
  <div class="flex auto column">
    <div class="title">soocore</div>

    <a ref="kakaoLoginBtn" id="kakao-login-btn" style="margin-top:8vw;"></a>

  </div>
</template>
<script>
import KakaoLogin from 'vue-kakao-login'
import axios from 'axios'
export default {
  components: {
    KakaoLogin
  },
  data () {
    return {
      isInvite:false,
    }
  },
  methods: {
    onSuccess(data){
      console.log(data.access_token)
      this.$store.commit('kakaoToken', data.access_token)
      this.$store.commit('kakaoTokenRefresh', data.refresh_token)
      this.getUserInfo(data.access_token)
    },
    onFailure(data){
      console.log("####onfailuer")
    },
    async getUserInfo(token){
      try{
        let userData = await this.$api.getKakaoUserInfo(token)
        console.log(userData)
        if(userData.data.access_token){
          this.$store.commit('accessToken', userData.data.access_token)
          this.$store.commit('me', {id:userData.data.id, name:userData.data.name})
          if(this.isInvite){
            this.$router.push({ name: 'invite', query: { id: this.$route.query.id }})
          }else{
            this.$router.push('main')
          }
        }
      }catch(e){
        console.error(e.message)
      }
    },
    kakaoLogin(){
      Kakao.Auth.createLoginButton({
        container: this.$refs.kakaoLoginBtn,
        success: this.onSuccess,
        fail: this.onFailure
      });
    }
  },
  async mounted(){
    this.kakaoLogin()
    if(this.$route.query.id){
      this.isInvite = true
      if(this.$store.state.accessToken &&  this.$store.state.kakaoToken){
        this.$router.push({ name: 'invite', query: { id: this.$route.query.id }})
      }
    }else if(this.$route.query.code){
      let res =  await this.$api.getKakaoTokenByCode(this.$route.query.code)
      console.log("####newtoken", res.data.kakaoToken)
      this.$store.commit('kakaoToken', res.data.kakaoToken)
      this.$router.push({name:'main'})
    }else{
      if(this.$store.state.accessToken &&  this.$store.state.kakaoToken){
        this.$router.push('main')
      }
    }
  }
}
</script>
 
<style>
</style>