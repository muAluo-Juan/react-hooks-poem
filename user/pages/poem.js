import '../styles/components/author.css'
import '../styles/pages/comm.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col } from 'antd'
import Footer from '../components/Footer'
import AllPoems from '../components/AllPoems'
import { useEffect, useState } from 'react'
import CommonContext from '../components/CommonContext'


export default function Poem() {
    const [cookieState, setCookieState] = useState(false)
    return (
        <div>
            <Head>
                <title>夜雨时古诗词大全</title>
            </Head>
            <Header setCookieState={setCookieState}/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <CommonContext.Provider value={cookieState}>
                        <AllPoems/>
                    </CommonContext.Provider>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <div className="author-div comm-box">
                        <div>
                            <img src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/groupchat.jpg"></img>
                            <p>扫一扫加入群聊，与诗友一道谈古论今</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}