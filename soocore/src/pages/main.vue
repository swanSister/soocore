<template>
  <div>
    <div class="x-flex auto">
      <v-bar wrapper="wrapper"
          vBar=""
          vBarInternal=""
          hBar=""
          hBarInternal="">
        <div style="width:90%; margin-left:5%; margin-bottom:2vh;">
          <div class="flex none column justifh-content-center content" v-for="(i,index) of 10" :key="'main-list'+index"> 
            <div class="flex">
              <div class="flex auto justify-content-center align-items-center">
                <div class="flex none circle justify-content-center align-items-center">갑</div>
                <div>김민수{{i}}</div>
              </div>
              <div class="flex auto justify-content-center align-items-center">
                <div class="flex none circle justify-content-center align-items-center">을</div>
                <div>정유정{{i}}</div>
              </div>
            </div>

            <div class="flex auto justify-content-center">
              <div class="flex none progress-bar-bg">
                <div class="flex none progress-bar"></div>
              </div>
            </div>

            <div class="flex auto justify-content-center">
              <div class="flex none button" style="margin-top:1vh;">
                달성 보상
              </div>
            </div>
          </div>
        </div>
      </v-bar>
    </div>
    <div class="flex none footer justify-content-center align-items-center">
       <div class="flex none red-button" style="margin-top:1vh;">
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
  padding:3vh 0;
  box-shadow: 0 0 6px 0 rgba(33, 38, 46, 0.3);
  background-color: #ffffff;
  &:last-child{
    margin-bottom:6vh;
  }
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
  width:70vw;
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
.footer{
  width:100%;
  height:12vh;
}

</style>
