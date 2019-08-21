<template>
  <div id="app" style="height:100%; width:100%; margin:0; padding:0;">
    <router-view style="height:100%; width:100%;"/>
    <loading v-if="isLoadingShow"/>
    <toast v-if="isToastShow" :type="toastType" :title="toastTitle" :content="toastContent" />
  </div>
</template>

<script>
import { polyfill } from 'es6-promise'
polyfill()
import Vue from 'vue'
import "@/assets/css/main.css"
import "@/assets/css/fontello.css"
import SubHeader from "@/components/sub-header"
import Loading from "@/components/loading"
import Toast from "@/components/toast"
import { setTimeout, clearTimeout } from 'timers';
Vue.component('sub-header',SubHeader)

export default{
  name:'soocore',
  components:{
    Loading,
    Toast
  },
  data () {
    return {
      isLoadingShow:false,
      isToastShow:false,
      toastTitle:'',
      toastContent:'',
      toastType:false,
      toastTimeout:null,
    }
  },
  methods:{
    onShowLoading(){
      console.log("####onShowLoading")
      this.isLoadingShow = true
    },
    onHideLoading(){
      console.log("####onHideLoading")
      this.isLoadingShow = false
    },
    onShowToast(data){
      this.toastTitle = data.title
      this.toastContent = data.content
      this.toastType = data.type
      this.isToastShow = true
      let that = this

      if(this.toastTimeout){
        clearTimeout(this.toastTimeout)
      }

      this.toastTimeout = setTimeout(function(){
        that.isToastShow = false
      },2000)
    },
    onHideToast(){
      this.isToastShow = false
    }
  },
  created(){
    this.$eventBus.$on("showLoading", this.onShowLoading)
    this.$eventBus.$on("hideLoading", this.onHideLoading)
    this.$eventBus.$on("showToast", this.onShowToast)
    this.$eventBus.$on("hideToast", this.onHideToast)
  }

}
</script>

<style>
@font-face {
  font-family: 'BMDOHYEON';
  src: url("assets/font/BMDOHYEON.otf") format("opentype"),
       url("assets/font/BMDOHYEON.ttf") format("truetype");
}
@font-face {
  font-family: 'BMHANNA';
  src: url("assets/font/BMHANNA.otf") format("opentype"),
       url("assets/font/BMHANNA.ttf") format("truetype");
}
@font-face {
  font-family: 'BMJUA';
  src: url("assets/font/BMJUA.otf") format("opentype"),
       url("assets/font/BMJUA.ttf") format("truetype");
}
#app {
  font-family:BMHANNA;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:5vw;
  color:#2D3642;
}
</style>
