let ipUrl = 'http://127.0.0.1:8080/poems/'

let servicePath = {
    getDynastyList : ipUrl+'dynasties', //朝代列表接口
    getPoetList : ipUrl + 'poets',  //诗人列表接口
    getTypeList : ipUrl + 'types',  //类型列表接口
    getPoems : ipUrl + 'poems/',  //诗歌列表接口
    getPoemById: ipUrl + 'poem/', //根据id获得诗歌
    getPoetByUId: ipUrl + 'poet/', //根据uid获得诗人信息
    getNewWorkList: ipUrl + 'works/new', //获得最新作品列表
    getHotWorkList: ipUrl + 'works/hot', //获得最热作品列表
    getWorkById: ipUrl + 'works/', //根据作品id获得作品
    getCommentListByWorkId : ipUrl + 'comments/', //根据作品id获得评论列表
    getHotQuestionList : ipUrl + 'questions/hot', //获得人气问题列表
    getNoSolvedQuestionList : ipUrl + 'questions/nosolved', //获得人气问题列表
    getSolvedQuestionList : ipUrl + 'questions/solved', //获得人气问题列表
    getQuestionById : ipUrl + 'question/', //根据问题id获取问题
    checkLogin: ipUrl + 'login', //登录
    checkRegister: ipUrl + 'register', //注册
    judgeUserExist: ipUrl + 'judgeuser/', //判断用户是否存在
    getCode: ipUrl + 'code', //返回验证码
    checkFindPwd: ipUrl + 'findpassword', //找回密码
    collect: ipUrl + 'collect/', //收藏或取消收藏诗词
    getWorkUser: ipUrl + 'user/', //获得登录用户的有关作品的信息
    likeWork: ipUrl + 'like/work/', //点赞作品
    collectWork: ipUrl + 'collection/work/', //收藏作品
    attendUser: ipUrl + 'attention/user/', //关注用户
    addComment: ipUrl + 'comment/work', //发表评论
}

export default servicePath