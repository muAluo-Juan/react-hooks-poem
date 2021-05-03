import '../styles/pages/index.css'
import '../styles/components/author.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Icon, Row, Col, Carousel, Divider, Button, Avatar } from 'antd'
import { useState } from 'react'
import Footer from '../components/Footer'
import CommonContext from '../components/CommonContext'


import servicePath from '../config/apiUrl'

//解析markdown，高亮，编译器样式
import marked, { Renderer } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import create from 'antd/lib/icon/IconFont'
import WorkList from '../components/WorkList'
import Router from 'next/router'

export default function Home(list) {
  const [poet, setPoet] = useState(['李白', '杜甫', '猪八戒', '孙悟空', '唐僧', '沙悟净', '纳兰性德', '更多...'])
  const [poetMates, setPoetMates] = useState([
    { id: 1, userName: '元川居安1', score: 20, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
    { id: 2, userName: '笑死我了好', score: 75, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
    { id: 3, userName: '元川居安3', score: 30, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
    { id: 4, userName: '元川居安4', score: 60, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
    { id: 5, userName: '元川居安5', score: 50, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' }
  ])

  let pagination=null
  let chooseNav = "首页"
  const [cookieState, setCookieState] = useState(false)

  // const [mylist, setMylist] = useState(list.data)
  // console.log(list.data)
  // const renderer = new marked.Renderer()
  // marked.setOptions({
  //   renderer: renderer,
  //   gfm: true,
  //   pedantic: false,  //容错
  //   sanitize: false,//忽略html原始标签
  //   tables: true,//tables为true,gfm一定要写上
  //   breaks: false,//换行符
  //   smartLists: true,//自动渲染列表
  //   highlight: function (code) {//怎么高亮
  //     return hljs.highlightAuto(code).value
  //   }
  // })
  function getMoreWork(){
    // document.documentElement.scrollTop = document.body.scrollTop =0;  页面间跳转滚动到页面顶部暂未解决
    Router.push('/community')
  }

  return (
    <div>
      <Head>
        <title>夜雨时首页</title>
      </Head>
      <Header setCookieState={setCookieState}/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
          <Row type="flex" justify="center">
            {/* <Col xs={18} sm={18} md={12} lg={12} xl={18}>
              <Carousel autoplay>
                <div>
                  <h3><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c1.jpg" alt="c1" /></h3>
                </div>
                <div>
                  <h3><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c2.jpg" alt="c2" /></h3>
                </div>
                <div>
                  <h3><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c3.jpg" alt="c3" /></h3>
                </div>
              </Carousel>
            </Col>
            <Col xs={18} sm={18} md={12} lg={12} xl={1}></Col>
            <Col xs={6} sm={6} md={4} lg={4} xl={5}>
              <div className="ad"><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c4.jpg" width="100%" /></div>
              <div className="ad" style={{ marginTop: "0.8rem" }}><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c5.jpg" width="100%" /></div>
              <div className="ad" style={{ marginTop: "0.8rem" }}><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c6.jpg" width="100%" /></div>
            </Col> */}
            <Col>
              <div>
                <Divider orientation="left">
                  <h3>诗词专题</h3>
                </Divider>
                <div className="special-div">
                  <div><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c7.jpg" /><p>描写山的诗词</p></div>
                  <div><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c8.jpg" /><p>描写节气的诗词</p></div>
                  <div><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c9.jpg" /><p>描写节日的诗词</p></div>
                  <div><img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/c10.jpg" /><p>描写建筑的诗词</p></div>
                </div>
                <Button className="more-btn" size="small">全部专题</Button>
              </div>
              <Divider orientation="left">
                  <h3>推荐诗词</h3>
                </Divider>
                <div className="recommend-poem-div">
                  <div>《烛影摇红·工》明代 · 夏侯淳</div>
                  <div>《烛影工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                  <div>《烛影摇红·辜负天工》明代 · 夏侯淳</div>
                </div>
              <div>
                <Divider orientation="left">
                  <h3>诗友天地</h3>
                </Divider>
                <div className="poetmates-index">
                  <CommonContext.Provider value={{chooseNav,pagination}}>
                    <WorkList/>
                  </CommonContext.Provider>
                </div>
                <Button className="all-btn" size="small" onClick={getMoreWork}>更多文章</Button>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
          <div className="author-div comm-box">
            <div>
              <img style={{width:"100%",height:"100%"}} src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/groupchat.jpg"></img>
              <p>扫一扫加入群聊，与诗友一道谈古论今</p>
            </div>
          </div>
          <div className="ad-div comm-box">
            <Divider orientation="center">
              <h3>著名诗人</h3>
            </Divider>
            <div className="poet-div">
              {
                poet.map((item) => {
                  return (
                    <div>
                      {item}
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="ad-div comm-box">
            <Divider orientation="center">
              <h3>活跃诗友</h3>
            </Divider>
            {
              poetMates.map((item) => {
                return (
                  <div className="poetmates-list">
                    <div className="poetmates-list-rank-div">{item.id}</div>
                    <div className="poetmates-list-username-div">
                      <Avatar size={45} src={item.avatar} />
                      <div>{item.userName}</div>
                      <span className="poetmates-list-username-tag">探花</span>
                    </div>
                    <div className="poetmates-list-score-div">
                      <Icon type="like" />
                      <div>{item.score}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

// Home.getInitialProps = async () => {
//   const promise = new Promise((resolve) => {
//     axios(servicePath.getArticleList)
//       .then(
//         (res) => {
//           console.log("----------->", res.data)
//           resolve(res.data)
//         }
//       )
//   })
//   return await promise//async必须有返回值
// }