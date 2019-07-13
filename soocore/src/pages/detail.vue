
<template>
<div class="flex auto column">
 <sub-header title="상세"/>
  <div class="nano">
    <div class="nano-content">
      <div class="flex none content column">
        <div class="flex none justify-content-start align-items-center add-title">계약자</div>
        <div class="flex auto">
          <div class="flex auto justify-content-center">
            <div class="flex none circle justify-content-center align-items-center" :style="{
              background:'#D8695E'
            }">갑</div>
            <div class="flex align-items-center">김민수</div>
          </div>
          <div class="flex auto justify-content-center">
            <div class="flex none justify-content-center align-items-center circle" :style="{
              background:'#F2D677'
            }">을</div>
             <div class="flex align-items-center">정유정</div>
          </div>
        </div>
      </div>
      <div class="flex none content column" style="padding-bottom:1vw;">
        <div class="flex none justify-content-start align-items-center add-title">점수</div>
          <div class="flex none column justify-content-center">
            <div class="flex none progress-bar-bg">
              <div class="flex none progress-bar"></div>
            </div>
          </div>
           <div class="flex auto align-items-center" style="margin-top:2vw;">
              <div class="flex auto justify-content-start" style="margin-left:4vw;">
                <div class="flex none score-text">
                  점수
                </div>
              </div>
              <div class="flex auto justify-content-end" style="margin-right:4vw;">
                <div class="flex none score-text" :style="{
                color:'#D8695E', 
                fontWeight:'bold'
                }">
                  7000/
                </div>
                <div class="flex none score-text">
                  10000점
                </div>
              </div>
            </div>
            <span @click="isScoreListShow = !isScoreListShow" :class="isScoreListShow ? 'icon-angle-up' : 'icon-angle-down' " style="color:#595959; font-size:6vw;"></span>
            <div v-if="isScoreListShow" style="width:90%; margin-left:5%;">
              <div class="flex" style="padding:2vw 0;box-shadow: 0 1px 0 0 rgba(33, 38, 46, 0.3);">
                <div class="flex none justify-content-start score-table-header" style="width:30%;">
                  시간
                </div>
                <div class="flex none justify-content-start score-table-header" style="width:50%;">
                  한 일
                </div>
                <div class="flex none justify-content-start score-table-header" style="width:20%;">
                  점수
                </div>
              </div>
              <div class="nano" style="margin:0 auto;width:100%;height:50vw;">
                <div class="nano-content">
                  <div class="flex column">
                    <div class="flex" v-for="i of 10" :key="'score-history'+i">
                      <div class="flex none justify-content-start score-table-item" style="color:#595959; width:30%; font-size:2vw;">
                        2019.07.11 11:30
                      </div>
                      <div class="flex none justify-content-start score-table-item" style="width:50%; text-align:left; padding:2vw;">
                        집에서 밥먹고 개똥치우고 설거지하고 빨래 돌리고 건조 돌리고 찰스랑 산책도 갔다왔다.
                      </div>
                      <div class="flex none justify-content-start score-table-item" style="color:#D8695E; width:20%;">
                        500
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <div class="flex content column" >
        <div class="flex none justify-content-start align-items-center add-title"> 승인 대기</div>
        <div class="flex" style="text-align:left;">
          <div style="width:90%; margin-left:5%;">
            <div class="flex column">
              <div class="flex" v-for="i of 3" :key="'score-history'+i">
                <div class="flex justify-content-start score-table-item" style="color:#595959;font-size:2vw;">
                  2019.07.11 11:30

                </div>
                <div class="flex justify-content-start score-table-item" style="text-align:left; padding:2vw;">
                  쑤 나 10 10 큐브 사주라 제발 승인해주세요 쑤느님
                </div>
                <div class="flex justify-content-center score-table-item clickable">
                  <div class="flex none justify-content-center align-items-center" style="border-radius:3vw; width:10vw; height:10vw; background:#D8695E;">
                    <div class="flex icon-ok" style="color:#ffffff; font-size:5vw;"></div>
                  </div>
                  
                  <div class="flex none justify-content-center align-items-center" style="margin-left:2vw; border-radius:3vw; width:10vw; height:10vw; background:#595959;">
                    <div class="flex icon-cancel" style="color:#ffffff; font-size:5vw;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex content column" >
        <div class="flex none justify-content-start align-items-center add-title"> 달성 보상</div>
        <div class="flex" style="width:90%; margin-left:5%; text-align:left;">
          치킨먹고 피자먹고 햄버거 먹고 젤다하면서 큐브 맞추기.
        </div>
      </div>
   </div>
  </div>
  <div class="flex none footer justify-content-center align-items-center">
      <div class="flex auto red-button align-items-center" style="width:90%; padding:2vw 0;">
        점수 등록
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'add',
  components:{
    
  },
  data () {
    return {
      isScoreListShow:false,
    }
  },
  methods:{
  
  },
  mounted(){
     $(".nano").nanoScroller()
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
  cursor: pointer;
  width:15vw;
  height:15vw;
  font-size:6vw;
  border-radius: 3vw;
  color:#ffffff;
  margin-right:2vw;
}
.circle-small{
  cursor: pointer;
  width:10vw;
  height:10vw;
  font-size:5vw;
  border-radius: 2vw;
  color:#ffffff;
  margin-left:4vw;
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
.progress-bar-bg{
  height:6vw;
  background:#D9D9D9;
  border-radius: 2vw;
  margin:2vw;
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
.score-table-header{
  color:#595959;
  padding:0 2vw;
  
}
.score-table-item{
  font-size:4vw;
  padding:2vw 1vw;
}
</style>