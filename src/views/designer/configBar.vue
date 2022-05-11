<template>
  <div>
    <div style="position: fixed; z-index: 1801; bottom: 40px; right: 30px">
      <el-button
        style="background-color: #3f4b5f; color: white"
        icon="el-icon-s-operation"
        circle
        @click="configBarShow = !configBarShow"
      ></el-button>
    </div>
    <transition appear name="configTs">
      <div v-show="configBarShow">
        <el-row
          style="
            position: fixed;
            width: 260px;
            height: 450px;
            z-index: 1802;
            bottom: 84px;
            right: 30px;
            border-radius: 6px;
            background: rgba(228, 230, 236, 0.9);
            border: 1px solid #3f4b5f;
          "
        >
          <el-row v-drag class="cptTitle">
            <el-col :span="21"><div>组件属性</div></el-col>
            <el-col :span="3">
              <div class="closeItem" @click="closeBar">
                <i class="el-icon-close" />
              </div>
            </el-col>
          </el-row>
          <el-tabs v-model="configTab" :stretch="true">
            <el-tab-pane label="坐标" name="basic">
              <div style="width: 200px; margin: 0 auto">
                <el-row style="padding: 10px 6px 0 6px">
                  宽度：<el-input-number
                    :min="20"
                    :max="2000"
                    v-model="currentCpt.cptWidth"
                    size="small"
                  />
                </el-row>
                <el-row style="padding: 10px 6px 0 6px">
                  高度：<el-input-number
                    :min="20"
                    :max="1500"
                    v-model="currentCpt.cptHeight"
                    size="small"
                  />
                </el-row>
                <el-row style="padding: 10px 6px 0 6px">
                  X 轴：<el-input-number
                    :min="-500"
                    :max="2500"
                    v-model="currentCpt.cptX"
                    size="small"
                  />
                </el-row>
                <el-row style="padding: 10px 6px 0 6px">
                  Y 轴：<el-input-number
                    :min="-500"
                    v-model="currentCpt.cptY"
                    size="small"
                  />
                </el-row>
                <el-row style="padding: 10px 6px 0 6px">
                  Z 轴：<el-input-number
                    :min="1"
                    :max="1800"
                    v-model="currentCpt.cptZ"
                    size="small"
                  />
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="属性" name="custom">
              <div class="customForm" v-if="currentCpt && currentCpt.option">
                <comment
                  :is="currentCpt.cptName + '-option'"
                  :attribute="currentCpt.option.attribute"
                />
              </div>
            </el-tab-pane>
            <!--      展示数据表单需在option.js初始化cptDataForm-->
            <el-tab-pane label="数据" name="data" v-if="cptDataFormShow">
              <div class="customForm">
                <el-form size="mini" label-position="top">
                  <el-form-item label="数据类型">
                    <el-radio-group
                      v-model="currentCpt.option.cptDataForm.dataSource"
                      @change="changeDataSource"
                    >
                      <el-radio :label="1">静态数据</el-radio>
                      <el-radio :label="2">接口</el-radio>
                      <el-radio :label="3">sql</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    label="轮询"
                    v-show="currentCpt.option.cptDataForm.dataSource !== 1"
                  >
                    <el-switch
                      v-model="dataPollEnable"
                      active-text="开启"
                      inactive-text="关闭"
                    />
                  </el-form-item>
                  <el-form-item label="轮询时间(s)" v-show="dataPollEnable">
                    <el-input-number
                      v-model="currentCpt.option.cptDataForm.pollTime"
                      :min="0"
                      :max="100"
                      label="描述文字"
                    />
                  </el-form-item>
                  <el-form-item
                    :label="
                      dataLabels[currentCpt.option.cptDataForm.dataSource - 1]
                    "
                  >
                    <vue-json-editor
                      v-show="currentCpt.option.cptDataForm.dataSource === 1"
                      v-model="dataJson"
                      :show-btns="false"
                      :expandedOnStart="true"
                      :mode="'code'"
                      @json-change="onJsonChange"
                    ></vue-json-editor>
                    <el-input
                      v-show="currentCpt.option.cptDataForm.dataSource === 2"
                      type="textarea"
                      :rows="5"
                      v-model="currentCpt.option.cptDataForm.apiUrl"
                    />
                    <codemirror
                      class="code"
                      v-show="currentCpt.option.cptDataForm.dataSource === 3"
                      v-model="currentCpt.option.cptDataForm.sql"
                      :options="cmOptions"
                    ></codemirror>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      style="width: 100%"
                      @click="refreshCptData"
                      >刷新数据</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </div>
    </transition>
  </div>
