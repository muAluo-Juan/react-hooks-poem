import '../styles/pages/communitydetail.css'
import '../styles/pages/comm.css'
import 'braft-editor/dist/index.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import CommonContext from '../components/CommonContext'
import Editor from '../components/Editor'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'
import { Row, Col, Input, Divider, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
import Router from 'next/router'

export default function MyWork() {
    const [cookieState, setCookieState] = useState(false)

    return (
        <div>
            <Head>
                <title>夜雨时个人主页</title>
            </Head>
            <Header setCookieState={setCookieState} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={21} lg={21} xl={21}>
                    <CommonContext.Provider value={1}>
                        <Editor/>
                    </CommonContext.Provider>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}