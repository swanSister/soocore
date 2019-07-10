<template>
  <div class="flex auto column">
    <div class="title">soocore</div>
    <div class="nano" style="height:74vh;">
      <div class="nano-content">
        <div style="width:90%; margin-left:5%; margin-bottom:2vh;">
          <div class="flex none column justifh-content-center content" v-for="(i,index) of 10" :key="'main-list'+index"> 
            <div class="flex">
              <div class="flex auto justify-content-start align-items-center">
                <div class="flex none circle justify-content-center align-items-center">갑</div>
                <div>김민수{{i}}</div>
              </div>
              <div class="flex auto justify-content-end align-items-center">
                <div class="flex none circle justify-content-center align-items-center">을</div>
                <div>정유정{{i}}</div>
              </div>
            </div>

            <div class="flex none column justify-content-center">
              <div class="flex none progress-bar-bg">
                <div class="flex none progress-bar"></div>
              </div>
            </div>

            <div class="flex auto align-items-center" style="margin-top:2vh;">
               <div class="flex none column justify-content-start" style="font-size:2vh;">
                <div class="flex auto justify-content-start">
                  <div class="flex none sub-text">
                    점수
                  </div>
                </div>
                <div class="flex none align-items-center main-text">
                  달성 보상
                </div>
              </div>
              <div class="flex auto column justify-content-end" style="font-size:2vh;">
                <div class="flex auto justify-content-end">
                  <div class="flex none sub-text" :style="{
                  color:'#D8695E', 
                  fontWeight:'bold'
                  }">
                    7000/
                  </div>
                  <div class="flex none sub-text">
                    10000
                  </div>
                </div>
                <div class="flex auto align-items-center justify-content-end main-text">
                  디지몬 5만원 교환권
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="$router.push('add')" class="flex none footer justify-content-center align-items-center">
       <div class="flex auto red-button" style="padding:1vh 4vh;">
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
.wrapper {
  height: 70vh;
  width:100%;
}
.content{
  margin-top:2vh;
  border-radius:1vh;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  background-color: #ffffff;
  &:last-child{
    margin-bottom:6vh;
  }
  padding:3vh 2vh;
}
.circle{
background:#D8695E;
width:4vh;
height:4vh;
border-radius: 50%;
color:#ffffff;
margin-right:1vh;
}
.progress-bar-bg{
  height:3vh;
  background:#D9D9D9;
  border-radius: 1vh;
  margin-top:2vh;
  margin-bottom:1vh;
}
.progress-bar{
  height:100%;
  width:70%;
  background:#F2D677;
  border-radius: 1vh;
  border: 2px dotted #D8695E;
}
.sub-text{
  font-size:1.5vh;
  height:2vh;
  line-height: 2vh;
  color:#595959;
}
.main-text{
  font-size:2vh;
  height:2.5vh;
  line-height: 2.5vh;
  color:#000000;
}
.footer{
  padding:0 3vh;
  width:100%;
  margin-top:2vh;
}

</style>
