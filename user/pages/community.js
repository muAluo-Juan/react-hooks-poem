import '../styles/components/author.css'
import '../styles/pages/community.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Divider, Button } from 'antd'
import Footer from '../components/Footer'
import CommonContext from '../components/CommonContext'
import { useContext, useEffect, useState } from 'react'
import Author from '../components/Author'
import Router from 'next/router'
import WorkList from '../components/WorkList'
import cookie from 'react-cookies'

const pagination = {
    onChange: page => {
        console.log(page);
    },
    pageSize: 5,
}

export default function Community() {
    const [chooseNav, setChooseNav] = useState("最新")
    const [cookieState, setCookieState] = useState(false)
    const [userName, setUserName] = useState('')
    useEffect(()=>{
        if(cookie.load("user")!=undefined)
        {
            setCookieState(true)
            setUserName(cookie.load("user"))
            console.log("community传过去的",userName)
        }    
        else
            setCookieState(false)
    },[])
    function createWork() {
        Router.push('/creatework')
    }
    
    return (
        <div>
            <Head>
                <title>夜雨时社区</title>
            </Head>
            <Header setCookieState={setCookieState}/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="left-content">
                        <div className="nav-choose">
                            <a style={{ color: chooseNav == "最新" ? '#cd201f' : 'rgba(0, 0, 0, 0.45)' }} onClick={() => { setChooseNav("最新") }}>最新</a>
                            <Divider type="vertical" />
                            <a style={{ color: chooseNav == "热门" ? '#cd201f' : 'rgba(0, 0, 0, 0.45)' }} onClick={() => { setChooseNav("热门") }}>热门</a>
                        </div>
                        <Divider />
                        <CommonContext.Provider value={{ chooseNav, pagination }}>
                            <WorkList />
                        </CommonContext.Provider>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <div style={{display:cookieState?'block':'none'}}>
                        <CommonContext.Provider value={userName}>
                            <Author/>
                        </CommonContext.Provider>
                        <div className="author-div comm-box extra">
                            <Button type="primary" icon="highlight" onClick={createWork}>前往写作</Button>
                            <Button type="primary" icon="profile">个人主页</Button>
                        </div>
                    </div>
                    <div style={{display:!cookieState?'block':'none'}} className="comm-box author-div">
                        写作前请先<span style={{ paddingLeft: '0.3rem', paddingRight: '0.3rem', color: '#cd201f' }}>登录</span>噢
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}