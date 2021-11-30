<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="格式化">
      <el-input v-model="option.content"/>
    </el-form-item>
    <el-form-item label="小数位数">
      <el-input v-model="option.toFixedNum"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "cpt-dataV-digitalFlop-option",
  props: { option: Object },
  data(){
    return {
    }
  }
}
</script>

<style scoped>

</style>
