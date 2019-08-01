<template>
  <div class="flex auto column" style="height:100%;">
    <div class="title">soocore</div>
    <div @click="$router.push('add')" class="flex auto align-items-center justify-content-center column" v-if="!sectionList.length">
      <div class="flex icon-plus" style="font-size:30vw; color:#D8695E;"></div>
    </div>
    <template v-else>
      <div class="nano" style="height:calc(100% - 38vw);">
        <div class="nano-content">
          <div style="margin:0 auto; width:90%; margin-bottom:4vw;">
              <div
              @mousedown="onMouseDown($event,section)" @mouseup="onMouseUp($event,section)" @touchstart="onMouseDown($event,section)" @touchend="onMouseUp($event,section)" 
              class="flex none column justifh-content-center content" v-for="(section,index) of sectionList" :key="'main-list'+index" style="position:relative;"> 
                <div class="flex">
                  <div class="flex auto justify-content-start align-items-center">
                    <div class="flex none circle justify-content-center align-items-center">갑</div>
                    <div>{{section.a_name}}</div>
                  </div>
                  <div class="flex auto justify-content-end align-items-center">
                    <div class="flex none circle justify-content-center align-items-center" style="background:#F2D677;">을</div>
                    <div>{{section.b_name}}</div>
                  </div>
                </div>

                <div class="flex none column justify-content-center">
                  <div class="flex none progress-bar-bg">
                    <div v-if="section.score > 0 " class="flex none progress-bar" :style="{
                      width:getProgressWidth(section.goalpoint, section.score)
                    }"></div>
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
                        {{section.score}}/
                      </div>
                      <div class="flex none score-text">
                        {{section.goalpoint}}
                      </div>
                    </div>
                    <div class="flex auto align-items-center justify-content-end goal-text">
                      {{section.goal}}
                    </div>
                  </div>
                </div>
                <div v-if="!section.isCreate" class="flex align-items-center justify-content-center mask">
                  초대하기
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
    </template>

    <div v-if="isDeletePopupShow" class="popup-bg" @click="isDeletePopupShow=false"></div>
    <yes-no-popup v-if="isDeletePopupShow" @confirm="deleteSection" @cancel="isDeletePopupShow=false">
      <div class="flex column auto justify-content-center">
        <div class="flex align-items-center">삭제 하시겠습니까?</div>
      </div>
    </yes-no-popup>
  </div>
</template>

<script>

import YesNoPopup from '@/components/yes-no-popup'
export default {
  name: 'mian',
  data () {
    return {
      sectionList:[],
      mouseDownTimestamp:0,
      selectedSectionId:null,
      isDeletePopupShow:false,
    }
  },
  components:{
    YesNoPopup
  },
  methods:{
    async getSections(){
      let res = await this.$api.getSections()
      this.sectionList = res.data.data
      console.log(this.sectionList)
    },
    async deleteSection(){
      if(!this.selectedSectionId){
        console.error("nothing to remove")
        return
      }
      let res = await this.$api.deleteSection({id:this.selectedSectionId})
      console.log(res)
      this.getSections()
      this.isDeletePopupShow = false
    },
    sendKakaoLink(id){
      console.log(id)
      Kakao.Link.sendDefault({
      objectType: 'feed',
      content:{
        title: '쑤코어 초대장',
        description: '초대장이 도착했습니다!',
        imageUrl: 'https://api.soocore.com/uploads/soocore',
        link: {
          mobileWebUrl: 'http://soocore.com/login?id='+id,
          webUrl: 'http://soocore.com/login?id='+id,
        }
      },
    });
    },
    getProgressWidth(goal,score){
      let per  = parseInt(score*100/goal)
      per = per > 100 ? 100 : per
      return per+'%'
    },
    async getKakaoFrinds(){
      let res = await this.$api.getKakaoFrinds()
      console.log(res.data)
      if(res.data.code == -402){
        window.open(res.data.uri)
      }else if(res.data.code == -401){
        let res = await this.$api.refreshKakaoToken()
        console.log("#######refreshKakaoToken Res", res)
        if(! res.data.kakaoToken || !res.data.kakaoTokenRefresh){
          this.$store.commit('me', '')
          this.$store.commit('kakaoToken', '')
          this.$store.commit('kakaoTokenRefresh', '')
          this.$store.commit('accessToken', '')
          this.$router.push({ name: 'login'})
        }else{
          this.$store.commit('kakaoToken', res.data.kakaoToken)
          this.$store.commit('kakaoTokenRefresh', res.data.kakaoTokenRefresh)
        }
      }
    },
    onMouseDown(e, section){
      this.mouseDownTimestamp = e.timeStamp
    },
    onMouseUp(e, section){
      if(parseInt(e.timeStamp - this.mouseDownTimestamp) <= 300 ){
        if(section.isCreate) this.$router.push({name:'detail', query: { id: section.id }})
        else this.sendKakaoLink(section.id)
        
      }else{
        this.selectedSectionId = section.id
        this.isDeletePopupShow = true
      }
    },
  },
  mounted(){
    if(!this.$store.state.kakaoToken || !this.$store.state.kakaoTokenRefresh){
      this.$store.commit('me', '')
      this.$store.commit('kakaoToken', '')
      this.$store.commit('kakaoTokenRefresh', '')
      this.$store.commit('accessToken', '')
      this.$router.push({ name: 'login'})
      return
    }
    $(".nano").nanoScroller()
    this.getSections()
    this.getKakaoFrinds()
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
  &:active{
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
  width:0;
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
.mask{
  background:rgba(0,0,0,0.7);
  width:100%;
  height:100%;
  position: absolute;
  left:0;
  top:0;
  font-size: 8vw;
  border-radius:2vw;
  color:#ffffff;

}

</style>
