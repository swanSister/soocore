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

export default{
  name:'soocore'
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
