import { Row, Col, Divider, Button } from 'antd'
import { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import Header from '../components/Header'
import Head from 'next/head'
import Author from '../components/Author'
import CommonContext from '../components/CommonContext'
import cookie from 'react-cookies'

export default function CreateWork() {
    const [cookieState, setCookieState] = useState(false)
    const [userName, setUserName] = useState('')

    useEffect(()=>{
        setUserName(cookie.load("user"))
    })

    return (
        <div>
            <Head>
                <title>夜雨时创作作品</title>
            </Head>
            <Header setCookieState={setCookieState} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <CommonContext.Provider value={-1}>
                        <Editor />
                    </CommonContext.Provider>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <CommonContext.Provider value={userName}>
                        <Author />
                    </CommonContext.Provider>
                    <div className="author-div comm-box extra">
                        <Button type="primary" icon="profile">个人主页</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}