<template>
  <div class="base-container">
    <el-header>
      <input
        id="files-doc"
        style="display:none;"
        type="file"
        @change="loadFile"
      />
      <input
        id="files-pict"
        style="display:none;"
        type="file"
        @change="loadPict"
        multiple
      />
      <el-button size="mini" @click.stop="openSrcDlg" v-show="isStart"
        >关联工程资源</el-button
      ><el-button size="mini" @click.stop="saveFile('all')" v-show="isStart"
        >导出</el-button
      ><el-button size="mini" @click.stop="helpDlg = true" v-show="isStart"
        >帮助</el-button
      >
    </el-header>
    <el-container>
      <el-aside v-show="desList.length > 0">
        <el-input
          class="search-box"
          placeholder="搜索"
          v-model="searchDesName"
          @blur="searchObj('des')"
        />
        <div class="aside-box">
          <div style="height: 100%;position: relative;overflow-x: hidden;">
            <div
              :id="item"
              :class="{
                'obj-box': true,
                'is-active': desNameList[key] == currentDesName
              }"
              v-for="(item, key) in desNameList"
              :key="key"
              @click="setOpIndex(key, 'des')"
            >
              <!-- <el-tag :key="key" closable >{{ item }}</el-tag> -->
              {{ item
              }}<span
                class="el-icon-circle-close"
                @click="delDesObj(key)"
              ></span>
            </div>
          </div>
        </div>
        <el-button class="add-obj-btn" @click="showAddObjDlg('des')"
          >添加</el-button
        >
      </el-aside>
      <el-main>
        <div class="des-box" v-if="desList.length > 0" :key="refresh">
          <div style="border: solid 1px; margin:5px 5px 0px 0px;">
            <span>Position</span>
            <el-row>
              <el-col style="width: 120px"
                ><span>X :</span
                ><el-input v-model="desList[desIndex].Position.X"
              /></el-col>
              <el-col style="width: 120px"
                ><span>Y:</span><el-input v-model="desList[desIndex].Position.Y"
              /></el-col>
              <el-col style="width: 120px"
                ><span>Z:</span
                ><el-input v-model="desList[desIndex].Position.Z"/></el-col
            ></el-row>
          </div>
          <div style="border: solid 1px; margin:5px 5px 0px 0px;">
            <span>Quaternion</span>
            <el-row>
              <el-col style="width: 120px"
                ><span>W:</span
                ><el-input v-model="desList[desIndex].Quaternion.W"
              /></el-col>
              <el-col style="width: 120px"
                ><span>X:</span
                ><el-input v-model="desList[desIndex].Quaternion.X"
              /></el-col>
              <el-col style="width: 120px"
                ><span>Y:</span
                ><el-input v-model="desList[desIndex].Quaternion.Y"
              /></el-col>
              <el-col style="width: 120px"
                ><span>Z:</span
                ><el-input v-model="desList[desIndex].Quaternion.Z"
              /></el-col>
            </el-row>
          </div>
          <div style="border: solid 1px; margin:5px 5px 0px 0px;">
            <span>TextureAnimation</span>
            <el-row>
              <el-col style="width: 120px"
                ><span>L : </span
                ><el-input v-model="desList[desIndex].TextureAnimation.LOCK"
              /></el-col>
              <el-col style="width: 120px"
                ><span>X:</span
                ><el-input v-model="desList[desIndex].TextureAnimation.X"
              /></el-col>
              <el-col style="width: 120px"
                ><span>Y:</span
                ><el-input v-model="desList[desIndex].TextureAnimation.Y"
              /></el-col>
            </el-row>
          </div>
          <div style="border: solid 1px; margin:5px 5px 0px 0px;">
            <span>Custom</span>
            <div style="height: 200px; overflow-y: auto">
              <el-row
                style="display: flex; margin: 5px 0px;"
                v-for="(it, k) in Object.keys(desList[desIndex].Custom)"
                :key="k"
              >
                <!-- <template v-if="it == 'model' || it == 'name'"> -->
                <span style="line-height: 40px;">{{ it }}=</span
                ><el-input v-model="desList[desIndex].Custom[it]" />
                <!-- </template> -->
                <!-- <template v-else>
                  <span>{{ it }}</span
                  >=<span>{{ desList[index].Custom[it] }}</span>
                </template> -->
              </el-row>
            </div>
          </div>
        </div>
        <div class="check-box" v-show="desList.length > 0">
          <div class="insert-custom-list">
            <el-checkbox
              label="visible"
              true-label="visible:1"
              false-label="visible"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-checkbox
              label="billboard"
              true-label="billboard:1"
              false-label="billboard"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-checkbox
              label="blockplayer"
              true-label="blockplayer:1"
              false-label="blockplayer"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-checkbox
              label="ObjectType"
              true-label="ObjectType:camerabox"
              false-label="ObjectType"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-checkbox
              label="ticket"
              true-label="ticket:6"
              false-label="ticket"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-checkbox
              label="collision"
              true-label="collision:1"
              false-label="collision"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-checkbox
              label="Ani"
              true-label="Ani:1"
              false-label="Ani"
              @change="setCustomInfo"
            ></el-checkbox>
            <el-radio
              v-for="(item, key) in customAttrRadioList"
              :key="key"
              v-model="currentCustomAttr"
              :label="item.label"
            ></el-radio>
          </div>
          <div class="custom-check-val">
            <el-button
              class="el-icon-plus"
              style="width: 100%; text-align: center; border-radius: 0;"
              @click="addCustomAttrNode"
              v-show="currentCustomAttr != 'damage'"
            >
            </el-button>
            <el-slider
              v-show="currentCustomAttr == 'damage'"
              v-model="damageAttrCount"
              :min="0"
              :max="1000"
              show-input
              @change="setCustomInfoByDamage"
            >
            </el-slider>
            <div
              ref="name"
              class="name-list"
              v-if="currentCustomAttr == 'name'"
            >
              <div
                style="display: flex; margin: 3px 7px; line-height: 40px; border: solid 1px;"
                v-for="(item, key) in customAttrNameList"
                :key="key"
              >
                <el-input
                  v-model="item.label"
                  style="border-radius: 0; height: 40px; flex:1;"
                >
                  <template slot="append">
                    <el-checkbox-button
                      :class="{
                        'is-active':
                          currentAttrName == customAttrNameList[key].label
                      }"
                      style="border-radius: 0;"
                      :true-label="`name:${item.label}`"
                      false-label="name"
                      @change="setCustomInfo($event, item.label)"
                    ></el-checkbox-button>
                  </template>
                </el-input>
                <el-button
                  size="mini"
                  style="height: 40px;width: 50px;padding: 0; margin:0; border-radius:0;vertical-align: bottom; outline:none;border:none;"
                  @click="delCustomAttr(key)"
                  >删除</el-button
                >
              </div>
            </div>
            <div
              ref="model"
              class="model-list"
              v-if="currentCustomAttr == 'model'"
            >
              <div
                style="display: flex; margin: 3px 5px;"
                v-for="(item, key) in customAttrModelList"
                :key="key"
              >
                <el-checkbox
                  :true-label="`model:${item.label}`"
                  false-label="model"
                  @change="setCustomInfo($event, item.label)"
                >
                  <template slot="default">
                    <img :src="modelUrl + item.label" />
                  </template>
                </el-checkbox>
                <div style="flex: 1;">
                  <el-input
                    v-model="item.label"
                    style="width: 100%; height: 50%;"
                  />
                  <el-button
                    size="mini"
                    style="height:  50%;width: 100%;padding: 0; margin:0; border-radius:0;vertical-align: bottom;"
                    @click="delCustomAttr(key)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
            <div
              ref="effect"
              class="effect-list"
              v-if="currentCustomAttr == 'effect'"
            >
              <div
                style="display: flex; margin: 3px 5px;"
                v-for="(item, key) in customAttrEffectList"
                :key="key"
              >
                <el-checkbox
                  :true-label="`effect:${item.label}`"
                  false-label="effect"
                  @change="setCustomInfo($event, item.label)"
                >
                  <template slot="default">
                    <img :src="effectUrl + item.label" />
                  </template>
                </el-checkbox>
                <div style="flex: 1;">
                  <el-input
                    v-model="item.label"
                    style="width: 100%; height: 50%;"
                  />
                  <el-button
                    size="mini"
                    style="height:  50%;width: 100%;padding: 0; margin:0; border-radius:0;vertical-align: bottom;"
                    @click="delCustomAttr(key)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="gmc-box" v-if="gmcList.length > 0">
          <el-aside>
            <el-input
              class="search-box"
              placeholder="搜索"
              v-model="searchGmcName"
              @blur="searchObj('gmc')"
            />
            <div class="aside-box">
              <div
                style="height: 100%;
        position: relative;
        overflow-x: hidden;"
              >
                <div
                  :id="item"
                  :class="{
                    'obj-box': true,
                    'is-active': gmcNameList[key] == currentGmcName
                  }"
                  v-for="(item, key) in gmcNameList"
                  :key="key"
                  @click="setOpIndex(key, 'gmc')"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <el-button
              style="display:none;"
              class="add-obj-btn"
              @click="showAddObjDlg('gmc')"
              >添加</el-button
            >
          </el-aside>
        </div>
        <div class="gmc-attr-box" v-if="gmcList.length > 0">
          <div class="gmc-attr-top-box">
            <div>
              <span>Texture</span>
              <el-row>
                <el-col style="width: 135px"
                  ><span>val1 :</span
                  ><el-tooltip placement="top">
                    <div slot="content">
                      <el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Texture.val1 = '0'"
                        >0</el-button
                      ><el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Texture.val1 = '1'"
                        >1</el-button
                      ><el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Texture.val1 = '-1'"
                        >-1</el-button
                      >
                    </div>
                    <el-input
                      v-model="gmcList[gmcIndex].Texture.val1"/></el-tooltip
                ></el-col>
                <el-col style="width: 135px"
                  ><span>val2:</span
                  ><el-tooltip placement="top"
                    ><div slot="content">
                      <el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Texture.val2 = 'COLORKEY'"
                        >COLORKEY</el-button
                      ><el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Texture.val2 = 'ALPHACHANNEL'"
                        >ALPHACHANNEL</el-button
                      ><el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Texture.val2 = 'NORMAL'"
                        >NORMAL</el-button
                      >
                    </div>
                    <el-input
                      v-model="gmcList[gmcIndex].Texture.val2"/></el-tooltip
                ></el-col>
              </el-row>
            </div>
            <div>
              <span>TwoSide</span>
              <el-row>
                <el-col style="width: 135px"
                  ><span>val1 :</span
                  ><el-tooltip placement="top">
                    <div slot="content">
                      <el-button
                        size="mini"
                        @click="gmcList[gmcIndex].TwoSide.val1 = '0'"
                        >0</el-button
                      ><el-button
                        size="mini"
                        @click="gmcList[gmcIndex].TwoSide.val1 = '1'"
                        >1</el-button
                      >
                    </div>
                    <el-input
                      v-model="
                        gmcList[gmcIndex].TwoSide.val1
                      "/></el-tooltip></el-col
              ></el-row>
            </div>
            <div>
              <span>Blend</span>
              <el-row>
                <el-col style="width: 135px"
                  ><span>val1 :</span
                  ><el-tooltip placement="top">
                    <div slot="content">
                      <el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Blend.val1 = 'DISABLE'"
                        >DISABLE</el-button
                      ><el-button
                        size="mini"
                        @click="gmcList[gmcIndex].Blend.val1 = 'ENABLE'"
                        >ENABLE</el-button
                      >
                    </div>
                    <el-input
                      v-model="gmcList[gmcIndex].Blend.val1"/></el-tooltip
                ></el-col>
                <el-col style="width: 135px"
                  ><span>val2:</span
                  ><el-tooltip placement="top">
                    <div slot="content">
                      <el-button size="mini" @click="setBlendAttrLink(2, 'sa')"
                        >sa</el-button
                      ><el-button size="mini" @click="setBlendAttrLink(2, 's')"
                        >s</el-button
                      >
                    </div>
                    <el-input
                      v-model="gmcList[gmcIndex].Blend.val2"/></el-tooltip
                ></el-col>
                <el-col style="width: 135px"
                  ><span>val3:</span
                  ><el-tooltip placement="top">
                    <div slot="content">
                      <el-button
                        size="mini"
                        @click="setBlendAttrLink(3, '1-sa')"
                        >1-sa</el-button
                      ><el-button
                        size="mini"
                        @click="setBlendAttrLink(3, '1-a')"
                        >1-a</el-button
                      >
                    </div>
                    <el-input
                      v-model="
                        gmcList[gmcIndex].Blend.val3
                      "/></el-tooltip></el-col
              ></el-row>
            </div>
            <div>
              <span>Opaque</span>
              <el-row style="width: 270px;margin: 0px 20px;">
                <!-- <el-col style="width: 130px"
                  ><span>val1 :</span
                  ><el-tooltip placement="top">
                    <div slot="content">多行信息<br />第二行信息</div>
                    <el-input
                      v-model="
                        gmcList[gmcIndex].Opaque.val1
                      "/></el-tooltip></el-col
              > -->
                <el-slider
                  class="opaque-slider"
                  v-model="gmcList[gmcIndex].Opaque.val1"
                  :step="0.1"
                  :min="0"
                  :max="1"
                  show-input
                >
                </el-slider>
              </el-row>
            </div>
          </div>
          <div class="gmc-attr-bottom-box"></div>
        </div>
      </el-main>
      <div
        v-if="!isStart"
        style="width: 100%;height: 100%; font-size: 100px; text-align: center; position:relative;"
        id="shadow"
      >
        <div
          style="width: 400px;height: 200px;position:absolute; top:0;bottom:0;left:0;right:0;margin:auto;"
        >
          <span>Welcome</span>
          <div style="font-size:14px;">
            <el-button size="mini" @click.stop="isStart = true">开始</el-button>
          </div>
          <p style="font-size: 14px;">DES-GMC渣渣编辑器</p>
        </div>
      </div>
    </el-container>
    <el-dialog title="自定义属性" :visible.sync="customAttrDlg">
      <div class="dialog-header">
        <span>属性名：</span
        ><el-input placeholder="请输入要添加的custom属性名" />
      </div>
      <div class="dialog-body">
        <span>个数：</span
        ><el-input placeholder="请输入要添加的custom属性个数" />
      </div>
      <div class="dialog-footer"></div>
    </el-dialog>
    <el-dialog
      title="工程资源设置"
      v-dialogDrag
      :close-on-press-escape="false"
      :visible.sync="projectSrcDlg"
    >
      <div class="dialog-node">
        <span style="width: 90px;">effectUrl：</span
        ><el-input
          v-model="effectUrl"
          placeholder="请输入effect图片的父级路径（绝对路径）"
        >
          <template slot="append">
            <el-button @click="linkSrc('effect')">关联</el-button>
          </template>
        </el-input>
      </div>
      <div class="dialog-node">
        <span style="width: 90px;">modelUrl：</span
        ><el-input
          v-model="modelUrl"
          placeholder="请输入model图片的父级路径（绝对路径）"
        >
          <template slot="append">
            <el-button @click="linkSrc('model')">关联</el-button>
          </template>
        </el-input>
      </div>
      <div class="dialog-node">
        <span style="width: 90px;">desUrl：</span>
        <!-- <el-input
          v-model="modelUrl"
          placeholder="请输入model图片的父级路径（绝对路径）"
        >
          <template slot="append"> -->
        <el-button @click="linkSrc('des')">关联</el-button
        ><el-button @click.stop="saveFile('des')">导出</el-button>
        <el-button @click.stop="resetList('des')">清空</el-button>
        <!-- </template>
        </el-input> -->
      </div>
      <div class="dialog-node">
        <span style="width: 90px;">gmcUrl：</span>
        <!-- <el-input
          v-model="modelUrl"
          placeholder="请输入model图片的父级路径（绝对路径）"
        >
          <template slot="append"> -->
        <el-button @click="linkSrc('gmc')">关联</el-button
        ><el-button @click.stop="saveFile('gmc')">导出</el-button>
        <el-button @click.stop="resetList('gmc')">清空</el-button>
        <!-- </template>
        </el-input> -->
      </div>
    </el-dialog>
    <el-dialog
      class="add-obj-dialog"
      title="添加DES对象"
      v-dialogDrag
      :close-on-press-escape="false"
      :visible.sync="addObjDlg"
    >
      <div class="dialog-node">
        <span style="width: 130px;">对象名前缀:</span>
        <el-select v-model="preObjName">
          <el-option
            v-for="item in preObjNameList"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <span style="width: 100px;">对象名：</span><el-input v-model="addObjName" />
      </div>
      <div class="dialog-node" v-show="preObjName == 'D_wp'">
        <span>附加对象：D_{{ addObjName }}</span>
      </div>
      <div class="dialog-node">
        <span>数量：</span>
        <el-slider
          v-model="addObjCount"
          :min="1"
          :max="10"
          show-input
        ></el-slider>
      </div>
      <div class="dialog-node">
        <el-button size="mini" @click="addObjs('des')">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="help-dialog"
      title="帮助"
      v-dialogDrag
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="helpDlg"
    >
      <el-carousel :interval="5000" arrow="always">
        <!-- <el-carousel-item v-for="(item, key) in helpImgList" :key="key">
            <div class="dialog-node"><img :src="'./static/img/help/' + item.label"/><p>描述：</p></div>
          </el-carousel-item> -->
        <el-carousel-item v-for="item in 6" :key="item">
          <img
            width="100%"
            height="100%"
            :src="'./static/img/help/' + item + '.jpg'"
          />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
    <!-- <el-footer> </el-footer> -->
    <iframe
      style="height: 0; width: 0; border: none; outline: none; padding:0;margin:0; position:fixed; visibility: hidden;"
      id="desDoc"
    ></iframe>
    <iframe
      style="height: 0; width: 0; border: none; outline: none; padding:0;margin:0; position:fixed; visibility: hidden;"
      id="gmcDoc"
    ></iframe>
  </div>
