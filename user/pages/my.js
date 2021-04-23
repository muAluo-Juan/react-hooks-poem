import '../styles/components/author.css'
import '../styles/pages/my.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Divider, Button, Badge, Menu, Icon, Tabs } from 'antd'
import Footer from '../components/Footer'
import CommonContext from '../components/CommonContext'
import { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import cookie from 'react-cookies'
import Author from '../components/Author'
import MyInfo from '../components/MyInfo'
import MyWork from '../components/MyWork'
import MyCollect from '../components/MyCollect'
import MyQuestion from '../components/MyQuestion'
import MyAttention from '../components/MyAttention'
import MyDraft from '../components/MyDraft'
import MyRecycle from '../components/MyRecycle'

const pagination = {
    onChange: page => {
        console.log(page);
    },
    pageSize: 5,
}

export default function My() {
    const [cookieState, setCookieState] = useState(false)
    const [loginUser, setLoginUser] = useState({})
    const [userName, setUserName] = useState('')
    const [choosed, setChoosed] = useState("1")

    useEffect(() => {
        setUserName(cookie.load("user"))
    }, [])

    const handleClick = e => {
        console.log('click ', e);
        setChoosed(e.key)
    }

    return (
        <div>
            <Head>
                <title>夜雨时个人主页</title>
            </Head>
            <Header setCookieState={setCookieState} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="my-left-content">
                        <div style={{display:choosed=="1"?"block":"none"}}><MyInfo/></div>
                        <div style={{display:choosed=="2"?"block":"none"}}><MyWork/></div>
                        <div style={{display:choosed=="3"?"block":"none"}}><MyCollect/></div>
                        <div style={{display:choosed=="4"?"block":"none"}}><MyQuestion/></div>
                        <div style={{display:choosed=="5"?"block":"none"}}><MyAttention/></div>
                        <div style={{display:choosed=="6"?"block":"none"}}><MyDraft/></div>
                        <div style={{display:choosed=="7"?"block":"none"}}><MyRecycle/></div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={4} lg={5} xl={5}>
                    {/* <CommonContext.Provider value={userName}>
                        <Author />
                    </CommonContext.Provider> */}
                    <div style={{ marginLeft: "0.6rem" }}>
                        <Menu
                            onClick={handleClick}
                            style={{ with: 256 }}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                        >
                            <Menu.Item key="1">
                                <Icon type="user" />
                                    个人信息
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="highlight" />
                                    我的作品
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="star" />
                                    我的收藏
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="bulb" />
                                    我的问答
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Icon type="heart" />
                                    关注/粉丝
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Icon type="file-text" />
                                    草稿箱
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Icon type="delete" />
                                    回收站
                            </Menu.Item>
                        </Menu>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}