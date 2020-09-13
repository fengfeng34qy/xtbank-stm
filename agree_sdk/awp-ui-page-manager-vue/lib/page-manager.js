'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  pages: {},
  install: function install(Vue, options) {
    var _this = this;

    console.log('PageManager: 安装中...');
    if (options && options.pages) {
      options.pages.forEach(function (page) {
        _this.pages[page.path] = page.page;
      });
    }

    console.log('PageManager: 安装完成');
  },
  getPage: function getPage(path) {
    var page = this.pages[path];
    return page;
  }
};
//# sourceMappingURL=page-manager.js.map
