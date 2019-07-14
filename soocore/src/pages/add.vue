
<template>
<div class="flex auto column">
 <sub-header title="추가"/>
  <div class="nano">
    <div class="nano-content">
      <div class="flex none content column">
        <div class="flex none justify-content-start align-items-center add-title"> 나의 역할</div>
        <div class="flex" style="width:70%; margin:0 auto;">
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
        <div class="flex none justify-content-start align-items-center add-title"> 목표 점수</div>
        <div ref="scoreSelectorBg" 
        @touchstart="onMouseDown" @touchmove="onMouseMove" @touchend="onMouseUp"
        @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp" 
        class="flex justify-content-start score-selector-bg">
          <div ref="scoreSelector" id="scoreSelector" class="score-selector">
          </div>
          <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:3%;">5,000</div>
          <div class="flex align-items-center justify-content-center score-selector-text goal-score">{{goalScore}} 점</div>
          <div class="flex align-items-center justify-content-center score-selector-text" style="font-size:3vw; left:96%;">100,000</div>
        </div>
      </div>
      <div class="flex content column" >
        <div class="flex none justify-content-start align-items-center add-title"> 달성 보상</div>
        <div class="flex auto" style="width:90%; margin-left:5%;">
          <textarea style="width:100%;" placeholder="달성 보상을 입력해 주세요." type="text" rows="4" cols="30"/>
        </div>
      </div>
      
      <div v-if="!signitureData" @click="isSigniturePopupShow=!isSigniturePopupShow" class="flex none footer justify-content-center align-items-center">
        <div class="flex auto red-button align-items-center" style="margin:4vw;width:90%; padding:2vw 0;">
            서명
        </div>
      </div>
      <div v-else class="flex content column" style="box-shadow:none;">
        <div class="flex none align-items-center">
          <div class="flex none circle-small justify-content-center align-items-center" :style="{
              background:role == 1 ? '#D8695E' : '#F2D677'
            }">
           {{role==1 ? '갑' : '을'}}
          </div>
          <div class="flex none" style="width:30%;margin-left:4vw;">
           김민수
          </div>
          <div @click="isSigniturePopupShow=!isSigniturePopupShow" class="flex none" style="position:relative; width:40%; height:auto; border-radius:2vw;">
            <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#595959; font-size:4vw; opacity:0.5;">서명</div>
            <img :src="signitureData" class="flex align-items-center " style=" width:100%; height:100%;"/>
          </div>
        </div>

        <div class="flex none footer justify-content-center align-items-center">
          <div class="flex auto red-button align-items-center" style="margin:4vw;width:90%; padding:2vw 0;">
              초대하기
          </div>
        </div>
      </div>
   </div>
  </div>
  <div v-if="isSigniturePopupShow" class="popup-bg" @click="isSigniturePopupShow=false"></div>
  <signiture-popup v-if="isSigniturePopupShow" @confirm="onConfirmSignitur" />
</div>

</template>

<script>
import SigniturePopup from '@/components/signiture-popup'
export default {
  name: 'add',
  components:{
    SigniturePopup,
  },
  data () {
    return {
      role:1, //1:갑, 2:을
      isMouseDown:false,
      lastTimeStamp:0,
      timeThreshold:50,
      rect:{},
      goalScore:50000,
      isSigniturePopupShow:false,
      signitureData:null,
    }
  },
  methods:{
    onMouseMove(e){
      if(this.isMouseDown){
        if(!this.lastTimeStamp || (e.timeStamp - this.lastTimeStamp) > this.timeThreshold){
          let x = (e.clientX || e.touches[0].clientX) - this.rect.x
          let left = parseInt(x*100/this.rect.width)
          left += 5
          left -= left%5
          left = left < 0 ? 0 : left > 100 ? 100 : left
          this.$refs.scoreSelector.style.left= `${left}%`
          this.goalScore = 1000*left
        }
      }
    },
    onMouseDown(e){
      let target = e.target
        while (target){
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
    },
    onConfirmSignitur(data){
      this.signitureData = data
      this.isSigniturePopupShow = false
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
  margin-top:4vw;
  margin-left:4%;
  padding-bottom:4vw;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  border-radius:2vw;
  overflow: hidden;
}
.circle{
  width:20vw;
  height:20vw;
  font-size:10vw;
  border-radius: 4vw;
  color:#ffffff;
  margin-right:2vw;
}
.circle-small{
  width:10vw;
  height:10vw;
  font-size:5vw;
  border-radius: 2vw;
  color:#ffffff;
  margin-left:4vw;
}
.circle:after{
  opacity:.7;
}
.score-selector-bg{
  width:90%;
  margin-left:5%;
  height:10vw;
  background:#D9D9D9;
  border-radius: 4vw;
  position: relative;
  margin-bottom: 12vw;
  box-shadow: 1px 1px 6px 0 rgba(33, 38, 46, 0.4);
}
.score-selector{
  position: absolute;
  border:solid 1.2vw #D8695E;
  transform: translate(-50%,0);
  left:50%;
  top:-20%;
  width:10%;
  height:140%;
  background:#F2D677;
  border-radius: 4vw;
  cursor: pointer;
  box-shadow: 1px 1px 3px 0 rgba(33, 38, 46, 0.4);
}
.score-selector:after{
  cursor:auto;
}
.score-selector-text{
  position: absolute;
  width:40vw;
  top:15vw;
  left:50%;
  height:6vw;
  transform: translate(-50%,0);
  color:#595959;
}
.add-title{
  box-shadow: 1px 1px 1px 0 rgba(33, 38, 46, 0.3);
  font-size: 6vw;
  padding-bottom: 2vw;
  padding:2vw;
  margin-bottom: 4vw;
  
}
.goal-score{
  color:#D8695E;
  font-size:6vw;
  font-weight: bold;
}
</style>