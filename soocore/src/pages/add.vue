
<template>
<div class="flex auto column">
  <div class="sub-title">추가</div>
  <div class="flex none content" >
    <div class="flex auto justify-content-center align-items-center add-title"> 나의 역할</div>
    <div class="flex" style="width:70%;">
      <div class="flex auto justify-content-center">
        <div class="flex none circle justify-content-center align-items-center" :style="{
          background:role == 1 ? '#D8695E' : '#D9D9D9'
        }" @click="role=1">갑</div>
      </div>
      <div class="flex auto justify-content-center">
        <div class="flex none justify-content-center align-items-center circle" :style="{
          background:role == 2 ? '#F2D677' : '#D9D9D9'
        }" @click="role=2">을</div>
      </div>
    </div>
  </div>
  <div class="flex column none content" style="position: relative;">
    <div class="flex auto justify-content-center align-items-center add-title"> 목표 점수</div>
    <div ref="scoreSelectorBg" 
    @touchstart="onMouseDown" @touchmove="onMouseMove" @touchend="onMouseUp"
    @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp" 
    class="flex justify-content-start score-selector-bg">
      <div ref="scoreSelector" id="scoreSelector" class="score-selector">
      </div>
      <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:3%;">1,000</div>
      <div class="flex align-items-center justify-content-center score-selector-text goal-score">{{goalScore}}</div>
      <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:96%;">100,000</div>
    </div>
  </div>

   <div class="flex none content" >
    <div class="flex auto justify-content-center align-items-center add-title"> 달성 보상</div>
    <div class="flex" style="width:70%;"><textarea type="text" rows="4" cols="30"/></div>
  </div>
</div>

</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      role:1, //1:갑, 2:을
      isMouseDown:false,
      lastTimeStamp:0,
      timeThreshold:50,
      rect:{},
      goalScore:50000,
    }
  },
  methods:{
    onMouseMove(e){
      e.stopPropagation()
      if(this.isMouseDown){
        if(!this.lastTimeStamp || (e.timeStamp - this.lastTimeStamp) > this.timeThreshold){
          let x = (e.clientX || e.touches[0].clientX) - this.rect.x
          let left = parseInt(x*100/this.rect.width)
          left = left < 0 ? 0 : left > 100 ? 100 : left 
          this.$refs.scoreSelector.style.left= `${left}%`
          this.goalScore = 100*left
        }
      }
    },
    onMouseDown(e){
      //e.preventDefault()
      let target = e.target
        while (target){
          console.log(target.id)
          if(target.id && target.id == "scoreSelector"){
            this.rect = this.$refs.scoreSelectorBg.getBoundingClientRect()
            this.lastTimeStamp = e.timeStamp
            this.isMouseDown = true
            break
          }
          target = target.parentElement
        }
    },
    onMouseUp(e){
      let that = this
      setTimeout(function(){
        that.isMouseDown = false
        that.lastTimeStamp = 0
      },50)
    }
  },
  mounted(){

  },
  destroyed(){
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  width:92%;
  margin: 4vw 4vw 0vw 4vw;
  padding:4vw 0;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
}
.circle{
  cursor: pointer;
  width:16vw;
  height:16vw;
  font-size:8vw;
  border-radius: 4vw;
  color:#ffffff;
  margin-right:2vw;
}
.score-selector-bg{
  width:90%;
  margin-top:2vw;
  margin-left:5%;
  height:8vw;
  background:#D9D9D9;
  border-radius: 4vw;
  position: relative;
  margin-bottom: 8vw;
}
.score-selector{
  position: absolute;
  border:solid 0.8vw #D8695E;
  transform: translate(-50%,0);
  left:50%;
  top:0;
  width:7%;
  height:100%;
  background:#F2D677;
  border-radius: 4vw;
  cursor: pointer;
  box-shadow: 1px 1px 3px 0 rgba(33, 38, 46, 0.7);
}
.score-selector:hover{
  opacity:.7;
}
.score-selector-text{
  position: absolute;
  width:40vw;
  top:9vw;
  left:50%;
  height:6vw;
  transform: translate(-50%,0);
  color:#595959;
}
textarea{
	border-radius: 2vw;
	outline: none;
	padding: 2vw;
	font-size: 4vw;
	color: #595959;
  border: solid 0.8vw #D9D9D9;
  font-weight: bold;
  margin-right:5%;
}
input:focus, textarea:focus{
	border: solid 0.8vw #D8695E;	
}
textarea{
	overflow: auto;
}
.add-title{
  font-size: 5vw;
  margin:2vw 0;
}
.goal-score{
  color:#D8695E;
  font-weight: bold;

}
</style>