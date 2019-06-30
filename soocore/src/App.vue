<template>
  <div id="app">
    <div class="title">soocore</div>
    <router-view/>
  </div>
  
</template>

<script>
import "@/assets/css/main.css"

export default {
  name: 'App'
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
  font-size:2vh;
}
.title{
  font-size:6vh;
  font-weight: bold;
  color: #2D3642;
  margin-top: 2vh;
  margin-bottom:4vh;
}
</style>
