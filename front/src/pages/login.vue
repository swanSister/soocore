<template>
  <div class="flex auto column">
    <div class="title">soocore {{$store.state.mode}}</div>
    <img @click="kakaoLogin" src="../assets/kakao-login-button.png" style="margin-left:10%; width:80%; margin-top:8vw;"/>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {
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
      if(data.refresh_token){
        this.$store.commit('kakaoTokenRefresh', data.refresh_token)
      }
      this.getUserInfo(data.access_token)
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
    async kakaoLogin(){
      this.$eventBus.$emit("showLoading")
      let res = await this.$api.kakaoLogin()
      if(res.data.code=='success'){
        window.location.href = res.data.uri
      }
      this.$eventBus.$emit("hideLoading")
    }
  },
  async mounted(){
    this.$eventBus.$emit("showLoading")
    if(this.$route.query.id && this.$store.state.accessToken &&  this.$store.state.kakaoToken){
      this.isInvite = true
      this.$router.push({ name: 'invite', query: { id: this.$route.query.id }})
    }else if(this.$route.query.sectionId && this.$store.state.accessToken &&  this.$store.state.kakaoToken){
      this.$router.push({name:'detail', query: { id: this.$route.query.sectionId }})
    }else if(window.location.href.indexOf('code=')>0){
      let code = window.location.href.split('code=')[1]
      code = code.slice(0,code.length-2)
      console.log(code)
      let res =  await this.$api.getKakaoTokenByCode(code)
      if(!res.data.kakaoToken){
        window.location.href = "https://soocore.com/#/"
        return
      }
      console.log(res.data)
      this.$store.commit('kakaoToken', res.data.kakaoToken)
      if(res.data.kakaoTokenRefresh){
        this.$store.commit('kakaoTokenRefresh', res.data.kakaoTokenRefresh)
      }
      
      if(!this.$store.state.accessToken){
        this.getUserInfo(res.data.kakaoToken)
      }else{
        this.$router.push({name:'main'})
      }
    }else{
      if(this.$store.state.accessToken &&  this.$store.state.kakaoToken){
        this.$router.push('main')
      }
    }
    this.$eventBus.$emit("hideLoading")
  }
}
</script>
 
<style>
</style>