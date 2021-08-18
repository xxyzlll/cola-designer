<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="标题">
      <el-input v-model="option.seriesName"/>
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="option.geoLabelColor" show-alpha/>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input-number v-model="option.geoLabelSize" :min="12" :max="100"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "cpt-chart-mapGc-option",
  props: {option: Object},
}
</script>

<style scoped>

</style>
