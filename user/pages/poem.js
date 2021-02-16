import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Tabs, Radio } from 'antd'
import Footer from '../components/Footer'
import '../styles/components/author.css'
import AllPoems from '../components/AllPoems'

const { TabPane } = Tabs;

export default function Poem() {
    return (
        <div>
            <Head>
                <title>夜雨时</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Tabs defaultActiveKey="1" size="small" style={{ marginBottom: 32 }}>
                        <TabPane tab="诗词大全" key="1">
                            <AllPoems/>
                        </TabPane>
                        <TabPane tab="诗人一览" key="2">
                            Content of tab 2
                        </TabPane>
                        <TabPane tab="诗词类别" key="3">
                            Content of tab 3
                        </TabPane>
                    </Tabs>
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