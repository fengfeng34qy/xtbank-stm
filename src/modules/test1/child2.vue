<template>
  <div class="child2">
    <span>{{session}}---{{normalizedSize}}</span><br>
    <div>第二个子组件</div>
    <div class="child2">
      <input type="button" @click="changeTitle" value="click">
      <aui-button @click="vueMetroTile" :fill="true">vue-metro-tile</aui-button>
    </div>
  </div>
</template>

<script>

import child1 from '@/modules/test1/child';
import child3 from '@/modules/test1/child3';
import MetroTile from 'vue-metro-tile';

export default {
  name: 'child2',
  props: ['session'],
  computed: {
    normalizedSize() {
      return this.session;
    }
  },
  data() {
    return {};
  },
  created() {},
  components: { MetroTile },
  methods: {
    changeTitle() {
      this.$emit('pageChange', child1);
    },
    vueMetroTile() {
      this.$emit('pageChange', child3);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.child2{
  height: 316px;
}
</style>
