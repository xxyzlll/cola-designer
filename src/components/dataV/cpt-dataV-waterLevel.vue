<template>
  <dv-water-level-pond :config="config" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
import {getDataStr, pollingRefresh} from "@/utils/refreshCptData";
export default {
  name: "cpt-dataV-waterLevel",
  title: "水位图",
  icon: 'el-icon-goblet-square-full',
  initWidth: 120,
  initHeight: 100,
  group: 'chart',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      config: {},
      uuid: null
    }
  },
  watch: {
    'option.refresh': function() {
      this.refreshCptData()
    }
  },
  created() {
    this.uuid = require('uuid').v1();
    this.refreshCptData();
  },
  methods:{
    refreshCptData(){
      pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData)
    },
    loadData(){
      getDataStr(this.option.cptDataForm).then(res => {
        this.config = JSON.parse(JSON.stringify(this.option))
        this.config.data = JSON.parse(res);
      });
    }
  }
}
</script>

<style scoped>

</style>
