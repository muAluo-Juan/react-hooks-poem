'use strict';
/**配置插件和外部组件的地方 */
// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

/**配置mysql */
exports.mysql = {
  enable:true,
  package:'egg-mysql'
}

/**配置跨域 */
exports.cors = {
  enable:true,
  package:'egg-cors'
}