</template>

<script>
import { isJSON } from '@/utils/myutils';
import vueJsonEditor from 'vue-json-editor';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/keymap/sublime'; //sublime编辑器效果
import 'codemirror/theme/dracula.css'; // 配置里面也需要theme设置为monokai
import 'codemirror/mode/sql/sql.js'; // 配置里面也需要mode设置为vue
import 'codemirror/addon/selection/active-line'; //光标行背景高亮，配置里面也需要styleActiveLine设置为true

export default {
  name: 'configBar',
  props: {
    currentCpt: Object,
  },
  components: {
    vueJsonEditor,
    codemirror,
  },
  watch: {
    currentCpt(newVal) {
      this.cptDataFormShow = false;
      if (!newVal || !newVal.option) {
        //清空时
        this.configBarShow = false;
      } else {
        if (this.currentCpt.option.cptDataForm) {
          this.cptDataFormShow = true;
        } else {
          this.configTab = 'basic'; //解決上一組件沒有数据表单导致tab栏未选中bug
        }
      }
    },
  },
  computed: {
    dataPollEnable: {
      get() {
        return !!(
          this.currentCpt.option.cptDataForm &&
          this.currentCpt.option.cptDataForm.pollTime &&
          this.currentCpt.option.cptDataForm.pollTime !== 0
        );
      },
      set(newValue) {
        if (newValue) {
          this.currentCpt.option.cptDataForm.pollTime = 8;
        } else {
          this.currentCpt.option.cptDataForm.pollTime = 0;
          this.refreshCptData(); //清除定时器
        }
        return newValue;
      },
    },
    dataJson: {
      get() {
        if (isJSON(this.currentCpt.option.cptDataForm.dataText)) {
          return JSON.parse(this.currentCpt.option.cptDataForm.dataText);
        } else {
          return {};
        }
      },
      set(newValue) {
        this.currentCpt.option.cptDataForm.dataText = JSON.stringify(newValue);
      },
    },
  },
  data() {
    return {
      cptDataFormShow: false,
      configTab: 'custom',
      dataLabels: ['数据', '接口地址', 'sql'],
      configBarShow: false,
      hasJsonFlag: true,
      cmOptions: {
        tabSize: 4, // tab的空格个数
        theme: 'dracula', //主题样式
        lineNumbers: true, //是否显示行数
        lineWrapping: true, //是否自动换行
        styleActiveLine: true, //line选择是是否加亮
        matchBrackets: true, //括号匹配
        mode: 'text/x-sparksql', //实现javascript代码高亮
        readOnly: false, //只读

        keyMap: 'default',
        extraKeys: { tab: 'autocomplete' },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        hintOptions: {
          completeSingle: false,
          tables: {},
        },
      },
    };
  },
  methods: {
    changeDataSource(val) {
      //静态数据不显示轮询按钮
      if (val === 1) {
        this.currentCpt.option.cptDataForm.pollTime = 0;
      }
    },
    // 刷新数据，调用父组件(index)中refreshCptData方法
    // 在父组件中再调用选中图层中的refreshCptData方法
    // 图层中的refreshCptData方法再自行调后端接口渲染数据，文本框的内容和数据类型组装在option.cptDataForm中
    refreshCptData() {
      this.$emit('refreshCptData');
    },
    showConfigBar() {
      this.configBarShow = true;
    },
    closeBar() {
      this.configBarShow = false;
    },
  },
  directives: {
    drag(el) {
      el.onmousedown = function (e) {
        const disX = e.clientX - el.parentNode.offsetLeft;
        const disY = e.clientY - el.parentNode.offsetTop;
        document.onmousemove = function (e) {
          el.parentNode.style.left = e.clientX - disX + 'px';
          el.parentNode.style.top = e.clientY - disY + 'px';
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
        return false;
      };
    },
  },
};
</script>

<style scoped>
.cptTitle {
  line-height: 35px;
  text-align: center;
  background: #3f4b5f;
  color: #fff;
}
.cptTitle:hover {
  cursor: move;
}
.closeItem:hover {
  cursor: pointer;
  background: #2b3340;
}
.customForm {
  padding: 0 6px 0 4px;
  height: 350px;
  overflow: auto;
}
.configTs-enter-active,
.configTs-leave-active {
  transition: all 0.3s;
}
.configTs-enter,
.configTs-leave-to {
  opacity: 0;
  transform: scale(0.3);
  transform-origin: right bottom;
}
</style>
