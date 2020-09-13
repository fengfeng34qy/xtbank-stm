<template>
  <div id="app">
    <!-- <input type="text" ref="input1"> -->
    <!-- <button @click="add">添加</button> -->
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'App',
  created(){
    
  },
  methods: {
    add(){
      this.$refs.input1.value ="22"; //this.$refs.input1  减少获取dom节点的消耗
      console.log(this.$refs)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
