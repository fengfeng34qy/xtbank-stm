<template>
    <div class="select-bank">
        <div class = "receipt-bank">请选择收款银行</div>
        <div class="search-keyword">
          <input type="text" class="search-text" placeholder="请输入关键词搜索" @keyup="getKeyWords" v-model="ipt" v-keyboard="'text'"/>
        </div>
        <div class = "all-bank" @scroll="demandLoad" ref="bankContent">
          <div class="commercial-bank" v-for="(banks,bankIndex) in bankList" :key="bankIndex">
            <dl>
              <dt class = "icon-bank-dt">{{banks.bankType}}</dt>
              <dd class = "icon-bank-dd">
                <ul>
                  <li v-for="(item,index) in banks.bankInfoList" :key="index">
                    <img :src="bankImgDir + item.path" :class = "[item.bankShow ? '' : 'hidden-more-bank-icon']"/>
                    <span @click="selectBank(item.bankNo, item.bankName)">{{item.bankName}}</span>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
        <div class="more-bank">— — — — — — — {{bankTip}} — — — — — — —</div>
        <div class="footer">
          <aui-button @click="onCancel"  cornerType="rounded-corner" class="footer-btn">取消</aui-button>
        </div>
    </div>
</template>

<script>
import { TradeLogger } from "awp-plugin-logger"; //eslint-disable-line
import { Dialog } from "aui-ss";
import { DialogContent } from "awp-lib-framework";
import RemittanceBank from "../../../trade-params/remittance-bank.json";
import { FocusManager } from 'awp-ui-focus-manager';

let metadata = {//eslint-disable-line
  name: "selectReceiveBank.vue",
  description: "选择收款银行",
  outlets: {
    确定: "OK"
  }
};

