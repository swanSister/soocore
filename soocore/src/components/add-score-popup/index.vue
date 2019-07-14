<template>
  <div class="flex none add-score-popup">
    <div class="flex column" style="width:90%; margin:0 auto; padding:4vw 0;">
      <div class="flex none align-items-center add-title" style="margin-bottom:2vw;"> 점수 </div>
      <div class="flex">
        <div class="flex none clickable">
          <div @mouseup="onMouseUp(1, $event)" @touchup="onMouseUp(1, $event)" 
          @mousedown="onMouseDown(1, $event)" @touchdown="onMouseDown(1, $event)" class="flex none justify-content-center align-items-center icon-button" style="width:12vw; height:12vw; border-radius:4vw 0 0 4vw;">
            <div class="flex none icon-angle-down" style="font-size:8vw;"></div> 
          </div>
          <input class="flex align-items-center" type="number" style="color:#2D3642; font-size:8vw; font-weight:bold;border:0.5vw solid #D8695E; border-width: 0.5vw 0 0.5vw 0; width:40vw; padding:0 1vw; outline:none;" v-model="point" @input="point = point<0 ? 0 : point>100000 ? 100000 : point">
          
          <div
          @mouseup="onMouseUp(2, $event)" @touchup="onMouseUp(2, $event)" 
          @mousedown="onMouseDown(2, $event)" @touchdown="onMouseDown(2, $event)" class="flex none justify-content-center align-items-center icon-button" style="width:12vw; height:12vw; border-radius:0 4vw 4vw 0;">
            <div class="flex none icon-angle-up" style="font-size:8vw;"></div>
          </div>
        </div>
      </div>
      <div class="flex align-items-center add-title" style="margin:4vw 0;">
        <div class="flex">
          한 일
          <div class="flex" style="background:#D9D9D9; width:0.5vw; margin:0 2vw;"/>
        </div>
        <div class="flex none justify-content-center">
          <div class="flex none justify-content-center align-items-center circle" :style="{
            background:'#F2D677'
          }">을</div>
            <div class="flex align-items-center">정유정</div>
        </div>
        
      </div>
      <div class="flex auto" style="width:100%;">
        <textarea style="width:100%;" placeholder="한 일을 입력해 주세요." type="text" rows="4" cols="50"/>
      </div>
      <div class="flex none footer justify-content-center align-items-center">
       <div class="flex none red-button align-items-center" style="font-size:6vw; margin-top:4vw;width:60%; padding:2vw 0;">
          {{role==1 ? '점수 등록' : '점수 요청'}}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      role:1,
      point:500,
      mouseDownInterval:null
    }
  },
  methods:{
    onMouseDown(type){
      if(type==1){ this.point-=100}
      else{ this.point+=100 }
      this.point = this.point < 0 ? 0 : this.point>100000 ? 100000 : this.point
      if(this.mouseDownInterval){
        clearInterval(this.mouseDownInterval)
      }
      this.mouseDownInterval = setInterval(function(that){
        if(type==1){ that.point-=100}
        else{ that.point+=100 }
        that.point = that.point < 0 ? 0 : that.point>100000 ? 100000 : that.point
      },200, this)
    },
    onMouseUp(type){
      if(this.mouseDownInterval){
        clearInterval(this.mouseDownInterval)
      }
    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
.add-score-popup{
  position:fixed;
  left:5%;
  top:20%;
  width:90%;
  background:#ffffff;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
  overflow: hidden;
}
.circle{
  width:8vw;
  height:8vw;
  font-size:4vw;
  border-radius: 2vw;
  color:#ffffff;
  margin-right:2vw; 
}

</style>