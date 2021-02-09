/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606382903538_9071';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',  //有服务器写服务器的
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'password',
      // database
      database: 'react_blog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  //安全机制，跨域
  config.security={
    csrf:{
      enable:false
    },
    domainWhiteList:['*']
  };
  config.cors={
    origin:'http://localhost:3000',
    credentials:true,  //允许Cookie、Session跨域，很不安全，需要重构，用jwt试试？Cookie跨域前后盾分离都能使用
    allowMethods:'GET,HEAD,PUT,POST,UPDATE,DELETE,PATCH,OPTIONS'
  } 

  return {
    ...config,
    ...userConfig,
  };
};
