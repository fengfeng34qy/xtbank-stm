'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  checkUserInputAsync: function checkUserInputAsync(checkInterval, callback) {
    cordova.exec(function (result) {
      callback(result);
    }, function (error) {
      console.log(error);
    }, 'CheckUserOperation', 'CheckUserInput', [checkInterval]);
  }
};
//# sourceMappingURL=interaction-checker.js.map
