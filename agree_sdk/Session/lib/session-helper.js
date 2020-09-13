'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = {
  getSessionDataAsync: function getSessionDataAsync() {
    return new Promise(function (resolve, reject) {
      fetch('http://www.sunfengfeng.com/get').then(function(result){
        resolve(result.json());
      }).then(function(error){
        reject(error);
      });
    });
  },
  setSessionDataAsync: function setSessionDataAsync(sessionData) {
    return new _promise2.default(function (resolve, reject) {
      if (!sessionData) {
        reject('[SessionHelper] sessionData invalid');
      };
      cordova.exec(function (result) {
        return resolve(result);
      }, function (error) {
        return reject(error);
      }, 'SessionHelper', 'SetSessionData', [sessionData]);
    });
  }
};
//# sourceMappingURL=session-helper.js.map
