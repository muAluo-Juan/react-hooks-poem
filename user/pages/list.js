import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import {List,Icon,Row,Col,Breadcrumb} from 'antd'
import Author from '../components/Author'
import Footer  from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

//markdown解析
//解析markdown，高亮，编辑器样式
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'


export default function MyList(list) {
  const [ mylist , setMylist ] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)
  })
  const renderer = new marked.Renderer()
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

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          {/* 面包屑导航 */}
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailted',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar"/>{item.addTime}</span>
                  <span><Icon type="folder"/>{item.typeName}</span>
                  <span><Icon type="fire"/>{item.view_count}</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                >

                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advertise/>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

MyList.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id)
      .then(
        (res)=>resolve(res.data)
      )
  })
  return await promise
}