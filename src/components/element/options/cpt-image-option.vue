<template>
  <div>
    <el-form label-width="80px" size="mini">
      <el-form-item label="图片地址">
        <el-input v-model="option.url"/>
      </el-form-item>
<!--      <el-form-item label="图库选择">
        <div class="formItemDiv" @click="showGallery">图库选择</div>
      </el-form-item>-->
      <el-form-item label="填充方式">
        <el-select v-model="option.fit" placeholder="请选择填充方式">
          <el-option label="fill" value="fill"/>
          <el-option label="contain" value="contain"/>
          <el-option label="cover" value="cover"/>
          <el-option label="none" value="none"/>
          <el-option label="scale-down" value="scale-down"/>
        </el-select>
      </el-form-item>
      <el-form-item label="点击放大">
        <el-radio-group v-model="option.preview">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <gallery ref="gallery"/>
  </div>
</template>

<script>
import Gallery from "@/views/designer/gallery";
export default {
  name: "cpt-image-option",
  components: {Gallery},
  props: {option: Object},
  data(){
    return {

    }
  },
  methods:{
    showGallery(){
      this.$refs.gallery.opened();
    }
  }
}
</script>

<style scoped>

</style>
