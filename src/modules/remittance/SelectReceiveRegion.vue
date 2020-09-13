<template>
  <page class="select-receive-region">
    <page-header>选择汇入地</page-header>
    <page-content>
      <div>
        <span>{{result}}</span>
        <button @click="showCascader">选择地址</button>
        <aui-cascader ref="cascader"
                      :source-data="cascaderData"
                      :is-sort="true"
                      :current-selected-result="currentSelectedResult"
                      :header-title="'选择银行网点'"
                      :content-title="'所在地区'"
                      :default-tab-text="'请选择'"
                      :label-field="'name'"
                      :items-field="'children'"
                      :first-letter-field="'firstLetter'"
                      @selectEnd="handler">
        </aui-cascader>
        <!-- <aui-cascader :source-data="cascaderData" :header-title="'选择银行网点'" :content-title="'所在地区'" @selectEnd="handler" v-show="isShow"></aui-cascader> -->
      </div>

    </page-content>
    <page-footer>
      <aui-box justify-content="space-between" class="footer-box">
        <aui-button @click="onBack">上一步</aui-button>
        <aui-button @click="onNext">完成</aui-button>
      </aui-box>
    </page-footer>
  </page>
</template>

<script>
import BasicPage from "../../mixins/basic-page";
import { TradeLogger } from "awp-plugin-logger"; //eslint-disable-line
import CascaderData from " ../../../static/cascader-data.json";

let metadata = {//eslint-disable-line
  name: "selectReceiveRegion.vue",
  description: "选择汇入地",
  outlets: {
    确定: "OK"
  }
};

export default {
  name: "select-receive-region",
  mixins: [BasicPage],
  data() {
    return {
      // isShow: false,
      cascaderData: undefined,
      currentSelectedResult: [],
      result: ''

    };
  },
  created() {
    this.cascaderData = CascaderData;
  },
  methods: {
    onNext() {
      this.commit("OK");
    },
    onBack() {
      this.back();
    },
    async showCascader() {
      // this.isShow = true;
      await this.$refs.cascader.showCascaderAsync();
    },
    handler(result) {
      console.log('end');
      // this.isShow = false;
      // this.result = result;
      this.currentSelectedResult = result;
      this.result = result[0].name;
    }

  }
};
</script>

<style scoped>
.footer-boxP {
  width: 520px;
}
</style>
