<template>
  <div id="app" style="height:100%;">
    <div class="title">soocore</div>
    <div class="flex auto">
      <router-view/>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import "@/assets/css/main.css"
import VBar from 'v-bar'
Vue.component('v-bar',VBar)
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
  font-family:BMHANNA;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:2.5vh;
}
.title{
  font-size:8vh;
  font-weight: bold;
  color: #2D3642;
  height:12vh;
  line-height: 9.5vh;
  box-sizing: border-box;
  border-bottom:0.5vh dashed rgba(33, 38, 46, 0.3);
}
</style>
