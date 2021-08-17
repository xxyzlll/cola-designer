<template>
  <div style="width: 100%;height:100%;" :id="uuid"></div>
</template>

<script>
export default {
  name: "cpt-chart-gcMap",
  title: "渐变地图",
  icon: 'el-icon-map-location',
  initWidth: 400,
  initHeight: 400,
  group: 'echarts',
  props:{
    width:Number,
    option:Object
  },
  data(){
    return {
      uuid:'',
      chartOption:{},
      chart:undefined,
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
    this.loadChart(this.option);
  },
  methods:{
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
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.23,
          top: 120,
          label: {
            show: true,
            fontSize: "14",
            color: "#555"
          },
          itemStyle: {
            borderColor: "#777",//边界线颜色
          },
          emphasis: {
            areaColor: "#f2d5ad",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            borderWidth: 0
          }
        },
        series: [{
          name: option.seriesName,
          type: "map",
          geoIndex: 0,
          data: option.dataList
        }]
      }
      that.chart.setOption(that.chartOption);
    }
  }
}
</script>

<style scoped>

</style>
