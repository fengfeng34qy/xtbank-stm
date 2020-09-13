<template>
  <div class="insert-bank-card">
    <div>请插入您的银行卡</div>
    <div>
      <audio src="/static/resource/audio/insertBankCard.ogg" autoplay></audio>
      <img src="static/resource/trade/card.gif" alt="插入银行卡" class="card-img">
    </div>
  </div>
</template>

<script>
// import BasicPage from "../../mixins/basic-page";
let metadata = { //eslint-disable-line
  name: "InsertBankCard.vue",
  description: "插入银行卡",
  outlets: {
    确定: "OK",
    取消: "Cancel"
  }
};

export default {
  name: "insert-bank-card",
  mixins: [],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
  .card-img {
    margin-top: 50px;
  }
</style>
