<template>
  <div style="width: 100%;height:100%;" :id="uuid"></div>
</template>

<script>
export default {
  name: "cpt-chart-mapGc",
  title: "渐变地图",
  icon: 'el-icon-map-location',
  initWidth: 350,
  initHeight: 350,
  group: 'map',
  props:{
    width:Number,
    option:Object
  },
  data(){
    return {
      uuid:'',
      chartOption:{},
      chart:undefined,
      cptData:[]
    }
  },
  watch:{
    width(){
      this.chart.resize();
    }
  },
  created() {
    this.uuid = require('uuid').v1();
  },
  mounted() {
    this.chart = this.$echarts.init(document.getElementById(this.uuid));
    this.refreshCptData();
  },
  methods:{
    refreshCptData(){
      this.cptData = JSON.parse(this.option.cptDataForm.dataText)
      if(this.option.cptDataForm.dataSource === 2){//调接口
        this.$message.warning('接口还未实现')
      }
      this.loadChart(this.option);
    },
    loadChart(option) {
      const that = this;
      that.chartOption = {
        tooltip: {
          formatter: function(e) {//e, t, n
            return e.seriesName + "<br />" + e.name + "：" + e.value
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 26,
          bottom: 40,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [{
            gt: 100,
            label: "> 100 人",
            color: "#7f1100"
          }, {
            gte: 10,
            lte: 100,
            label: "10 - 100 人",
            color: "#ff5428"
          }, {
            gte: 1,
            lt: 10,
            label: "1 - 9 人",
            color: "#ff8c71"
          }, {
            gt: 0,
            lt: 1,
            label: "疑似",
            color: "#ffd768"
          }, {
            value: 0,
            color: "#ffffff"
          }],
          show: !0
        },
        geo: {
          map: "china",
          roam: option.roam,//允许缩放
          //scaleLimit: { min: 1, max: 2 },//允许缩放级别
          zoom: 1.23,
          label: {
            show: true,
            fontSize: option.geoLabelSize,
            color: option.geoLabelColor
          },
          itemStyle: {
            borderColor: "#777",//边界线颜色
          },
        },
        series: [{
          name: option.seriesName,
          type: "map",
          geoIndex: 0,
          data: this.cptData
        }]
      }
      that.chart.setOption(that.chartOption);
    }
  }
}
</script>

<style scoped>

</style>
