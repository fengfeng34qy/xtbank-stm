<template>
  <div class="child2">
    <div>test2</div>
    <vue-qr :logoSrc="imageUrl" text="http://www.sunfengfeng.com" :size="200"></vue-qr>
    <div class="child1">
      <!-- <input type="button" @click="changeTitle" value="click"> -->
    </div>
  </div>
</template>

<script>

import BasicPage from '@/mixins/basic-page';
import vueQr from 'vue-qr';
// import child2 from '@/modules/test1/child2';

/* eslint-disable */
export default {
  name: 'test2',
  mixins: [BasicPage],
  props: ['dm'],
  computed: {
    normalizedSize() {
      return this.session;
    }
  },
  components: {
    vueQr
  },
  data() {
    return {
      imageUrl: require("@/assets/logo.png")
    };
  },
  created() {
    // console.log(this.session);
  },
  methods: {
    // onInitialize() {
    //   console.log(this.$route);
    // },
    // changeTitle() {
    //   this.$emit('pageChange', child2);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child1{
  margin-top: 40px;
}
</style>
