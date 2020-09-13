<template>
  <div class="table-dialog-test">
    <div class="content">
      <div class="title">
        <div>
          <div class="history">历史收款人</div>
        </div>
        <div class="search-div">
          <aui-select v-model="keyWordType"  class="seach-select">
            <span slot="prepend" class="template">查询条件</span>
            <aui-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></aui-option>
          </aui-select>
          <aui-text-input placeholder="请输入" v-model="searchKey" size="small" v-keyboard="'address'" class="search-text"></aui-text-input>
          <aui-button size="small" @click="searchByKeyWord" class="seach-btn">查询</aui-button>
        </div>
        <!-- <button @click="searchByKeyWord">查询</button> -->
        <aui-table  is-horizontal-resize
                    style="width:100%;"
                    :table-data="historyTable.tableData" 
                    :columns="historyTable.tableTitle" 
                    class="detail-item"
                    title-bg-color="#e5e5e5"
                    @on-custom-comp="customCompFunc"></aui-table>
      </div>
      <div class="footer">
        <aui-button @click="onCancel">取消</aui-button>
        <!-- <aui-button @click="onOK">确定</aui-button> -->
      </div>
    </div>
  </div>
</template>

<script>
// import BasicPage from "../../mixins/basic-page";
import { DialogContent } from "awp-lib-framework";
import { Dialog } from "aui-ss";
import Vue from 'vue';
import { FocusManager } from 'awp-ui-focus-manager';

let metadata = { //eslint-disable-line
  name: "tableDialog.vue",
  description: "弹窗中的table",
  outlets: {
    确定: "OK",
    取消: "Cancel"
  }
};
// var tem = {
//   template: `<span>
//         <a href="" @click.stop.prevent="selectAcct(rowData,index)">选择</a>
//         </span>`,
//   props: {
//     rowData: {
//       type: Object
//     },
//     field: {
//       type: String
//     },
//     index: {
//       type: Number
//     }
//   },
//   methods: {
//     selectAcct() {
//       // 参数根据业务场景随意构造
//       let params = { index: this.index, rowData: this.rowData };
//       this.$emit("on-custom-comp", params);
//     }
//   }
// };
export default {
  name: "table-dialog",
  mixins: [DialogContent],
  data() {
    return {
      historyTable: {
        tableData: [
        ],
        tableTitle: [
          {
            field: "PayeeActName",
            title: "户名",
            width: 180,
            titleAlign: "center",
            columnAlign: "center"
          },
          {
            field: "PayeeActNo",
            title: "账户",
            width: 228,
            titleAlign: "center",
            columnAlign: "center"
          },
          {
            field: "PayeeBankName",
            title: "开户行",
            width: 180,
            titleAlign: "center",
            columnAlign: "center"
          },
          {
            field: "operate",
            title: "操作",
            width: 180,
            titleAlign: "center",
            columnAlign: "center",
            componentName: "table-operation"
          }
        ]
      },
      options: [
        {
          value: "PayeeActName",
          label: "姓名"
        },
        {
          value: "PayeeActNo",
          label: "账户"
        },
        {
          value: "PayeeBankName",
          label: "开户行"
        },
        {
          value: "PayeeBankNo",
          label: "开户行"
        }
      ],
      allTableData: [],
      result: {},
      searchKey: '',
      keyWordType: 'PayeeActName'
    };
  },
  props: ["dialogBoxContentArgs"],
  methods: {
    onCancel() {
      this.result = "";
      Dialog.close(this);
    },
    // onOK() {
    //   this.result = "ok";
    //   Dialog.close(this);
    // },
    customCompFunc(params) {
      this.result = params;
      Dialog.close(this);
    },
    searchByKeyWord() {
      console.log("执行了关键字查询");
      this.historyTable.tableData = [];
      for (var k in this.allTableData) {
        if (!(this.allTableData[k][this.keyWordType].indexOf(this.searchKey) == -1)) {
          this.historyTable.tableData.push(this.allTableData[k]);
        }
      }
    },
    onNavigated() {
      FocusManager.attach(this);
    },
    onClose() {
      FocusManager.detach(this);
    }
  },
  // components: {
  //   "table-operation": tem
  // },
  beforeMount: function() {
    // console.log(this);
    this.allTableData = this.dialogBoxContentArgs.historyList;
    this.searchByKeyWord();
    // console.log(this.dialogBoxContentArgs);
  }
};
Vue.component("table-operation", {
  // render: function (createElement) {
  //   var func = function () {
  //     return {
  //       template: `<span>
  //       <a href="" @click.stop.prevent="selectAcct(rowData,index)">选择</a>
  //       </span>`
  //     };
  //   };
  //   return createElement(func());
  // },
  template: `<a href="" @click.stop.prevent="selectAcct(rowData,index)" class="tableDialogChoise" style="display:inline-block;line-height:36px;background:#ffffff;border:1px solid #ff7e4a;border-radius:100px;width:98px;height:38px;font-family:PingFangSC-Regular;font-size:20px;color:#e96159;">选择</a>`,
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    selectAcct() {
      // 参数根据业务场景随意构造
      let params = { index: this.index, rowData: this.rowData };
      console.log("params", params);
      this.$emit("on-custom-comp", params);
    }
  }
});
</script>

<style scoped>
.content {
  position: relative;
  width: 912px;
  height: 712px;
  background: #fff;
  box-sizing: border-box;
  padding: 40px 50px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.title {
  padding: 10px 20px 15px;
  line-height: 1;
  text-align: center
}

.condition {
  width: 950px;
  margin: 30px 0 25px 0;
}

.history{
  font-size: 24px ; 
  color: #896e6e;
  width: 100%;
  padding-bottom: 16px;
  margin: 0 auto;
  border-bottom: 1px solid #dcd2c0;
}
.text {
  font-size: 24px;
  color: #896e6e;
  float: left;
}

.qry-btn {
  height: 40px;
  min-width: 80px !important; /* 更改按钮默认最小宽度(200px) */
  font-size: 20px;
  margin-top: 22px;
  /* font-weight:400; */
}

.footer {
  padding: 10px 20px 15px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
}
.template {
    font-size: 20px;
    color: #999999;
    border-right: 1px solid #CCCCCC;
    width: 80px;
    padding: 0 20px;
    display: inline-block;
}
.search-div{
  width: 100%;
  display: inline-block ;
  padding-top: 15px; 
  padding-bottom: 15px ;
}
.search-text{
  width: 43% ;
  vertical-align: middle;
}
.seach-select{
  vertical-align: middle;
}
.seach-btn{
  height: 43px;
}
</style>
