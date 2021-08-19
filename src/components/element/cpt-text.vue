<template>
  <div :style="{textAlign:option.textAlign,color:option.textColor,fontSize: option.textSize+'px',fontStyle:option.fontStyle,
    fontWeight:option.fontWeight,lineHeight:option.textLineHeight+'px',fontFamily:option.textFamily,
    textDecoration:option.textDecoration}" @click="redirect">
    {{cptData}}
  </div>
</template>

<script>
export default {
  name: "cpt-text",
  title: '文字框',
  icon: 'el-icon-chat-line-square',
  initWidth: 150,
  initHeight: 30,
  group:'basic',
  props: {
    option: Object
  },
  data() {
    return {
      cptData: ''
    }
  },
  created() {
    this.refreshCptData();
  },
  methods: {
    refreshCptData(){
      this.cptData = this.option.cptDataForm.dataText
      if(this.option.cptDataForm.dataSource === 2){//调接口
        this.$message.warning('接口还未实现')
      }
    },
    redirect(){
      if (this.option.url){
        window.open(this.option.url)
      }
    }
  },
}
</script>

<style scoped>

</style>
