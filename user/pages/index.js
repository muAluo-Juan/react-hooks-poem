import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import { List, Icon, Row, Col, Carousel, Divider, Button, Tag } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import Author from '../components/Author'
import Advertise from '../components/Advertise'
import Footer from '../components/Footer'
import '../styles/pages/index.css'

import servicePath from '../config/apiUrl'

//解析markdown，高亮，编译器样式
import marked, { Renderer } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default function Home(list) {
  const [poet, setPoet] = useState(['李白', '杜甫', '猪八戒', '孙悟空', '唐僧', '沙悟净', '纳兰性德'])
  const [mylist, setMylist] = useState(list.data)
  console.log(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,  //容错
    sanitize: false,//忽略html原始标签
    tables: true,//tables为true,gfm一定要写上
    breaks: false,//换行符
    smartLists: true,//自动渲染列表
    highlight: function (code) {//怎么高亮
      return hljs.highlightAuto(code).value
    }
  })
  return (
    <div>
      <Head>
        <title>夜雨时</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
          {/* <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" />{item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  >
                  </div>
                </List.Item>
              )}
            /> */}
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
                <Divider orientation="left" plain>
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
              <div>
                <Divider orientation="left" plain>
                  <h3>诗友天地</h3>
                </Divider>
                <div className="special-div">

                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
          <div className="author-div comm-box">
            <div>
              <img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/wechat.jpg"></img>
              <p>扫一扫加入群聊，与诗友一道谈古论今</p>
            </div>
          </div>
          <div className="ad-div comm-box">
            <Divider orientation="center" plain>
              <h3>著名诗人</h3>
            </Divider>
            <div className="poetry-div">
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
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList)
      .then(
        (res) => {
          console.log("----------->", res.data)
          resolve(res.data)
        }
      )
  })
  return await promise//async必须有返回值
}