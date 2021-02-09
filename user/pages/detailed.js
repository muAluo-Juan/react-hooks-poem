import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import Author from '../components/Author'
import Advertise from '../components/Advertise'
import Footer from '../components/Footer'
import 'markdown-navbar/dist/navbar.css'
import '../styles/pages/detailed.css'
import axios from 'axios'
//解析markdown，高亮，编辑器样式
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import servicePath from '../config/apiUrl'

export default function Detailed(props) {
  const tocify = new Tocify()
  
  const renderer = new marked.Renderer()

  //自定义导航渲染方式
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level)
    return '<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n'
  }

  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,  //容错
    sanitize:false,//忽略html原始标签
    tables:true,//tables为true,gfm一定要写上
    breaks:false,//换行符
    smartLists:true,//自动渲染列表
    highlight:function(code){//怎么高亮
      return hljs.highlightAuto(code).value
    }
  })

  let html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/">视频列表</a></Breadcrumb.Item>
                <Breadcrumb.Item>XXX</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">
                React实战视频教程-元川居安Blog开发（更新第24集）
              </div>
              <div className="list-icon center">
                <span><Icon type="calendar" />2020-11-25</span>
                <span><Icon type="folder" />视频教程</span>
                <span><Icon type="fire" />5498人</span>
              </div>
              {/* ！！！解析Markdown内容，用到解析插件react-markdown，github网址https://github.com/rexxars/react-markdown */}
              {/* escapeHtml={false}表示原样输出html */}
              <div className="detailed-content"
                dangerouslySetInnerHTML={{__html:html}}
              >
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advertise />
          {/* Affix为固钉效果 */}
          <Affix offsetTop={5}>
            {/* 目录导航 */}
            {/* ordered={flase}表示不带编号 */}
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Detailed.getInitialProps = async(context)=>{
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id)
    .then(
      (res)=>{
        console.log(res.data.data)          
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

