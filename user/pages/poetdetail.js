import '../styles/components/author.css'
import '../styles/pages/comm.css'
import '../styles/pages/poetdetail.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Breadcrumb } from 'antd'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import CommonContext from '../components/CommonContext'
import PoetIntro from "../components/PoetIntro"
import axios from 'axios'
import servicePath from "../config/apiUrl"
import PoemContent from "../components/PoemContent"
import cookie from 'react-cookies'

const PoetDetail = () => {
    const [poets, setPoets] = useState([])
    const [cookieState, setCookieState] = useState(false)
    const [collectState, setCollectState] = useState(0)
    const pagination = null
    const pagination2 = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 10,
    }
    let display = 'block'
    useEffect(() => {
        getPoetByUId()
    }, [collectState])
    const getPoetByUId = () => {
        axios({
            method: 'GET',
            url: servicePath.getPoetByUId + (window.location.search.split("="))[1],
            withCredentials: true,
            headers:{"token":cookie.load("token")}
        }).then(
            res => {
                setPoets([res.data.data])
                console.log(poets)
            }
        )
    }
    return (
        <div>
            <Head>
                <title>夜雨时诗人详情</title>
            </Head>
            <Header setCookieState={setCookieState} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="poet-detail-div">
                        {
                            poets.map((item, index) => {
                                return (
                                    <Breadcrumb>
                                        <Breadcrumb.Item>诗词</Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            <a href="/poet">诗人一览</a>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            })
                        }
                        <CommonContext.Provider value={{ poets, pagination }}>
                            <PoetIntro />
                        </CommonContext.Provider>
                        {
                            poets.map((item, index) => {
                                return (
                                    <div>
                                        <div>
                                            <h3 style={{ fontWeight: "bold", color: "#cd201f" }}>诗人诗篇</h3>
                                            <CommonContext.Provider value={{ poemList: item.poems, pagination: pagination2, display }}>
                                                <PoemContent setCollectState={setCollectState}/>
                                            </CommonContext.Provider>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <div className="author-div comm-box">
                        <div>
                            <img style={{ width: "100%", height: "100%" }} src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/groupchat.jpg"></img>
                            <p>扫一扫加入群聊，与诗友一道谈古论今</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default PoetDetail