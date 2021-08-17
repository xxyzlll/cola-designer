<template>
  <el-form label-width="100px" size="mini">
    <el-form-item label="标题">
      <el-input v-model="option.seriesName"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "cpt-chart-gcMap-option",
  props: {option: Object},
}
</script>

<style scoped>

</style>
