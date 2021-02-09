/**路由配置 */
module.exports = app=>{
    const {router,controller} = app
    var adminAuth = app.middleware.adminAuth() //中间件
    router.get('/admin/index',controller.admin.main.index)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',adminAuth,controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',adminAuth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminAuth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminAuth,controller.admin.main.getArticleList)
    router.get('/admin/deleteArticle/:id',adminAuth,controller.admin.main.deleteArticle)
    router.get('/admin/getArticleById/:id',adminAuth,controller.admin.main.getArticleById)
}
