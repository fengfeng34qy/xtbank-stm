<template>
  <page class="input-payee-account">
    <page-header>请录入收款方信息</page-header>
    <page-content>
      <div class="inputNamePageCtn">
        <span class="inputNamePrompt">{{tipes}}</span>
        <!-- <div class="inputNameInfo">
          <div class="w40">
            <h4>{{dm.AcctName}}</h4>
            <p>卡号 {{session.Customer.CardNo}}</p>
            <p>可用余额 <span>{{dm.AvlBalance}}</span></p>
          </div>
          <div class="w20 inputNameArrow">→</div>
          <div class="w40">
           <h1>这边是身份证图片</h1>
          </div>
          <div class="clear"></div>
        </div> -->
        <div style="margin:20px 0 0 0">
          <div>
            <div class="w70 fl">
              <form-item property="PayeeActNo" :required="true">
                <aui-number-input class="inputClass" placeholder="请输入收款账号" align="left" v-model="dm.PayeeActNo" v-keyboard="'number'" @blur="testIfThisBankAcct"><span slot="prepend" class="template">收款账号</span></aui-number-input>              
              </form-item>
            </div>
            <div class="w30 fl textCenter">
                <aui-button class="inputNameBtn" type="home" cornerType="rounded-corner" @click="notPromiseDialogByDialog">历史收款人</aui-button>              
            </div>
            <div class="clear"></div>
          </div>
          <div>
            <div class="w70 fl ">
              <form-item property="PayeeActName" :required="true">
                <aui-text-input class="inputClass" placeholder="请输入收款户名" align="left" v-model="dm.PayeeActName" v-keyboard="'address'"><span slot="prepend" class="template">收款户名</span></aui-text-input>             
              </form-item>
            </div>
            <div class="w30 fl textCenter" style="line-height:52px">
              <h4>请核对收款人名称！</h4>
            </div>
            <div class="clear"></div>
          </div>
          <div>
            <div class="w70 fl ">
              <form-item property="PayeeBankName" :required="true">
                <aui-text-input class="inputClass" placeholder="请选择收款银行" align="left" v-model="dm.PayeeBankName" :disabled="true"><span slot="prepend" class="template">收款银行</span></aui-text-input>             
              </form-item>
            </div>
            <div class="w30 fl textCenter">
              <aui-button class="inputNameBtn" type="home" cornerType="rounded-corner" @click="selectBank">选择收款银行</aui-button>              
            </div>
            <div class="clear"></div>
          </div>
        </div>

      </div>
    </page-content>
    <page-footer>
      <aui-box class="footer" ref="btnNext" justify-content="space-between">
          <!-- <aui-button @click="onBack" cornerType="rounded-corner" type="info" size="small" class="footer-btn">
            <span>上一步</span>
          </aui-button> -->
          <aui-button :fill="true" @click="onNext" cornerType="rounded-corner" size="normal" class="footer-btn" :disabled="ifDisable">
            <span>下一步</span>
          </aui-button>
      </aui-box>
    </page-footer>
  </page>
</template>

<script>
import BasicPage from "../../mixins/basic-page";
import { TradeLogger } from "awp-plugin-logger"; //eslint-disable-line
import { Dialog } from "aui-ss";
import TableDialog from "./TableDialog.vue";
import { FocusManager } from "awp-ui-focus-manager";
import SelectReceiveBank from "./SelectReceiveBank.vue";

//使用b031判断输入用户是否是本行用户
//在blur的时候提交
import RequestHelper from "../../utils/request-helper";
import MessagePacker from "../../utils/message-packer";
import B031 from "../../messages/b031";
import B053 from "../../messages/b053";

let metadata = {//eslint-disable-line
  name: "inputAccountName.vue",
  description: "输入账户名",
  outlets: {
    信息齐全可以提交: "commit",
    在通讯录中选择: "selectInMailList",
    选择银行: "selectBank"
  }
};

