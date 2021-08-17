<template>
  <dv-scroll-ranking-board :config="config" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
export default {
  name: "cpt-dataV-scrollList",
  title: "滚动列表",
  icon: 'el-icon-finished',
  initWidth: 300,
  initHeight: 150,
  group: 'echarts',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      config: JSON.parse(JSON.stringify(this.option))
    }
  },
  watch: {
    'option.refresh': function() {
      this.config = JSON.parse(JSON.stringify(this.option))
    }
  },
}
</script>

<style scoped>

</style>
