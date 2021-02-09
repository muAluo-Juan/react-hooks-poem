/**中后台控制接口 */
/**严格模式 */
'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        this.ctx.body = "hi后台api"
    }
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = "SELECT userName " +
            "FROM admin_user " +
            "WHERE userName = '" + userName + "' " +
            "AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            /**登录成功 */
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }
        } else {
            /**登录失败 */
            this.ctx.body = { 'data': '登录失败' }
        }
    }

    /**获得文章类型 */
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    /**保存文章 */
    async addArticle() {
        let tempArticle = this.ctx.request.body
        console.log('这里吗', tempArticle)
        const result = await this.app.mysql.insert('article', tempArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    /**修改文章 */
    async updateArticle() {
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tempArticle)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    /**获得文章列表 */
    async getArticleList() {
        let sql = 'SELECT article.id as id ,' +
            'article.title as title ,' +
            'article.introduce as introduce ,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'ORDER BY article.id DESC'
        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results }
    }

    /**删除文章 */
    async deleteArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body = {data:res}
    }

    /**获得文章 */
    async getArticleById(){
        let id = this.ctx.params.id
        //这里应该判断有没有这个id的
        let sql = 'SELECT article.id as id ,' +
            'article.title as title ,' +
            'article.introduce as introduce ,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ," +
            'article.article_content as article_content , '+
            'article.view_count as view_count ,' +
            'type.typeName as typeName , ' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE article.id ='+id 
        
        const result = await this.app.mysql.query(sql)
        
        this.ctx.body = {data:result}
    }
}   

module.exports = MainController