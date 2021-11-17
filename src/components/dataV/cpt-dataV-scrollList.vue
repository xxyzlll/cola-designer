<template>
  <dv-scroll-ranking-board :config="config" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
import {getDataStr} from "@/utils/refreshCptData";

export default {
  name: "cpt-dataV-scrollList",
  title: "滚动列表",
  icon: 'el-icon-finished',
  initWidth: 300,
  initHeight: 150,
  group: 'chart',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      config: []
    }
  },
  watch: {
    'option.refresh': function() {
      this.refreshCptData();
    }
  },
  created() {
    this.refreshCptData();
  },
  methods:{
    refreshCptData(){
      this.config = JSON.parse(JSON.stringify(this.option))
      getDataStr(this.option.cptDataForm).then(res => {
        this.config.data = JSON.parse(res);
      });
    },
  }
}
</script>

<style scoped>

</style>