export default {
  name: "input-account-name",
  mixins: [BasicPage],
  data() {
    return {
      tipes:
        "温馨提示：周末或国家法定节假日，跨行转账金额超过五万元，转账将受理并在下一个工作日到账",
      PayeeActNo: this.dm.PayeeActNo,
      PayeeActName: this.dm.PayeeActName,
      PayeeBankName: this.dm.PayeeBankName,
      TransferHistoryDetail: ""
    };
  },
  computed: {
    ifDisable: function() {
      return !(
        this.dm.PayeeActName &&
        this.dm.PayeeActNo &&
        this.dm.PayeeBankNo
      );
    }
  },
  methods: {
    onNext() {
      //先判断信息是否齐全 不全要提示
      this.commit("commit");
    },
    onBack() {
      this.back();
    },
    async selectBank() {
      console.log("调用收款银行弹窗");
      let result = await Dialog.showAwait(SelectReceiveBank, {
        dialogBoxContentArgs: {
          selectBankList: ""
        }
      });
      console.log("返回银行弹窗数据");
      console.log("result", result);
      if (result) {
        this.dm.PayeeBankName = result.bankName;
        this.dm.PayeeBankNo = result.bankNo;
      }
    },
    selectInMailList() {
      this.commit("selectInMailList");
    },
    notPromiseDialogByDialog() {
      Dialog.showAwait(TableDialog, {
        dialogBoxContentArgs: {
          historyList: this.TransferHistoryDetail
        }
      }).then(result => {
        if(result.rowData){
          this.dm.PayeeActNo = result.rowData.PayeeActNo;
          this.dm.PayeeActName = result.rowData.PayeeActName;
          this.dm.PayeeBankNo = result.rowData.PayeeBankNo;
          // this.dm.PayeeBankName = result.rowData.PayeeBankName;
          this.dm.PayeeBankName = result.rowData.PayeeBankName; 
        }
      });
    },
    //通信查询账号是否是本行人员 并回显用户数据
    async testIfThisBankAcct() {
      //查询用户是否是本行的
      let content = new B031();
      MessagePacker.pack(content, this.dm);
      // console.log(this.PayeeActNo);
      if (!this.dm.PayeeActNo) {
        return;
      }
      content.AcctNo = this.dm.PayeeActNo;
      try {
        let result = await RequestHelper.sendAsync(content);
        if (result.SYS_HEAD.ReturnCode === "000000") {
          //暂时认为返回000000就是查询到结果本行有此账户
          this.dm.PayeeActName = result.RSP_BODY.AcctName;
          // this.dm.PayeeBankNo = result.RSP_BODY.xxxxxxxx;//应该是本行行号
          this.dm.PayeeBankNo = "123123"; //应该是本行行号
          this.dm.PayeeBankName = result.RSP_BODY.OpenBrcName;
        } else if (result.SYS_HEAD.ReturnCode === "0000NC") {
          //没有用户
          console.log("不是本行用户");
        } else {
          console.log("未知错误，返回码:" + result.SYS_HEAD.ReturnCode);
        }
      } catch (error) {
        console.error(error);
      }
    },
    //通信请求历史人员列表
    async getPayeeList() {
      let content = new B053();
      MessagePacker.pack(content, this.dm);
      content.CustInfoQryMode = "3"; //提交的是acctno需要放入类型3
      try {
        let res = await RequestHelper.sendAsync(content);
        if (res.SYS_HEAD.ReturnCode === "000000") {
          this.TransferHistoryDetail = res.RSP_BODY.TransferHistoryDetail;
        } else {
          console.debug(res.SYS_HEAD.ReturnMessage);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onNavigated() {
      FocusManager.attach(this);
    },
    onClose() {
      FocusManager.detach(this);
    }
  },
  validators: {
    PayeeActNo: [
      {
        test(value) {
          console.log("正在验证");
          return true;
        },
        errorMsg: "验证码错误"
      }
    ],
    PayeeActName: [
      {
        test(value) {
          console.log("正在验证");
          return true;
        },
        errorMsg: "验证码错误"
      }
    ],
    PayeeBankName: [
      {
        test(value) {
          console.log("正在验证");
          return true;
        },
        errorMsg: "验证码错误"
      }
    ]
  },
  beforeMount: function() {},
  mounted: function() {
    this.getPayeeList();
  }
};
</script>

<style scoped>
.footer-boxP {
  width: 520px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.w100 {
  width: 100%;
}
.w70 {
  width: 70%;
}
.w60 {
  width: 60%;
}
.w40 {
  width: 40%;
}
.w30 {
  width: 30%;
}
.w20 {
  width: 20%;
}
.clear {
  clear: both;
}
.textCenter {
  text-align: center;
}
.inputNameArrow {
  font-size: 30px;
}
.inputNamePageCtn {
  width: 91%;
  height: 100%;
}
.inputNamePrompt {
  color: #ff8636;
  margin: 38px 0 20px 0;
  display: block;
}
.inputNameInfo {
  background: #f2f2f2;
  box-sizing: content-box;
  padding: 30px 60px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.inputNameInfo h4 {
  font-weight: 800;
  display: block;
  margin-bottom: 30px;
}
.inputNameArrow {
  font-size: 64px;
}

.inputClass {
  width: 599px;
  margin-bottom: 10px;
}

.inputNameBtn {
  height: 40px;
  font-size: 19px;
  margin: 8px auto;
  min-width: 160px;
}

.template {
  font-size: 20px;
  color: #999999;
  border-right: 1px solid #cccccc;
  width: 80px;
  padding: 0 20px;
  display: inline-block;
}
/* .aui-text-input-disabled{
  background: none;
} */
/* 下面样式不生效 不明原因 */
/* .aui-text-input input{
  background: none !important;
} */
</style>