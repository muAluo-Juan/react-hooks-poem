'use strict';

/**
 * 路由总入口
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    require('./router/default')(app)
    require('./router/admin')(app)
};