export default {
  name: "select-receive-bank",
  mixins: [DialogContent],
  data() {
    return {
      bankImgDir: "/static/resource/trade/searchbank/", //图片路径
      bankTip: '上滑查看更多银行', //底部提示语
      ipt: "", //关键词
      bankList: [], //存放要显示的数据
      bankInfoList: [], //存放bankInfoList数据
      selectedItem: {},
      bankListAll: [], //读取文件后存放数据
      startShowIndex: 0, //数组中要显示列表起始索引值
      endShowIndex: 3, //结尾索引值常量
      varShowIndex: 3 //数组中要显示列表结尾索引值
    };
  },
  props: ["dialogBoxContentArgs"],
  methods: {
    onNext() {
      //将信息放入dm对应的对象中
      this.dm.PayeeBankNo = this.selectedItem.bankNo;
      this.dm.PayeeBankName = this.selectedItem.bankName;
      this.commit("OK");
    },
    selectBank(bankNo, bankName) {
      let params = {"bankNo": bankNo, "bankName": bankName};
      this.result = params;
      console.log("弹窗关闭前返回的数据");
      console.log('result', this.result);
      Dialog.close(this);
    },
    /**
     * 将bankInfoList中的数据单独存储
     */
    searchBankInfoList() {
      this.bankListAll.forEach(val => {
        val.bankInfoList.forEach(item => {
          this.bankInfoList.push(item);
        });
      });
    },
    onCancel() {
      console.log("关闭弹窗");
      Dialog.close(this);
    },
    /**
     * 读取文件数据并赋值
     * @param start 起始索引
     * @param end 结束索引
     */
    getShowBankList(start, end) {
      this.bankListAll = RemittanceBank; //文件的所有数据
      this.bankList.splice(0, this.bankList.length); //清空元素
      this.bankList = this.bankListAll.slice(start, end + 1); //要显示的数据列表
      console.log("bankListAll", this.bankListAll);
      console.log("bankList", this.bankList);
    },
    /**
     * 通过关键词搜索来显示匹配列表
     */
    getKeyWords() {
      console.log("开始匹配!");
      var _ipt = this.ipt.split(" ").join(''); //去掉空格后的关键词
      console.log('_ipt', _ipt);
      console.log('bankList', this.bankList);
      if (_ipt != "") {
        this.bankList.splice(0, this.bankList.length); //清空元素
        var arr = [], obj = {};
        this.bankInfoList.forEach(item => {
          console.log('item', item);
          var bankName = item.bankName;
          var py = item.py;
          var index = bankName.indexOf(_ipt) > -1 || py.indexOf(_ipt.toUpperCase()) > -1;
          console.log("index", index);
          if (index) {
            arr.push(item);
          }
        });
        if (arr.length > 0) {
          obj.bankInfoList = arr;
          obj.bankType = ''; //清空简称 防止页面上出现
          obj.bankTypeCode = '';
          this.bankList.push(obj);
        }
        this.bankTip = '已显示匹配银行';
      } else {
        this.getShowBankList(this.startShowIndex, this.endShowIndex); //如果关键词搜索为空则恢复到第一次打开页面时的数据列表
        this.varShowIndex = this.endShowIndex; //用户搜索完数据后清空搜索框  此时应该重新计算结尾索引值
        this.bankTip = '已显示匹配银行';
      }
    },
    /**
     * 判断滚动条是否到达底部
     */
    demandLoad() {
      //判断滚动条是否到达底部
      let clientHeight = this.$refs.bankContent.clientHeight;
      let scrollHeight = this.$refs.bankContent.scrollHeight;
      let scrollTop = this.$refs.bankContent.scrollTop;
      console.log('clientHeight', clientHeight); //可视区的高度
      console.log("scrollHeight", scrollHeight); //总体高度
      console.log("scrollTop", scrollTop); //滚动条的高度
      if (clientHeight + scrollTop >= scrollHeight) {
        console.log("滚动到底部！");
        let len = this.bankListAll.length - 1;
        let end = this.varShowIndex;
        if (end < len) {
          if (!this.ipt) {
            this.varShowIndex = this.varShowIndex + 1;
            //当搜索框有内容的时候滑动滚动条  此时不加入数据
            console.log("初始化数据！");
            console.log("ipt", this.ipt);
            this.bankList.push(this.bankListAll[this.varShowIndex]);
            console.log('varShowIndex', this.varShowIndex);
          }
        } else {
          this.bankTip = '已显示全部银行';
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
  /**
   * 初始化页面前加载数据列表
   */
  async beforeMount () {
    this.getShowBankList(this.startShowIndex, this.varShowIndex); //初始化页面时候要显示的数据列表
    this.searchBankInfoList(); //单独存储bankInfoList
  }
};
</script>

<style scoped>
.select-bank{
  position: relative;
  width: 1200px;
  height: 900px;
  background: #fff;
  box-sizing: border-box;
  padding: 40px 0px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
}
.receipt-bank{
  font-size: 24px ; 
  color: #896e6e;
  width: 100%;
  padding-bottom: 16px;
  margin: 0 auto;
  border-bottom: 1px solid #dcd2c0;
}
.search-keyword {
  padding: 30px 0px 0px;
  width: 100%;
  text-align: center;
  position: relative;
}
.search-text {
  width: 95%;
  height: 45px;
  box-sizing: border-box;
  background: url("/static/resource/trade/searchbank/search-bank.png") 20px 8px no-repeat;
  border: 1px solid #e3e3e3;
  background-size: 28px;
  padding: 0px 0px 0px 65px;
  font-size: 20px;
  border-radius: 15px;
  color: #2c3e50;
  outline: none;
}
.search-list{
  position: absolute;
  z-index: 999;
  top: 0px;
  left: 0px;
  background: #fff;
  width: 100%;
  text-align: left;
}
.all-bank{
  height: 75%;
  overflow: auto;
}
.all-bank::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}
.all-bank::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 8px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1); */
  background: #ebebeb;
}
.all-bank::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  border-radius: 0;
  background: transparent;
}
.commercial-bank {
  font-size: 20px;
  width: 95%;
  margin: 20px auto;
  font-size: 18px;
}
dl:after , ul:after{
  clear: both;
  content: " ";
  display: block;
  height: 0;
  visibility: hidden;
}
.icon-bank-dt {
  text-align: left;
  color: #f27948;
}
.icon-bank-dd {
  width: 100%;
  float: left ;
}
.icon-bank-dd ul {
  margin-left: 35px ;
}
.icon-bank-dd li{
  float: left;
  width: 20%;
  text-align: left ;
  padding: 20px 0px ;
}
.icon-bank-dd li img {
  vertical-align: middle;
}
.icon-bank-dd li span{
  vertical-align: middle;
  display: inline-block;
  cursor: pointer;
  white-space: nowrap;
}
.icon-bank-dd li span:hover{
  color: #00a3d2;
}
.footer {
  padding: 10px 20px 15px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
}
.show-more-bank{
  display: block;
}
.hidden-more-bank{
  display: none;
}
.hidden-more-bank-icon{
  visibility: hidden;
}
.more-bank {
  font-size: 18px;
  padding: 20px 0px;
}
.footer-btn {
  width: 168px;
  height: 60px;
  font-size: 26px;
}
</style>