<template>
  <div class="flex auto column">
    <div class="title">soocore</div>
    <div class="nano" style="height:calc(100% - 38vw);">
      <div class="nano-content">
        <div style="margin:0 auto; width:90%; margin-bottom:4vw;">
          <div @click="$router.push('detail')" class="flex none column justifh-content-center content" v-for="(i,index) of 10" :key="'main-list'+index"> 
            <div class="flex">
              <div class="flex auto justify-content-start align-items-center">
                <div class="flex none circle justify-content-center align-items-center">갑</div>
                <div>김민수{{i}}</div>
              </div>
              <div class="flex auto justify-content-end align-items-center">
                <div class="flex none circle justify-content-center align-items-center" style="background:#F2D677;">을</div>
                <div>정유정{{i}}</div>
              </div>
            </div>

            <div class="flex none column justify-content-center">
              <div class="flex none progress-bar-bg">
                <div class="flex none progress-bar"></div>
              </div>
            </div>

            <div class="flex auto align-items-center" style="margin-top:5vw;">
               <div class="flex none column justify-content-start" style="font-size:5vw;">
                <div class="flex auto justify-content-start">
                  <div class="flex none score-text">
                    점수
                  </div>
                </div>
                <div class="flex none align-items-center goal-text">
                  달성 보상
                </div>
              </div>
              <div class="flex auto column justify-content-end" style="font-size:5vw;">
                <div class="flex auto justify-content-end">
                  <div class="flex none score-text" :style="{
                  color:'#D8695E', 
                  fontWeight:'bold'
                  }">
                    7000/
                  </div>
                  <div class="flex none score-text">
                    10000
                  </div>
                </div>
                <div class="flex auto align-items-center justify-content-end goal-text">
                  디지몬 5만원 교환권
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="$router.push('add')" class="flex none footer justify-content-center align-items-center">
       <div class="flex auto red-button align-items-center" style="width:90%; padding:2vw 0;">
          추가
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mian',
  data () {
    return {
      
    }
  },
  mounted(){
    
    $(".nano").nanoScroller()
  }
}
</script>

<style scoped lang="scss">
.content{
  margin-top:4vw;
  border-radius:2vw;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  background-color: #ffffff;
  &:last-child{
    margin-bottom:12vw;
  }
  &:hover{
    background:rgba(33, 38, 46, 0.1);
  }
  padding:6vw 4vw;
}
.circle{
background:#D8695E;
width:8vw;
height:8vw;
border-radius: 50%;
color:#ffffff;
margin-right:2vw;
}
.progress-bar-bg{
  height:6vw;
  background:#D9D9D9;
  border-radius: 2vw;
  margin-top:4vw;
  margin-bottom:2vw;
}
.progress-bar{
  height:100%;
  width:70%;
  background:#F2D677;
  border-radius: 2vw;
  border: 2px dotted #D8695E;
}
.score-text{
  font-size:4vw;
  height:4vw;
  line-height: 4vw;
  margin-bottom:1vw;
  color:#595959;
}
.goal-text{
  font-size:5vw;
  height:5vw;
  line-height: 5vw;
  color:#000000;
}

</style>
