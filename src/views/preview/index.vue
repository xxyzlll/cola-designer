<template>
  <div :style="{width: windowWidth+'px',height: windowHeight+'px',backgroundColor: designCache.bgColor}" style="position:relative;overflow: hidden">
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
</template>

<script>
export default {
  name: "preview_index",
  data(){
    return{
      designCache:{},
      windowWidth:document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      containerScale:1
    }
  },
  created() {
    this.loadCacheData();
  },
  methods:{
    loadCacheData(){
      let designCache = JSON.parse(localStorage.getItem('designCache'));
      this.windowHeight = Math.round(this.windowWidth / designCache.scaleX * designCache.scaleY);
      document.title = designCache.title
      this.containerScale = this.windowWidth / 1024
      this.designCache = designCache;
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
