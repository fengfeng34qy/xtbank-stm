<template>
  <div :class="{error:errors[property]&&errors[property].length>0}" class="error-box">
    <slot></slot>
    <span class="error-text" v-if="errors[property]&&errors[property].length>0">
      {{errors[property][0].errorMsg}}
    </span>
  </div>
</template>
<script>
export default {
  name: 'input-error-template',
  props: ['property'],
  computed: {
    errors() {
      let validation;
      let parent = this.$parent;
      do {
        validation = parent.$validation;
      } while (!validation && (parent = parent.$parent));

      return validation.errors;
    }
  }
};
</script>
<style scoped>
.error {
  box-shadow: 0 0 0 1px #e74a41;
}

.error-text {
  font-size: 14px;
  color: #e74a41;
  display: block;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -7px;
  font-size: 12px;
  z-index: 1;
}

.error-box {
  position: relative;
  display: inline-block;
  border-radius: 2px;
}

.aui-text-input input {
  width: 300px;
}
</style>