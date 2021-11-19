<template>
  <div :style="{width: windowWidth+'px',height: windowHeight+'px',backgroundColor: designCache.bgColor,
       backgroundImage: designCache.bgImg ? 'url('+fileUrl+'/file/img/'+designCache.bgImg+')':'none'}"
       style="background-size:cover;overflow: auto">
    <div style="width: 100%;position:relative;overflow: hidden;" :style="{height:conHeight+'px'}">
      <transition-group appear name="bounce">
        <div v-for="(item,index) in designCache.components" :key="item.cptName+index"
             style="position: absolute;overflow: auto"
             :style="{width:Math.round(containerScale * item.cptWidth)+'px',
                  height:Math.round(containerScale * item.cptHeight)+'px',
                  top:Math.round(containerScale*item.cptY)+'px',
                  left:Math.round(containerScale*item.cptX)+'px',
                  zIndex:item.cptZ}">

          <comment :is="item.cptName" :width="Math.round(containerScale * item.cptWidth)"
                   :height="Math.round(containerScale * item.cptHeight)"
                   :option="item.option"/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {getByIdApi} from "@/api/DesignerApi";
import {fileUrl} from "/env";
import {setToken} from "@/utils/auth";

export default {
  name: "preview_index",
  data(){
    return{
      fileUrl:fileUrl,
      designCache:{},
      windowWidth: 0,
      windowHeight: 0,
      conHeight: 0,
      containerScale:1
    }
  },
  mounted() {
    const that = this;
    that.loadCacheData().then(res => {
      that.designCache = res;
      that.loadSize();
    });
    window.onresize = () => {
      return (() => {
        that.loadSize()
      })();
    };
  },
  methods:{
    async loadCacheData(){
      setToken(this.$route.query.token);
      const path = this.$route.path;
      let designCache;
      if (path === '/preview'){
        designCache = JSON.parse(localStorage.getItem('designCache'));
      }else if(path === '/view'){
        await getByIdApi(this.$route.query.id).then(res => {
          designCache = res.data;
          designCache.components = JSON.parse(designCache.components);
        })
      }
      document.title = designCache.title;
      return designCache;
    },
    loadSize(){
      this.windowWidth = document.documentElement.clientWidth;
      this.windowHeight = document.documentElement.clientHeight;
      this.conHeight = Math.round(this.windowWidth / this.designCache.scaleX * this.designCache.scaleY);
      this.containerScale = this.windowWidth / 1024
    }
  }
}
</script>

<style scoped>
.bounce-enter-active{
  transition: all 1s;
  /*animation: bounce-in 1s;*/
}
.bounce-enter{
  opacity: 0;
  transform: scale(.5);
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
