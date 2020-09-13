
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = {
  pages: {},
  install: function install(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function() {
      // 逻辑...
    };
    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    });

    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    });

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
      return '实例方法被调用';
    };
    console.log('myPlug安装完成！');
  },
  getPage: function getPage(path) {
    console.log('Getting "%s"', path);
    var page = this.pages[path];
    return page;
  }
};
