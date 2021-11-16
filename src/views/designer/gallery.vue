<template>
  <div>
    <el-dialog title="图片素材库" :visible.sync="modelShow" width="75%" :close-on-click-modal="false">
      <el-tabs v-model="activeGroup" @tab-click="handleClick" type="border-card" @tab-remove="removeTab">
        <el-tab-pane v-for="item in groupPanes" :key="item.name"
                     :label="item.label" :name="item.name" closable>
          <el-row :gutter="6">
            <el-col :span="4" v-for="item2 in item.total" :key="item2">
              <div style="border: 1px solid #ccc;height: 150px;"></div>
              <div style="background-color: #ccc;height: 20px;margin-bottom: 6px;">{{ item2 }}</div>
            </el-col>
            <el-col :span="4">
              <div style="border: 1px solid #ccc;height: 150px;
                  text-align: center;font-size: 90px;line-height: 140px;cursor: pointer;color: #aaa">
                <i class="el-icon-plus"></i>
              </div>
            </el-col>
          </el-row>
          <el-pagination style="margin-top: 16px;"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="1" background
                         :page-sizes="[11, 23, 59, 119]"
                         :page-size="100"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="400">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="新增分组" name="add">
          <el-form :inline="true" :model="formGroup" class="demo-form-inline" size="small">
            <el-form-item label="分组名称">
              <el-input v-model="formGroup.groupName" placeholder="分组名称"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保 存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modelShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="modelShow = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "gallery",
  data(){
    return {
      groupPanes:[
        {name:'bg',label:'背景库',total:11},
        {name:'img',label:'图片库',total:5},
      ],
      modelShow:false,
      activeGroup:'bg',
      formGroup:{name:''}
    }
  },
  methods:{
    opened(){
      this.modelShow = true
    },
    removeTab(targetName) {//询问处理、当前选中项处理、刷新处理
      console.log(targetName)
      this.groupPanes = this.groupPanes.filter(tab => tab.name !== targetName);
      this.activeGroup = this.groupPanes[0].name
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style scoped>
/*.el-dialog__header,.el-dialog__body {
  background: #222;
}
.el-dialog__footer {
  background-color: #222 !important;

}*/
</style>
