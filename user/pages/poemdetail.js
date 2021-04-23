import '../styles/components/author.css'
import '../styles/pages/poemdetail.css'
import '../styles/pages/comm.css'
import PoemContent from "../components/PoemContent"
import CommonContext from '../components/CommonContext'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Breadcrumb } from 'antd'
import Footer from '../components/Footer'
import { useEffect, useState } from "react"
import axios from 'axios'
import servicePath from "../config/apiUrl"
import PoetIntro from "../components/PoetIntro"

const PoemDetail = () => {

    const [poemList, setPoemList] = useState([])
    const [poets, setPoets] = useState([])
    const [cookieState, setCookieState] = useState(false)

    useEffect(() => {
        getPoemById()
    }, [])

    useEffect(()=>{
        console.log(poemList.length)
        if(poemList.length > 0)
        {
            getPoetByUId()
            console.log("执行")
        }    
    },[poemList.length])

    const getPoemById = () => {
        axios({
            method: 'GET',
            url: servicePath.getPoemById + (window.location.search.split("="))[1],
            withCredentials: true
        }).then(
            res => {
                setPoemList([res.data.data])
            }
        )
    }

    const getPoetByUId = ()=>{
        axios({
            method: 'GET',
            url: servicePath.getPoetByUId + poemList[0].authoruid,
            withCredentials: true
        }).then(
            res =>{
                setPoets([res.data.data])
            }
        )
    }

    let pagination = null
    let display = 'none'

    return (
        <div>
            <Head>
                <title>夜雨时古诗词详情</title>
            </Head>
            <Header setCookieState={setCookieState}/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="poem-detail-div">
                        {
                            poemList.map((item, index) => {
                                return (
                                    <Breadcrumb>
                                        <Breadcrumb.Item>诗词</Breadcrumb.Item>
                                        <Breadcrumb.Item>
                                            <a href="/poem">诗词大全</a>
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                                    </Breadcrumb>
                                )
                            })
                        }
                        <CommonContext.Provider value={{ poemList, pagination, display }}>
                            <PoemContent />
                        </CommonContext.Provider>
                        {
                            poemList.map((item, index) => {
                                return (
                                    <div>
                                        <div>
                                            <h3 style={{ fontWeight: "bold", color: "#cd201f" }}>注释</h3>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: item.annotation.replace(/。/g, '。<br>') }}
                                                style={{ lineHeight: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem", color: "rgba(0,0,0,0.65)" }}
                                            >
                                            </div>
                                            <h3 style={{ fontWeight: "bold", color: "#cd201f" }}>译文</h3>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: item.translation.replace(/^(\s|\\n)+|(\s|\\n)+$/g, '').replace(/\\n/g, "<br>") }}
                                                style={{ lineHeight: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem", color: "rgba(0,0,0,0.65)" }}>
                                            </div>
                                            <h3 style={{ fontWeight: "bold", color: "#cd201f" }}>作者介绍</h3>
                                            <CommonContext.Provider value={{poets,pagination}}>
                                                <PoetIntro/>
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
export default PoemDetail