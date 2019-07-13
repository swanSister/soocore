<template>
  <div id="app" style="height:100%; width:100%; margin:0; padding:0;">
    <router-view style="height:100%; width:100%;"/>
  </div>
</template>

<script>
import Vue from 'vue'
import "@/assets/css/main.css"
import "@/assets/css/fontello.css"
import SubHeader from "@/components/sub-header"
Vue.component('sub-header',SubHeader)
export default {
  name: 'App',
  
}
</script>

<style>
@font-face {
  font-family: 'BMDOHYEON';
  src: url("assets/fonts/BMDOHYEON.otf") format("opentype"),
       url("assets/fonts/BMDOHYEON.ttf") format("truetype");
}
@font-face {
  font-family: 'BMHANNA';
  src: url("assets/fonts/BMHANNA.otf") format("opentype"),
       url("assets/fonts/BMHANNA.ttf") format("truetype");
}
@font-face {
  font-family: 'BMJUA';
  src: url("assets/fonts/BMJUA.otf") format("opentype"),
       url("assets/fonts/BMJUA.ttf") format("truetype");
}
#app {
  font-family:BMJUA;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:5vw;
}
</style>