</template>

<script>
import "@/assets/js/jquery-3.4.1.min.js";
import "@/util/directives";
import { saveAs } from "@/util/FileSaver.js";
import { deepClone } from "@/util/common.js";

export default {
  name: "index",
  data() {
    return {
      // 刷新
      refresh: 0,
      // 鼠标状态
      mouseState: false,
      // 开启
      isStart: false,
      // 文件名
      fileName: "",
      // iframe打开的类型,用于存储
      fileType: "",
      // 查询对象名
      searchDesName: "",
      searchGmcName: "",
      // 当前对象名
      currentDesName: "",
      currentGmcName: "",
      // 当前custom属性名
      currentCustomAttr: "name",
      // 当前custom-name勾选名
      currentAttrName: "",
      // 当前的custom单选列表
      customAttrRadioList: [
        { label: "name" },
        { label: "damage" },
        { label: "model" },
        { label: "effect" }
      ],
      // scene数
      sceneCount: 0,
      // dummey数
      dummeyCount: 0,
      // shader数
      shaderCount: 0,
      // 文档
      desDoc: "",
      gmcDoc: "",
      // sceneList: [],
      // dummeyList: [],
      // 备用
      checkList: [],
      // 对象名列表
      desNameList: [],
      // des对象详情列表-左边
      desList: [],
      // gmc对象详情列表-右边
      gmcList: [],
      // 对象名列表
      gmcNameList: [],
      // custom name属性列表
      customAttrNameList: [],
      // custom model属性列表
      customAttrModelList: [],
      // custom effect属性列表
      customAttrEffectList: [],
      // 图片列表
      imgList: [],
      // 当前操作对象下标
      desIndex: 0,
      gmcIndex: 0,
      // damage数量
      damageAttrCount: 0,
      // opaque数值
      opaqueCount: 0,
      // 自定义custom属性对话框
      customAttrDlg: false,
      // 工程资源路径对话框
      projectSrcDlg: false,
      // 帮助对话框
      helpDlg: false,
      // 自定义对象名对话框
      addObjDlg: false,
      // 添加的对象名
      addObjName: "",
      // 批量添加对象数
      addObjCount: 1,
      // 对象前缀
      preObjName: "",
      // 对象前缀列表
      preObjNameList: [{ label: "D_" }, { label: "D_wp" }, { label: "D_it" }],
      // // 帮助图片列表
      // helpImgList: [{ label: "D_" }, { label: "D_wp" }, { label: "D_it" }],
      // effect路径
      effectUrl: "./static/img/effect/",
      // model路径
      modelUrl: "./static/img/model/",
      // 当前操作的资源路径
      currentOpUrl: "",
      // des路径
      document: {}
    };
  },
  created() {
    let _this = this;
    let effectUrl = localStorage.getItem("effectUrl");
    let modelUrl = localStorage.getItem("modelUrl");
    let names = localStorage.getItem("customAttrNameList");
    let models = localStorage.getItem("customAttrModelList");
    let effects = localStorage.getItem("customAttrEffectList");
    let radios = localStorage.getItem("customAttrRadioList");
    if (effectUrl != undefined && effectUrl != null) {
      _this.effectUrl = JSON.parse(effectUrl);
    }
    if (modelUrl != undefined && modelUrl != null) {
      _this.modelUrl = JSON.parse(modelUrl);
    }
    if (names != undefined && names != null) {
      _this.customAttrNameList = JSON.parse(names);
    } else {
      localStorage.setItem("customAttrNameList", JSON.stringify([]));
      _this.$set(_this, "customAttrNameList", []);
    }
    if (models != undefined && models != null) {
      _this.customAttrModelList = JSON.parse(models);
    } else {
      localStorage.setItem("customAttrModelList", JSON.stringify([]));
      _this.$set(_this, "customAttrModelList", []);
    }
    if (effects != undefined && effects != null) {
      _this.customAttrEffectList = JSON.parse(effects);
    } else {
      localStorage.setItem("customAttrEffectList", JSON.stringify([]));
      _this.$set(_this, "customAttrEffectList", []);
    }
    if (radios != undefined && radios != null) {
      _this.customAttrRadioList = JSON.parse(radios);
    } else {
      localStorage.setItem(
        "customAttrRadioList",
        JSON.stringify(_this.customAttrRadioList)
      );
    }
    _this.document = document;
  },
  mounted() {},
  methods: {
    test(val) {
      console.log(val);
    },
    resetList(flag) {
      let _this = this;
      if (flag == "des") {
        _this.$set(_this, "desDoc", []);
        _this.$set(_this, "desNameList", []);
        _this.$set(_this, "desList", []);
      } else if (flag == "gmc") {
        _this.$set(_this, "gmcDoc", []);
        _this.$set(_this, "gmcNameList", []);
        _this.$set(_this, "gmcList", []);
      }
    },
    openSrcDlg() {
      let _this = this;
      _this.projectSrcDlg = true;
    },
    openDoc() {
      let _this = this;
      // document.getElementById("desDoc").contentWindow.origin = "localhost";
      // document.getElementById("gmcDoc").contentWindow.origin = "localhost";
      if (_this.fileType == "des") {
        debugger; // " --disable-web-security" // ]
        // 如果打包成本地模式，不用端口号，谷歌浏览器会对iframe的src报一个origin "null" from accessing a cross-origin frame
        // 解决的方法是加配置,"runtimeArgs": [
        _this.desDoc = document.getElementById(
          "desDoc"
        ).contentDocument.body.innerText;
        let tmp = _this.desDoc.split("Object ");
        _this.sceneCount = tmp[0].match(/[\d| ]+[ |\d]/gim)[0] * 1;
        _this.dummeyCount = tmp[0].match(/[\d| ]+[ |\d]/gim)[1] * 1;
        console.log(_this.sceneCount);
        console.log(_this.dummeyCount);
        for (let i = 0; i < tmp.length; i++) {
          // 将自定义文本转json格式
          let objList = tmp[i]
            .replace(/\s+/g, " ")
            .split(" ")
            .filter(item => {
              return item != "";
            });
          if (i === 0) {
            continue;
          } else if (i < _this.sceneCount) {
            // 处理Scene对象
            let nameStr = objList[0];
            let attrOneName = objList[2].substring(0, objList[2].length - 1);
            let attrOneValX = objList[3];
            let attrOneValY = objList[4];
            let attrOneValZ = objList[5];
            let attrTwoName = objList[6].substring(0, objList[6].length - 1);
            let attrTwoValW = objList[7];
            let attrTwoValX = objList[8];
            let attrTwoValY = objList[9];
            let attrTwoValZ = objList[10];
            let attrThreeName = objList[11].substring(
              0,
              objList[11].length - 1
            );
            let attrTreeValLock = objList[12];
            let attrTreeValX = objList[13];
            let attrTreeValY = objList[14];
            let attrFourName = objList[15].substring(0, objList[15].length - 1);
            // 将Custom所有的数据挪出
            let customInfoList = objList.slice(17, objList.length - 2);
            // 自定义属性先将字符串以Custom来切割，然后遍历自定义内容，替换=
            for (let j = 0; j < customInfoList.length; j++) {
              // customInfoList[j] = customInfoList[j].replace("=", ":");
              let tmpArr = customInfoList[j].split("=");
              customInfoList[j] = `"${tmpArr[0]}":"${tmpArr[1].substring(
                1,
                tmpArr[1].length - 1
              )}"`;
            }
            // let objStr = `{"${nameStr}":{"${attrOneName}":{"X":"${attrOneValX}","Y":"${attrOneValY}","Z":"${attrOneValZ}"},"${attrTwoName}":{"W":"${attrTwoValW}","X":"${attrTwoValX}","Y":"${attrTwoValY}","Z":"${attrTwoValZ}"},"${attrThreeName}":{"LOCK":"${attrTreeValLock}","X":"${attrTreeValX}","Y":"${attrTreeValY}"}, "${attrFourName}":{${customInfoList.join()}}}}`;
            let objStr = `{"${attrOneName}":{"X":"${attrOneValX}","Y":"${attrOneValY}","Z":"${attrOneValZ}"},"${attrTwoName}":{"W":"${attrTwoValW}","X":"${attrTwoValX}","Y":"${attrTwoValY}","Z":"${attrTwoValZ}"},"${attrThreeName}":{"LOCK":"${attrTreeValLock}","X":"${attrTreeValX}","Y":"${attrTreeValY}"}, "${attrFourName}":{${customInfoList.join()}}}`;
            let obj = JSON.parse(objStr);
            console.log(obj);
            _this.desList.push(obj);
            _this.desNameList.push(nameStr);
          } else if (i > _this.dummeyCount) {
            // 处理Dummey对象
            let nameStr = objList[0];
            let attrOneName = objList[2].substring(0, objList[2].length - 1);
            let attrOneValX = objList[3];
            let attrOneValY = objList[4];
            let attrOneValZ = objList[5];
            let attrTwoName = objList[6].substring(0, objList[6].length - 1);
            let attrTwoValW = objList[7];
            let attrTwoValX = objList[8];
            let attrTwoValY = objList[9];
            let attrTwoValZ = objList[10];
            let attrThreeName = objList[11].substring(
              0,
              objList[11].length - 1
            );
            let attrTreeValLock = objList[12];
            let attrTreeValX = objList[13];
            let attrTreeValY = objList[14];
            let attrFourName = objList[15].substring(0, objList[15].length - 1);
            // 将Custom所有的数据挪出
            let customInfoList = objList.slice(17, objList.length - 2);
            // 自定义属性先将字符串以Custom来切割，然后遍历自定义内容，替换=
            for (let j = 0; j < customInfoList.length; j++) {
              // customInfoList[j] = customInfoList[j].replace("=", ":");
              let tmpArr = customInfoList[j].split("=");
              customInfoList[j] = `"${tmpArr[0]}":"${tmpArr[1].substring(
                1,
                tmpArr[1].length - 1
              )}"`;
            }
            // let objStr = `{"${nameStr}":{"${attrOneName}":{"X":"${attrOneValX}","Y":"${attrOneValY}","Z":"${attrOneValZ}"},"${attrTwoName}":{"W":"${attrTwoValW}","X":"${attrTwoValX}","Y":"${attrTwoValY}","Z":"${attrTwoValZ}"},"${attrThreeName}":{"LOCK":"${attrTreeValLock}","X":"${attrTreeValX}","Y":"${attrTreeValY}"}, "${attrFourName}":{${customInfoList.join()}}}}`;
            let objStr = `{"${attrOneName}":{"X":"${attrOneValX}","Y":"${attrOneValY}","Z":"${attrOneValZ}"},"${attrTwoName}":{"W":"${attrTwoValW}","X":"${attrTwoValX}","Y":"${attrTwoValY}","Z":"${attrTwoValZ}"},"${attrThreeName}":{"LOCK":"${attrTreeValLock}","X":"${attrTreeValX}","Y":"${attrTreeValY}"}, "${attrFourName}":{${customInfoList.join()}}}`;
            let obj = JSON.parse(objStr);
            console.log(obj);
            _this.desList.push(obj);
            _this.desNameList.push(nameStr);
          }
        }
        _this.$nextTick(() => {
          document
            .getElementsByClassName("aside-box")[0]
            .children[0].children[0].click();
        });
      } else if (_this.fileType == "gmc") {
        // 当文件上百M时，代码优化
        console.log("开始");
        _this.gmcDoc = document.getElementById(
          "gmcDoc"
        ).contentDocument.body.innerText;
        console.log(_this.gmcDoc);
        let tmpGMCNameArr = _this.gmcDoc.split("Shaders ")[0].split(" ");
        let tmpGMCArr = _this.gmcDoc
          .split("SceneObjects")[0]
          .split("shader ")
          .filter((item, index) => {
            if (index != 0) {
              return item;
            }
          });
        _this.shaderCount = tmpGMCNameArr[6];
        _this.$set(
          _this,
          "gmcNameList",
          tmpGMCNameArr.slice(8, tmpGMCNameArr.length - 2)
        );
        for (let i = 0; i < tmpGMCArr.length; i++) {
          let arr = tmpGMCArr[i].split(" ");
          let gmcAttrOneName = arr[2];
          let attrOneVal1 = arr[3];
          let attrOneVal2 = arr[4];
          let gmcAttrTwoName = arr[5];
          let attrTwoVal1 = arr[6];
          let gmcAttrThreeName = arr[7];
          let attrThreeVal1 = arr[8];
          let attrThreeVal2 = arr[9];
          let attrThreeVal3 = arr[10];
          let gmcAttrFourName = arr[11];
          let attrFourVal1 = arr[12];
          let gmcObjStr = `{"${gmcAttrOneName}":{"val1":"${attrOneVal1}","val2":"${attrOneVal2}"},"${gmcAttrTwoName}":{"val1":"${attrTwoVal1}"},"${gmcAttrThreeName}":{"val1":"${attrThreeVal1}","val2":"${attrThreeVal2}","val3":"${attrThreeVal3}"}, "${gmcAttrFourName}":{"val1":${attrFourVal1}}}`;
          _this.gmcList.push(JSON.parse(gmcObjStr));
        }
        _this.$nextTick(() => {
          document
            .getElementsByClassName("aside-box")[1]
            .children[0].children[0].click();
        });
        console.log(_this.gmcList);
        console.log("结束");
      }
    },
    loadFile(res) {
      let _this = this;
      if (_this.fileName == res.currentTarget.files[0].name) {
        return;
      } else {
        if (_this.desList.length != 0 && _this.gmcList.length != 0) {
          _this.$set(_this, "desList", []);
          _this.$set(_this, "desNameList", []);
          _this.$set(_this, "gmcList", []);
          _this.$set(_this, "gmcNameList", []);
        }
      }
      // res.currentTarget.files[0].type = "text/html";
      _this.fileName = res.currentTarget.files[0].name;
      if (_this.fileType == "des") {
        document.getElementById("desDoc").src =
          "./static/doc/" + _this.fileName;
        // 解决延迟渲染src内容问题
        _this.$nextTick(() => {
          document.getElementById("desDoc").onload = () => {
            _this.openDoc();
          };
        });
      } else if (_this.fileType == "gmc") {
        document.getElementById("gmcDoc").src =
          "./static/doc/" + _this.fileName;
        // 解决延迟渲染src内容问题
        _this.$nextTick(() => {
          document.getElementById("gmcDoc").onload = () => {
            _this.openDoc();
          };
        });
      }
    },
    linkSrc(flag) {
      let _this = this;
      _this.currentOpUrl = flag;
      if (flag != "gmc" && flag != "des") {
        _this.document.getElementById("files-pict").click();
      } else {
        _this.document.getElementById("files-doc").click();
        _this.fileType = flag;
      }
    },
    loadPict(res, file, files) {
      let _this = this;
      for (let i = 0; i < res.currentTarget.files.length; i++) {
        _this.imgList.push({ label: res.currentTarget.files[i].name });
      }
      if (_this.imgList.length > 0) {
        if (_this.currentOpUrl == "model") {
          _this.$set(_this, "customAttrModelList", _this.imgList);
          localStorage.setItem(
            "customAttrModelList",
            JSON.stringify(_this.imgList)
          );
        } else if (_this.currentOpUrl == "effect") {
          _this.$set(_this, "customAttrEffectList", _this.imgList);
          localStorage.setItem(
            "customAttrEffectList",
            JSON.stringify(_this.imgList)
          );
        }
      }
    },
    saveFile(flag) {
      let _this = this;
      if (flag == "des" || flag == "all") {
        if (_this.desDoc != "") {
          let desText = "";
          desText += `SceneObjects ${_this.sceneCount} DummeyObjects ${_this.dummeyCount}\n`;
          for (let i = 0; i < _this.desList.length; i++) {
            if (i < _this.sceneCount) {
              let posStr =
                _this.desList[i].Position.X +
                " " +
                _this.desList[i].Position.Y +
                " " +
                _this.desList[i].Position.Z;
              let quaStr =
                _this.desList[i].Quaternion.W +
                " " +
                _this.desList[i].Quaternion.X +
                " " +
                _this.desList[i].Quaternion.Y +
                " " +
                _this.desList[i].Quaternion.Z;
              let aniStr =
                _this.desList[i].TextureAnimation.LOCK +
                " " +
                _this.desList[i].TextureAnimation.X +
                " " +
                _this.desList[i].TextureAnimation.Y;
              let cusStr = ` `;
              let cusKeys = Object.keys(_this.desList[i].Custom);
              for (let j = 0; j < cusKeys.length; j++) {
                if (j == 0 && cusKeys.length == 1) {
                  if (
                    cusKeys[j] == "damage" ||
                    cusKeys[j] == "name" ||
                    cusKeys[j] == "model" ||
                    cusKeys[j] == "effect"
                  ) {
                    cusStr += `\n   ${cusKeys[j]}="${
                      _this.desList[i].Custom[cusKeys[j]]
                    }"`;
                  } else {
                    cusStr += `\n   ${cusKeys[j]}=${
                      _this.desList[i].Custom[cusKeys[j]]
                    }`;
                  }
                } else if (j == 0) {
                  if (
                    cusKeys[j] == "damage" ||
                    cusKeys[j] == "name" ||
                    cusKeys[j] == "model" ||
                    cusKeys[j] == "effect"
                  ) {
                    cusStr += `\n   ${cusKeys[j]}="${
                      _this.desList[i].Custom[cusKeys[j]]
                    }"\n`;
                  } else {
                    cusStr += `\n   ${cusKeys[j]}=${
                      _this.desList[i].Custom[cusKeys[j]]
                    }\n`;
                  }
                } else if (j + 1 == cusKeys.length) {
                  if (
                    cusKeys[j] == "damage" ||
                    cusKeys[j] == "name" ||
                    cusKeys[j] == "model" ||
                    cusKeys[j] == "effect"
                  ) {
                    cusStr += `   ${cusKeys[j]}="${
                      _this.desList[i].Custom[cusKeys[j]]
                    }"`;
                  } else {
                    cusStr += `   ${cusKeys[j]}=${
                      _this.desList[i].Custom[cusKeys[j]]
                    }`;
                  }
                } else {
                  if (
                    cusKeys[j] == "damage" ||
                    cusKeys[j] == "name" ||
                    cusKeys[j] == "model" ||
                    cusKeys[j] == "effect"
                  ) {
                    cusStr += `   ${cusKeys[j]}="${
                      _this.desList[i].Custom[cusKeys[j]]
                    }"\n`;
                  } else {
                    cusStr += `   ${cusKeys[j]}=${
                      _this.desList[i].Custom[cusKeys[j]]
                    }\n`;
                  }
                }
              }
              desText += `Object ${_this.desNameList[i]}
{
  Position: ${posStr}
  Quaternion: ${quaStr}
  TextureAnimation: ${aniStr}
  Custom:
  {${cusStr}
  }
}\n`;
            } else if (i > _this.dummeyCount) {
            }
          }
          // 转换为des
          saveAs(
            new Blob([desText], { type: "txt/plain;charset=utf-8" }),
            "file.des"
          );
        } else {
          _this.$message("没有读入文件");
        }
      }
      if (flag == "gmc" || flag == "all") {
        if (_this.gmcDoc != "") {
          let gmcText = "# GModel Geometry File V1.0\n";
          let textureNameStr = `\n`;
          gmcText += `Textures ${_this.shaderCount}\n{`;
          for (let i = 0; i < _this.gmcNameList.length; i++) {
            textureNameStr += `  ${_this.gmcNameList[i]}\n`;
          }
          gmcText += `${textureNameStr}}\n`;
          gmcText += `Shaders ${_this.shaderCount}`;
          for (let i = 0; i < _this.shaderCount; i++) {
            let shaderName = `\nshader ${i}\n{\n`;
            let Texture = `  Texture ${_this.gmcList[i].Texture.val1} ${_this.gmcList[i].Texture.val2}\n`;
            let TwoSide = `  TwoSide ${_this.gmcList[i].TwoSide.val1}\n`;
            let Blend = `  Blend ${_this.gmcList[i].Blend.val1} ${_this.gmcList[i].Blend.val2} ${_this.gmcList[i].Blend.val3}\n`;
            let Opaque = `  Opaque ${_this.gmcList[i].Opaque.val1}\n}`;
            gmcText += shaderName + Texture + TwoSide + Blend + Opaque;
          }
          gmcText += `\nSceneObjects ${
            document
              .getElementById("gmcDoc")
              .contentDocument.body.innerHTML.split("SceneObjects ")[1]
          }`;
          // 转换为des
          saveAs(
            new Blob([gmcText], { type: "txt/plain;charset=utf-8" }),
            `file.gmc`
          );
        } else {
          _this.$message("没有读入文件");
        }
      }
    },
    setOpIndex(index, flag) {
      let _this = this;
      if (flag == "des") {
        _this.desIndex = index;
        _this.currentDesName = _this.desNameList[index];
        _this.damageAttrCount = 0;
        // 置空复选框状态
        let checks = document.getElementsByClassName("insert-custom-list")[0]
          .childNodes;
        for (let i = 0; i < checks.length; i++) {
          // 非文本节点，消除勾选
          if (checks[i].role != "radio" && checks[i].nodeType != 3) {
            if (checks[i].classList.length == 2) {
              checks[i].click();
            }
          }
        }
      } else if (flag == "gmc") {
        _this.gmcIndex = index;
        _this.currentGmcName = _this.gmcNameList[index];
      }
    },
    setCustomInfo(flag, name) {
      let _this = this;
      let tmp = flag.split(":");
      if (tmp.length == 2) {
        if (tmp[0] == "name" || tmp[0] == "model") {
          // _this.$set(_this, "currentCustomAttr", tmp[0]);
          if (tmp[0] == "model") {
            let tmpModelArr = _this.$refs.model.children;
            for (let i = 0; i < tmpModelArr.length; i++) {
              // 清除勾选
              if (
                tmpModelArr[i].children[1].children[0].children[0].value !=
                  tmp[1] &&
                tmpModelArr[i].children[0].classList.length == 2
              ) {
                tmpModelArr[i].children[0].click();
              } else {
              }
            }
            // 处理扩展名
            if (/\./.test(tmp[1])) {
              tmp[1] = tmp[1].substring(0, tmp[1].match(/\./).index);
            }
          } else if (tmp[0] == "name") {
            let tmpNameArr = _this.$refs.name.children;
            for (let j = 0; j < tmpNameArr.length; j++) {
              // 清除勾选
              if (
                tmpNameArr[j].children[0].children[0].value != tmp[1] &&
                tmpNameArr[j].children[0].children[1].children[0].classList
                  .length == 2
              ) {
                tmpNameArr[j].children[0].children[1].children[0].click();
              } else {
              }
            }
          }
          _this.$set(_this.desList[_this.desIndex].Custom, tmp[0], tmp[1]);
          _this.currentAttrName = tmp[1];
        } else if (tmp[0] == "Ani") {
          _this.$set(_this.desList[_this.desIndex].Custom, "animation", "sin");
          _this.$set(_this.desList[_this.desIndex].Custom, "deformsize", "5");
          _this.$set(
            _this.desList[_this.desIndex].Custom,
            "deformfreq",
            "0.25"
          );
          _this.$set(
            _this.desList[_this.desIndex].Custom,
            "deformrange",
            "5.0"
          );
        } else {
          _this.$set(_this.desList[_this.desIndex].Custom, tmp[0], tmp[1]);
        }
      } else {
        if (tmp[0] == "name" || tmp[0] == "model") {
          delete _this.desList[_this.desIndex].Custom[tmp[0]];
        } else if (tmp[0] == "Ani") {
          delete _this.desList[_this.desIndex].Custom["animation"];
          delete _this.desList[_this.desIndex].Custom["deformsize"];
          delete _this.desList[_this.desIndex].Custom["deformfreq"];
          delete _this.desList[_this.desIndex].Custom["deformrange"];
        } else {
          delete _this.desList[_this.desIndex].Custom[tmp[0]];
        }
        _this.refresh++;
      }
      // }
    },
    setCustomInfoByDamage(val) {
      let _this = this;
      _this.$set(_this.desList[_this.desIndex].Custom, "name", `damage ${val}`);
    },
    setBlendAttrLink(attrIndex, flag) {
      let _this = this;
      if (attrIndex == 2) {
        if (flag == "sa") {
          _this.gmcList[_this.gmcIndex].Blend.val2 = flag;
          _this.gmcList[_this.gmcIndex].Blend.val3 = "1-sa";
        } else if (flag == "s") {
          _this.gmcList[_this.gmcIndex].Blend.val2 = flag;
          _this.gmcList[_this.gmcIndex].Blend.val3 = "1";
        }
      } else if (attrIndex == 3) {
        if (flag == "1-sa") {
          _this.gmcList[_this.gmcIndex].Blend.val2 = "sa";
          _this.gmcList[_this.gmcIndex].Blend.val3 = flag;
        } else if (flag == "1-a") {
          _this.gmcList[_this.gmcIndex].Blend.val2 = "sa";
          _this.gmcList[_this.gmcIndex].Blend.val3 = flag;
        }
      }
    },
    showCustomAttrDlg() {
      let _this = this;
      _this.customAttrDlg = true;
    },
    addCustomAttrNode() {
      let _this = this;
      if (_this.currentCustomAttr == "name") {
        _this.customAttrNameList.push({
          label: `user0${_this.customAttrNameList.length + 1}`
        });
        localStorage.setItem(
          "customAttrNameList",
          JSON.stringify(_this.customAttrNameList)
        );
      } else if (_this.currentCustomAttr == "model") {
        _this.customAttrModelList.push({ label: "model" });
        localStorage.setItem(
          "customAttrModelList",
          JSON.stringify(_this.customAttrModelList)
        );
      } else if (_this.currentCustomAttr == "effect") {
        _this.customAttrEffectList.push({ label: "effect" });
        localStorage.setItem(
          "customAttrEffectList",
          JSON.stringify(_this.customAttrEffectList)
        );
      }
    },
    showAddObjDlg(flag) {
      let _this = this;
      _this.addObjDlg = true;
      if (flag == "des") {
      } else if (flag == "gmc") {
      }
    },
    addObjs(flag) {
      let _this = this;
      if (flag == "des") {
        // dummey对象数
        _this.dummeyCount = _this.dummeyCount * 1 + _this.addObjCount * 1;
        let tmpObj = {};
        tmpObj.Position = {};
        tmpObj.Quaternion = {};
        tmpObj.TextureAnimation = {};
        tmpObj.Custom = {};
        tmpObj.Position.X = "0.000000";
        tmpObj.Position.Y = "0.000000";
        tmpObj.Position.Z = "0.000000";
        tmpObj.Quaternion.W = "-1.000000";
        tmpObj.Quaternion.X = "0.000000";
        tmpObj.Quaternion.Y = "0.000000";
        tmpObj.Quaternion.Z = "0.000000";
        tmpObj.TextureAnimation.LOCK = "0";
        tmpObj.TextureAnimation.X = "0.000000";
        tmpObj.TextureAnimation.Y = "0.000000";
        for (let i = 0; i < _this.addObjCount; i++) {
          if (_this.preObjName != "D_wp") {
            _this.desList.push(JSON.parse(JSON.stringify(tmpObj)));
            _this.desNameList.push(
              `${_this.preObjName}${_this.addObjName}0${i + 1}`
            );
          } else {
            _this.desList.push(JSON.parse(JSON.stringify(tmpObj)));
            _this.desList.push(JSON.parse(JSON.stringify(tmpObj)));
            _this.dummeyCount = _this.dummeyCount * 1 + 1;
            _this.desNameList.push(
              `${_this.preObjName}${_this.addObjName}0${i + 1}`
            );
            _this.desNameList.push(`D_${_this.addObjName}0${i + 1}`);
          }
        }
        console.log(_this.desNameList);
        console.log(_this.desList);
        _this.$message({
          type: "success",
          message: "添加成功!"
        });
      } else if (flag == "gmc") {
      }
    },
    delCustomAttr(index) {
      let _this = this;
      console.log(_this.currentCustomAttr);
      if (_this.currentCustomAttr == "name") {
        _this.customAttrNameList.splice(index, 1);
        localStorage.setItem(
          "customAttrNameList",
          JSON.stringify(_this.customAttrNameList)
        );
      } else if (_this.currentCustomAttr == "model") {
        _this.customAttrModelList.splice(index, 1);
        localStorage.setItem(
          "customAttrModelList",
          JSON.stringify(_this.customAttrModelList)
        );
      } else if (_this.currentCustomAttr == "effect") {
        _this.customAttrEffectList.splice(index, 1);
        localStorage.setItem(
          "customAttrEffectList",
          JSON.stringify(_this.customAttrEffectList)
        );
      }
    },
    delDesObj(index) {
      let _this = this;
      _this
        .$confirm("是否删除该对象", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          if (/^(D_)/.test(_this.desNameList[index])) {
            _this.dummeyCount = _this.dummeyCount * 1 - 1;
          } else {
            _this.sceneCount = _this.sceneCount * 1 - 1;
          }
          _this.desNameList.splice(index, 1);
          _this.desList.splice(index, 1);
          console.log(_this.desNameList);
          console.log(_this.desList);
          _this.refresh++;
          _this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    searchObj(flag) {
      let _this = this;
      let a = document.createElement("a");
      let allMatch = true;
      let match = "";
      if (flag == "des") {
        match = eval(`/^(${_this.searchDesName})/`);
        for (let i = 0; i < _this.desNameList.length; i++) {
          if (match.test(_this.desNameList[i]) && _this.searchDesName != "") {
            allMatch = false;
            a.href = "#" + _this.desNameList[i];
            a.click();
            // 跳回到搜索框
            document
              .getElementsByClassName("search-box")[0]
              .children[0].focus();
            _this.currentDesName = _this.desNameList[i];
            break;
          }
        }
        if (allMatch && _this.searchDesName != "") {
          a.href = "#" + _this.searchDesName;
          a.click();
          document.getElementsByClassName("search-box")[0].children[0].focus();
          _this.currentDesName = _this.searchDesName;
        }
      } else if (flag == "gmc") {
        match = eval(`/^(${_this.searchGmcName})/`);
        for (let i = 0; i < _this.gmcNameList.length; i++) {
          if (match.test(_this.gmcNameList[i] && _this.searchGmcName != "")) {
            allMatch = false;
            a.href = "#" + _this.gmcNameList[i];
            a.click();
            // 跳回到搜索框
            document
              .getElementsByClassName("search-box")[1]
              .children[0].focus();
            _this.currentGmcName = _this.gmcNameList[i];
            break;
          }
        }
        if (allMatch && _this.searchGmcName != "") {
          a.href = "#" + _this.searchGmcName;
          a.click();
          document.getElementsByClassName("search-box")[1].children[0].focus();
          _this.currentGmcName = _this.searchGmcName;
        }
      }
    }
  },
  computed: {},
  components: {},
  watch: {
    effectUrl(n, o) {},
    modelUrl(n, o) {},
    searchDesName(n, o) {
      this.searchObj("des");
    },
    searchGmcName(n, o) {
      this.searchObj("gmc");
    }
  }
};
</script>

<style lang="scss" scoped>
// @import url(./../assets/css/common.css);
::-webkit-scrollbar {
  width: 7px;
  background-color: #fff;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: white;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: gray;
}
/*定义最上方和最下方的按钮*/
// ::-webkit-scrollbar-button{
//      background-color: #000;
//      border:1px solid yellow;
// }

.base-container {
  width: 100vw;
  height: 100vh;
  // background: url("/static/img/bg.jpg") no-repeat;
  .el-col {
    margin: 2px 0px;
  }
  .is-active {
    background: green;
  }
  .active {
    button {
      background: forestgreen;
      border-color: forestgreen;
    }
  }
  .el-header {
    padding: 0;
    height: auto !important;
    .el-input {
      width: auto;
    }
    .header-box {
      display: inline-block;
      span {
        font-size: 20px;
      }
    }
    button {
      margin-left: 0;
      border-radius: 0;
    }
  }
  .el-container {
    height: calc(100vh - 28px);
    display: flex;
    .el-aside {
      height: inherit;
      width: 130px !important;
      text-align: center;
      border: solid 1px black;
      overflow: hidden;
      .aside-box {
        text-align: center;
        width: 100%;
        height: calc(100% - 80px);
        .obj-box {
          width: 100%;
          position: relative;
          cursor: pointer;
          padding: 10px 0px;
          border-bottom: solid 1px black;
          border-left: none;
          border-right: none;
          border-top: none;
          .el-icon-circle-close {
            position: absolute;
            right: 4px;
          }
        }

        .obj-box:nth-of-type(1) {
          border-top: solid 1px black;
        }
      }
      .search-box {
        /deep/ .el-input__inner {
          box-sizing: border-box;
          outline: 0;
          border: 0;
          border-radius: 0;
        }
      }
      .add-obj-btn {
        width: 100%;
        border-top: solid 1px black;
        border-bottom: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
    }
    .el-main {
      flex: 1;
      display: flex;
      height: inherit;
      // position: relative;
      overflow: hidden;
      margin: 0;
      border-top: solid 1px black;
      border-bottom: solid 1px black;
      border-right: solid 1px black;
      padding: 0;
      .des-box {
        // margin: auto;
        // height: 450px;
        // width: 100%;
        margin: 0px 5px;
        width: auto;
        border-right: solid 1px black;
        box-sizing: border-box;
      }
      .check-box {
        display: flex;
        height: 100%;
        .insert-custom-list {
          text-align: left;
          width: 120px;
          height: 100%;
          margin: 0px 5px;
          float: left;
        }
        .custom-check-val {
          width: 250px;
          float: right;
          border-top: none;
          border-bottom: none;
          border-left: solid 1px black;
          border-right: solid 1px black;
          .el-icon-plus {
            width: 100%;
            text-align: center;
            border-radius: 0px;
            border-bottom: solid 1px;
            border-left: none;
            border-top: none;
            border-right: none;
          }
          /deep/.el-input__inner {
            border-radius: 0;
          }
          .name-list {
            overflow: auto;
            position: relative;
            height: 90%;
            // width: calc(100% + 20px);
            // overflow-y: scroll;
            /deep/ .el-input {
              width: 150px;
              input {
                height: 100%;
                border-radius: 0;
                outline: none;
                border: none;
                vertical-align: bottom;
              }
              .el-input-group__append {
                border-radius: 0;
                width: 40px;
                height: inherit;
                padding: 0;
                vertical-align: baseline;
                border: 0;
                box-sizing: border-box;
                .el-checkbox-button {
                  border-radius: 0px;
                  width: 100%;
                  height: 100%;
                  cursor: pointer;
                }
              }
            }
          }
          .model-list {
            overflow: auto;
            position: relative;
            height: 90%;
            // width: calc(100% + 20px);
            // overflow-y: scroll;
            /deep/ .el-checkbox {
              width: 100px;
              height: 100px;
              position: relative;
              .el-checkbox__input {
                width: 100%;
                height: 100%;
                .el-checkbox__inner {
                  width: 100%;
                  height: 100%;
                  background-color: none;
                  &::after {
                    display: none;
                  }
                }
              }
              /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
                border-color: black;
                background: rgba(0, 0, 0, 0.4);
              }
            }
            /deep/ .el-input {
              input {
                height: 100%;
                border-radius: 0;
              }
            }
            // 添加图片
            /deep/ .el-checkbox__label {
              position: absolute;
              width: 100%;
              height: 100%;
              display: inline-block;
              top: 0;
              left: 0;
              margin: 0;
              padding: 0;
              z-index: 99;
              border-color: black;
              background: rgba(0, 0, 0, 0.4);
              img {
                width: 90px;
                height: 90px;
                position: absolute;
                top: 5px;
                left: 5px;
              }
            }
          }
          .effect-list {
            overflow: auto;
            position: relative;
            height: 90%;
            // width: calc(100% + 20px);
            // overflow-y: scroll;
            /deep/ .el-checkbox {
              width: 100px;
              height: 100px;
              position: relative;
              .el-checkbox__input {
                width: 100%;
                height: 100%;
                .el-checkbox__inner {
                  width: 100%;
                  height: 100%;
                  background-color: none;
                  &::after {
                    display: none;
                  }
                }
              }
              /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
                border-color: black;
                background: rgba(0, 0, 0, 0.4);
              }
            }
            /deep/ .el-input {
              input {
                height: 100%;
                border-radius: 0;
              }
            }
            // 添加图片
            /deep/ .el-checkbox__label {
              position: absolute;
              width: 100%;
              height: 100%;
              display: inline-block;
              top: 0;
              left: 0;
              margin: 0;
              padding: 0;
              z-index: 99;
              border-color: black;
              background: rgba(0, 0, 0, 0.4);
              img {
                width: 90px;
                height: 90px;
                position: absolute;
                top: 5px;
                left: 5px;
              }
            }
          }
          /deep/ .el-slider {
            background: white;
            padding: 0px 20px;
            .el-input-number {
              .el-input-number__decrease {
                display: none;
              }
              .el-input-number__increase {
                display: none;
              }
            }
            .el-slider__input {
              float: right;
              margin-top: 3px;
              width: 60px;
              padding: 0;
              .el-input__inner {
                width: 100%;
                margin: 0;
                padding: 0;
              }
            }
            .el-slider__runway.show-input {
              margin-right: 160px;
              width: calc(100% - 80px);
            }
          }
        }
      }
      .gmc-box {
        position: relative;
        background: white;
        z-index: 999;
        height: 100%;
        .el-aside {
          height: inherit;
          width: 130px !important;
          text-align: center;
          border-left: none;
          border-top: none;
          border-bottom: none;
          border-right: solid 1px black;
          overflow: hidden;
          .aside-box {
            text-align: center;
            width: 100%;
            height: calc(100% - 80px);
            .obj-box {
              position: relative;
              width: 100%;
              cursor: pointer;
              padding: 10px 0px;
              border-bottom: solid 1px black;
              border-left: none;
              border-right: none;
              border-top: none;
            }
            .obj-box:nth-of-type(1) {
              border-top: solid 1px black;
            }
          }
          .add-obj-btn {
            width: 100%;
            border-radius: 0;
          }
        }
      }
      .gmc-attr-box {
        margin: 5px;
        flex: 1;
        .gmc-attr-top-box {
          /deep/ .opaque-slider {
            .el-input-number {
              .el-input-number__decrease {
                display: none;
              }
              .el-input-number__increase {
                display: none;
              }
            }
            .el-slider__input {
              float: right;
              margin-top: 3px;
              width: 60px;
              padding: 0;
              .el-input__inner {
                width: 100%;
                margin: 0;
                padding: 0;
              }
            }
            .el-slider__runway.show-input {
              margin-right: 160px;
              width: calc(100% - 80px);
            }
          }
        }
        .gmc-attr-bottom-box {
        }
      }
      .el-input {
        width: 90px;
      }
    }
  }
  .add-obj-dialog {
    /deep/ .el-dialog {
      .el-input {
        .el-input__inner {
          width: 100px;
        }
      }
      .el-slider {
        width: 250px;
        .el-slider__input {
          .el-input-number__decrease {
            display: none;
          }
          .el-input-number__increase {
            display: none;
          }
        }
      }
    }
  }
  .dialog-node {
    display: flex;
    line-height: 40px;
    margin: 5px 0px;
    .el-select {
      width: 100px;
      margin-right: 10px;
    }
    span {
    }
    .el-input {
      flex: 1;
    }
  }
}
</style>
