const emulationDeviceDirName = "_awp-plugin-devices-emulation"
let path = require('path')
let env = process.env.NODE_ENV

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

exports.alias = {
  'vue$': 'vue/dist/vue.esm.js',
  '@': resolve('src'),
  'src': path.resolve(__dirname, '../src'),
  'assets': path.resolve(__dirname, '../src/assets'),
  'components': path.resolve(__dirname, '../src/components'),
  'html2canvas': path.resolve(__dirname, '../awp_extern_sdk/html2canvas'),
  'awp-device': env === 'development' ? 'legacy/awp-device-emulation' : 'legacy/awp-device',
  'aui-ss': path.resolve(__dirname, '../aui-ss'),
  'jquery': 'jquery' 
}