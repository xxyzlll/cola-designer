<template>
  <dv-percent-pond v-if="refreshCpt" :config="pondConfig" style="width: 100%;height: 100%" />
</template>

<script>
import {getDataStr, pollingRefresh} from "@/utils/refreshCptData";

export default {
  name: "cpt-dataV-percentPond",
  title: "进度池",
  icon: 'el-icon-film',
  initWidth: 256,
  initHeight: 191,
  group: 'basic',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  watch: {
    option: {
      handler() {
        this.loadData();
      },
      deep: true//深度监听
    },
    width(){
      this.loadData();
    }
  },
  data() {
    return {
      uuid: null,
      pondConfig:{},
      refreshCpt: true
    }
  },
  created() {
    this.uuid = require('uuid').v1();
    this.refreshCptData();
  },
  methods: {
    refreshCptData() {
      pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData)
    },
    loadData(){
      this.refreshCpt = false; //解决视图不刷新bug
      getDataStr(this.option.cptDataForm).then(res => {
        let tempConfig = JSON.parse(JSON.stringify(this.option));
        tempConfig.value = res;
        tempConfig.lineDash = [tempConfig.lineWidth, tempConfig.lineSpace]
        this.pondConfig = tempConfig;
        this.refreshCpt = true
      });
    }
  }
}
</script>

<style scoped>

</style>
