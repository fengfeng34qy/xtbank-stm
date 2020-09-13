<template>
  <page class="select-receivables">
    <page-header>请选择收款方</page-header>
    <page-content class="selectRecCtn">
      <div class="payeeTitle">
        <i class="fl"></i>
        <span class="fl">收款人登记簿</span>
      </div>
      <div class="payeeListWindow">
        <ul>
          <li class="listBox" v-for="(item,key) in analysisedList" :key="key">
            <div class="listTitle">{{key}}</div>
            <div class="listSmallBox">
              <ul>
                <li class="listSmallBoxCtn" :class="[bankColor(smallItem.bankNo), { active: selectedBankNo == smallItem.bankNo }]" v-for="(smallItem,smallKey) in item" :key="smallKey" @click="selectOneAccount(smallItem)">
                  <div class="smallBoxTitle">
                    <span class="fl">{{smallItem.bank}}</span>
                    <!-- <span class="fr borderRound">{{smallItem.accountType}}</span> -->
                    <div class="clear"></div>
                  </div>
                  <div class="smallBoxBody">
                    <span class="fl">{{smallItem.name}}</span>
                    <span class="fr">{{smallItem.accountNo}}</span>
                    <div class="clear"></div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="payeeListToolBox"></div>
      </div>
    </page-content>
    <page-footer>
      <aui-box justify-content="space-between" class="footer-box">
        <aui-button @click="onBack">上一步</aui-button>
        <aui-button @click="toThisAccount" :disabled="ifDisable">选择此收款方</aui-button>
      </aui-box>
    </page-footer>
  </page>
</template>

<script>
import BasicPage from "../../mixins/basic-page";
import { TradeLogger } from "awp-plugin-logger"; //eslint-disable-line
import messagePacker from "../../utils/message-packer";
import requestHelper from "../../utils/request-helper";

//引入pinyin4js
// var pinyin = require("pinyin4js");//pinyin4js是将方法放在全局 引用后使用方法时要找window.PinyinHelper
// import PinyinHelper from 'pinyin4js';//中间两种是错误引用方法
require("pinyin4js");

let metadata = {//eslint-disable-line
  name: "selectReceivables.vue",
  description: "选择收款方",
  outlets: {
    选中账户: "thisAccount"
  }
};

