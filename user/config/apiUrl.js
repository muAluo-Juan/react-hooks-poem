let ipUrl = 'http://127.0.0.1:8080/poems/'

let servicePath = {
    // getArticleList : ipUrl+'getArticleList', //首页接口
    // getArticleById : ipUrl+'getArticleById/',  //文章详细页接口
    // getTypeInfo : ipUrl+'getTypeInfo',  //文章类别接口
    // getListById : ipUrl+'getListById/' //文章类别列表
    getDynastyList : ipUrl+'dynasties', //朝代列表接口
    getPoetList : ipUrl + 'poets',  //诗人列表接口
    getTypeList : ipUrl + 'types',  //类型列表接口
    getPoems : ipUrl + 'poems',  //诗歌列表接口
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
}

export default servicePath