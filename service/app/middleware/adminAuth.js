/**中间件形式后台路由守卫 */
module.exports = options=>{
    return async function adminAuth(ctx,next){
        console.log("openId----->",ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body = {data:'没有登录'}
        }
    }
}