export default {
  name: "select-receivables",
  mixins: [BasicPage],
  data() {
    return {
      payeeList: {
        L: [
          {
            bankNo: "1",
            bank: "中国农业银行",
            accountType: "借记卡",
            name: "李四",
            accountNo: "6228 **** 0001"
          }
        ],
        W: [
          {
            bankNo: "2",
            bank: "中国建设银行",
            accountType: "借记卡",
            name: "王五",
            accountNo: "6227 **** 0001"
          }
        ],
        Z: [
          {
            bankNo: "3",
            bank: "中国光大银行",
            accountType: "普通账户",
            name: "张三",
            accountNo: "6226 **** 0001"
          },
          {
            bankNo: "4",
            bank: "中国招商银行",
            accountType: "借记卡",
            name: "赵六",
            accountNo: "6224 **** 0001"
          }
        ]
      },
      analysisedList: {},
      selectedItem: {},
      selectedBankNo: ""
    };
  },
  computed: {
    ifDisable: function() {
      return !(this.selectedItem.bankNo);
    }
  },
  methods: {
    bankColor: function(bankNo) {
      switch (bankNo) {
        case "1":
          return "nongye";
        case "2":
          return "jianshe";
        case "3":
          return "guangda";
        case "4":
          return "zhaoshang";
        default:
          return "nongye";
      }
      // console.log(bankNo);
      // return "nongye";
    },
    onBack() {
      this.back();
    },
    toThisAccount() {
      //将暂存的对象拿出来放入dm
      this.dm.PayeeActNo = this.selectedItem.accountNo;
      this.dm.PayeeActName = this.selectedItem.name;
      this.dm.PayeeBankNo = this.selectedItem.bankNo;
      this.dm.PayeeBankName = this.selectedItem.bank;

      this.commit("thisAccount");
    },
    selectOneAccount(smallItem, e) {
      //将信息放入data暂存对应的对象中
      this.selectedItem = smallItem;
      //并且渲染页面 要在data单独搞一个key值去匹配列表 直接修改数组中的 selected值不会被vue监听 所以不会渲染
      this.selectedBankNo = smallItem.bankNo;
    },

    //尝试在ui节点中请求信息
    async getReceivablesList() {
      // let content = new B053();
      let content = { CustNo: "" };
      messagePacker.pack(content, this.dm);
      content.CustNo = 123456;
      try {
        let res = await requestHelper.sendAsync(content);
        if (res.SYS_HEAD.ReturnCode === "000000") {
          this.dmAuthCode = res.RSP_BODY.AuthCode;
          console.log(res);
        } else {
          console.debug(res.SYS_HEAD.ReturnMessage);
        }
      } catch (error) {
        console.error(error);
      }
    },
    //深复制获取的data并且解析成hash
    analysisData() {
      // this.analysisedList = {};
      var resList = this.dm.TransferHistoryDetail;
      for (var i = 0; i < resList.length; i++) {
        // console.log(window);
        var InitialCharacter = window.PinyinHelper.getShortPinyin(resList[i].PayeeActName[0]);//使用pinyin4js写法
        // console.log(InitialCharacter);
        if (!this.analysisedList[InitialCharacter]) {
          this.analysisedList[InitialCharacter] = [];
        }
        this.analysisedList[InitialCharacter].push({
          selected: false,
          bankNo: resList[i].PayeeBankNo,
          name: resList[i].PayeeActName,
          accountNo: resList[i].PayeeActNo,
          LastTransDate: resList[i].LastTransDate,
          bank: resList[i].PayeeBankName
        });
      }
      // return tempArr;
      // console.log(tempArr);
      // console.log(this.analysisedList);
    }
  },
  created: function() {
    this.analysisData();
  },
  mounted: function() {
    console.log(this.dm);
    console.log(this.session);
  },
  watch: {
    analysisedList: {
      deep: true,
      handler(curr, old) {
        console.log(curr, old);
      }
    }
  }
};
</script>

<style scoped>
.footer-boxP {
  width: 520px;
}
.selectRecCtn {
  position: relative;
}
.payeeTitle {
  display: block;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  line-height: 60px;
}
.borderRound {
  border: 1px solid #fff;
  border-radius: 10px;
  font-size: 16px;
  padding: 1px 12px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clear {
  clear: both;
}
/* .clear:after{
  content: "";
  display: block;
  clear: both;
} */
.payeeListWindow {
  position: absolute;
  top: 60px;
  bottom: 13px;
  left: 0;
  right: 0;
  overflow-y: auto;
  transform: translate(0, 0);
}
.payeeListToolBox {
  position: fixed;
  width: 30px;
  height: 100%;
  right: 0;
  top: 0;
  background: #fff;
}
.listSmallBox {
  background: #f2f2f2;
  color: #fff;
  padding: 20px 70px 10px 40px;
}
.listSmallBoxCtn {
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  transition: 0.3s;
}
.listSmallBoxCtn.active {
  /* border: 2px solid #0088ff; */
  box-shadow: #0088ff 0 0 10px 3px;
}
.smallBoxTitle {
  padding: 14px 40px;
}

.smallBoxBody {
  padding: 25px 40px;
}

.nongye .smallBoxTitle {
  background: #00cc66;
}
.nongye .smallBoxBody {
  background: #009966;
}
.jianshe .smallBoxTitle {
  background: #0099ff;
}
.jianshe .smallBoxBody {
  background: #0066ff;
}
.guangda .smallBoxTitle {
  background: #9966ff;
}
.guangda .smallBoxBody {
  background: #9900ff;
}
.zhaoshang .smallBoxTitle {
  background: #ff3366;
}
.zhaoshang .smallBoxBody {
  background: #cc0000;
}
</style>
