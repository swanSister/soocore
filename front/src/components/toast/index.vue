<template>
  <div class="flex none">
    <div class="flex auto toast">
      <div class="flex auto line" :style="{background:type ? '#31A584' : '#D8695E'}"></div>
      <div class="flex auto justify-content-center align-items-center icon">
        <div class="flex justify-content-center align-items-center icon-bg" :style="{background:type ? '#31A584' : '#D8695E'}">
          <div class="flex none" style="font-size:6vw; color:#ffffff;" :class="type ? ' icon-ok' : 'icon-cancel'"></div> 
        </div>
      </div>
      <div class="flex column justify-content-center align-items-start auto">
        <div class="flex align-items-center toast-title">{{title}}</div>
        <div class="flex align-items-center toast-content">{{content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    type:Boolean,
    title:String,
    content:String,
  },
  data () {
    return {
    
    }
  },
  methods:{
  },
  mounted(){
  
  }
}
</script>
<style scoped>
.toast{
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  z-index: 100;
  position:fixed;
  top:0;
  left:0;
  background: #ffffff;
  min-width: 100vw;
  max-width: 100vw;
  border-radius: 1vw;
  max-height:10vh;
  min-height: 10vh;
}
.line{
  min-width: 2vw;
  max-width: 2vw;
}
.icon{
  min-width: 14vw;
  max-width: 14vw;
}
.icon-bg{
  min-width: 8vw;
  max-width: 8vw;
  min-height: 8vw;
  max-height: 8vw;
  border-radius: 50%;
}
.toast-title{
  font-size:5vw;
  height:8vw;
  line-height: 8vw;
  color:#000000;
}
.toast-content{
  font-size:4vw;
  height:4vw;
  line-height: 4vw;
  margin-bottom:1vw;
  color:#595959;
}

</style>