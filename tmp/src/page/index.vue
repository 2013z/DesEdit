<template>
  <div class="container">
    <el-header>
      <div class="header-box" v-for="(item, key) in chapList" :key="key">
        <span v-show="key == pageIndex - 1">{{ item }}</span>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <draggable>
          <div
            :class="{ active: btnTagName == tagsList[key].name }"
            v-for="(item, key) in tagsList"
            :key="key"
          >
            <span v-show="item.state">{{ item.detail }}</span>
            <el-button
              size="mini"
              type="primary"
              @click="btnTagName = tagsList[key].name"
              @mouseover.native="item.state = true"
              @mouseout.native="item.state = false"
              >{{ item.name }}</el-button
            >
          </div>
        </draggable>
        <el-button @click="addTagDialog">添加自定义标签</el-button>
        <el-button @click="layoutDialog">常用布局</el-button>
      </el-aside>
      <el-main>
        <mavonEditor
          v-if="editWay"
          v-model="editContent"
          ref="editor"
          @change="editorChange"
          style="min-height: 400px"
        ></mavonEditor>
        <div class="drag-edit-box" v-if="!editWay"></div>
        <el-button @click="editWay = !editWay">{{
          !editWay ? "切换为代码编辑方式" : "切换为标签拖拽方式"
        }}</el-button>
      </el-main>
    </el-container>
    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="getNext"
        :total="60"
      >
      </el-pagination>
    </el-footer>
    <!-- 添加标签对话框 -->
    <el-dialog title="标签" :visible.sync="tagDialogState">
      <el-input
        v-model="currentTagName"
        placeholder="请输入标签名：如div、span"
      />
      <el-input
        v-model="currentTagDetail"
        placeholder="请输入标签描述信息：如块标签、行标签、行内块标签"
      />
      <el-button @click="createTagBtn">创建</el-button>
    </el-dialog>
    <!-- 常用布局展示 -->
  </div>
</template>

<script>
import "@/assets/js/jquery-3.4.1.min.js";
import { mavonEditor } from "mavon-editor";
import draggable from "vuedraggable";
export default {
  name: "index",
  data() {
    return {
      // 标签对话框状态
      tagDialogState: false,
      // 当前按钮标签名
      btnTagName: "",
      // 当前标签名称
      currentTagName: "",
      // 当前标签描述
      currentTagDetail: "",
      // 当前编辑方式
      editWay: true,
      // markdown内容
      editContent: "",
      // 当前页面功能
      pageIndex: 0,
      chapList: [
        "快速上手HTML",
        "认识标签主要属性",
        "常用标签",
        "CSS设计布局",
        "开始让页面动起来",
        "业务逻辑"
      ],
      studyContent: [{}, {}, {}, {}, {}, {}],
      tagsList: [
        {
          name: "div标签",
          content: "<div>div</div>",
          detail: "块标签",
          state: false
        },
        { name: "p标签", content: "<p>p</p>", detail: "块标签", state: false },
        {
          name: "span标签",
          content: "<span>span</span>",
          detail: "行标签",
          state: false
        },
        { name: "a标签", content: "<a>a</a>", detail: "行标签", state: false },
        {
          name: "input标签",
          content: "<input>input</input>",
          detail: "行内块标签",
          state: false
        }
      ]
    };
  },
  created() {},
  mounted() {
    let _this = this;
    _this.getNext(1);
    _this.editContent =
      "<!DOCTYPE>\n\<html>\n\
  <head>\n\
    <meta charset='utf-8'/>\n\
    <style>\n\
    </style>\n\
  </head>\n\
  <body>\n\
  <!-- 此处为标签编辑区 -->\n\n\n\
  </body>\n\
</html>";
  },
  methods: {
    getNext(pageIndex) {
      let _this = this;
      _this.pageIndex = pageIndex;
    },
    // markdown内容更改
    editorChange(e) {
      // debugger;
    },
    addTagDialog() {
      let _this = this;
      _this.tagDialogState = true;
    },
    createTagBtn() {
      let _this = this;
      if (_this.currentTagName == "" || _this.currentTagDetail == "") {
        return _this.$message("创建失败");
      }
      _this.tagsList.push({
        name: _this.currentTagName + "标签",
        content: `<${_this.currentTagName}>${_this.currentTagName}</${_this.currentTagName}>`,
        detail: _this.currentTagDetail,
        state: false
      });
      _this.tagDialogState = false;
    },
    layoutDialog() {}
  },
  computed: {},
  components: {
    mavonEditor,
    draggable
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
// @import url(./../assets/css/common.css);
.container {
  .active {
    button {
      background: forestgreen;
      border: none;
    }
  }
  .el-header {
    height: auto !important;
    text-align: center;
    .header-box {
      display: inline-block;
      span {
        font-size: 20px;
      }
    }
  }
  .el-container {
    display: flex;
    .el-aside {
      width: 200px !important;
      padding-top: 30px;
      text-align: center;
      .el-button {
        margin: 10px 0px;
      }
      div {
        position: relative;
        text-align: center;
        span {
          position: absolute;
          top: -22px;
          right: 10px;
          padding: 4px;
          border: solid 1px gainsboro;
          border-radius: 4px;
        }
      }
    }
    .el-main {
      flex: 1;
      height: inherit;
      .drag-edit-box {
        height: inherit;
      }
    }
  }
  .el-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    .el-pagination {
      display: inline-block;
    }
  }
}
</style>
