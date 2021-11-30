<template>
  <dv-digital-flop :config="flopConfig" style="width:100%;height:100%;" />
</template>

<script>
import {getDataStr} from "@/utils/refreshCptData";

export default {
  name: "cpt-dataV-digitalFlop",
  title: "数字翻牌器",
  icon: 'el-icon-data-analysis',
  initWidth: 256,
  initHeight: 80,
  group: 'basic',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      flopConfig: {},
      pollTimer: null
    }
  },
  mounted() {
    const that = this;
    that.refreshCptData();
    if (that.option.cptDataForm.pollTime && that.option.cptDataForm.pollTime !== 0) {//轮询
      that.pollTimer = setInterval(function () {
        that.refreshCptData();
      }, that.option.cptDataForm.pollTime * 1000)
    }
  },
  methods: {
    refreshCptData() {
        getDataStr(this.option.cptDataForm).then(res => {
          this.flopConfig = {
            number: res.split(',').map(Number),
            content: this.option.content,
            toFixed: this.option.toFixedNum
          }
        });
    },
  },
  beforeDestroy() {
    if(this.pollTimer) { //关闭定时器
      clearInterval(this.pollTimer);
    }
  }
}
</script>

<style scoped>

</style>
