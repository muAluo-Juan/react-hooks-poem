import PoemContent from "../components/PoemContent"
import CommonContext from '../components/CommonContext'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col } from 'antd'
import Footer from '../components/Footer'
import '../styles/components/author.css'
import '../styles/pages/poemdetail.css'
import '../styles/pages/comm.css'

const PoemDetail = () => {
    let poemList = [
        {
            href: '/poemdetail',
            title: `静夜思1`,
            description:
                '李白 [唐代]',
            content:
                '\n离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。远芳侵古道，晴翠接荒城。又送王孙去，萋萋满别情。\n'.replace(/。/g, "。<br>"),
            isCollect: "false"
        }
    ]
    let pagination = null
    let display = 'none'

    return (
        <div>
            <Head>
                <title>夜雨时古诗词详情</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="poem-detail-div">
                        <CommonContext.Provider value={{poemList,pagination,display}}>
                            <PoemContent />
                        </CommonContext.Provider>
                        <div>
                            <h3 style={{fontWeight:"bold"}}>译文及注释</h3>
                            <span style={{fontWeight:"bold"}}>译文</span>
                            <div
                                dangerouslySetInnerHTML={{ __html: poemList[0].content }}
                                style={{ lineHeight: "2rem" }}>
                            </div>
                            <span style={{fontWeight:"bold"}}>注释</span>
                            <div
                                dangerouslySetInnerHTML={{ __html: poemList[0].content }}
                                style={{ lineHeight: "2rem" }}>
                            </div>
                            <h3 style={{fontWeight:"bold"}}>鉴赏</h3>
                        </div>
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