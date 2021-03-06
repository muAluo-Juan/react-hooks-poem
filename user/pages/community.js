import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Divider, Button } from 'antd'
import Footer from '../components/Footer'
import PoetMatesIndex from '../components/PoetMatesIndex'
import CommonContext from '../components/CommonContext'
import '../styles/components/author.css'
import '../styles/pages/community.css'
import { useState } from 'react'
import Author from '../components/Author'
import Router from 'next/router'

const listData = []
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}
const pagination = {
    onChange: page => {
        console.log(page);
    },
    pageSize: 5,
}
const data = [pagination, listData]

export default function Community() {
    const [chooseNav, setChooseNav] = useState(0)

    function createWork() {
        Router.push('/creatework')
    }
    return (
        <div>
            <Head>
                <title>夜雨时社区</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="left-content">
                        <div className="nav-choose">
                            <a style={{ color: chooseNav == 0 ? '#cd201f' : 'rgba(0, 0, 0, 0.45)' }} onClick={() => { setChooseNav(0) }}>最新</a>
                            <Divider type="vertical" />
                            <a style={{ color: chooseNav == 1 ? '#cd201f' : 'rgba(0, 0, 0, 0.45)' }} onClick={() => { setChooseNav(1) }}>热门</a>
                        </div>
                        <Divider />
                        <CommonContext.Provider value={data}>
                            <PoetMatesIndex />
                        </CommonContext.Provider>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <Author />
                    <div className="author-div comm-box extra">
                        <Button type="primary" icon="highlight" onClick={createWork}>前往写作</Button>
                        <Button type="primary" icon="profile">个人主页</Button>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}