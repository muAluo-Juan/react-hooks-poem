import '../styles/components/author.css'
import '../styles/pages/communitydetail.css'
import '../styles/pages/comm.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Button, Avatar } from 'antd'
import Footer from '../components/Footer'
import Author from '../components/Author'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import CommentList from '../components/CommentList'
import CommonContext from '../components/CommonContext'

export default function CommunityDetail() {
    const [work, setWork] = useState({})
    const [like, setLike] = useState(0)
    const [collect, setCollect] = useState(0)

    useEffect(() => {
        getWorkByWorkId()
    }, [])

    const getWorkByWorkId = () => {
        axios({
            method: 'get',
            url: servicePath.getWorkById + (window.location.search.split("="))[1],
            withCredentials: true
        }).then(
            res => {
                console.log(res.data.data)
                setWork(res.data.data)
            }
        )
    }

    return (
        <div>
            <Head>
                <title>夜雨时社区详情</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="community-comm-left" xs={0} sm={0} md={2} lg={2} xl={2}>
                    <div className="community-left-list">
                        <Avatar 
                            icon="like-o" 
                            size={50} 
                            style={{ color: like == 0 ? 'rgba(0, 0, 0, 0.45)' : '#cd201f', backgroundColor: 'white', cursor:"pointer" }}
                            onClick={()=>{setLike(like == 0)}}
                        />
                        <p>{work.likeNum} 点赞</p>
                        <Avatar 
                            icon="star-o" 
                            size={50} 
                            style={{ color: collect == 0 ? 'rgba(0, 0, 0, 0.45)' : '#FFA500', backgroundColor: 'white', cursor:"pointer" }}
                            onClick={()=>{setCollect(collect == 0)}}
                        />
                        <p>{work.collectNum} 收藏</p>
                        <Avatar 
                            icon="message" 
                            size={50} 
                            style={{ color: 'rgba(0, 0, 0, 0.45)', backgroundColor: 'white', cursor:"pointer" }}
                        />
                        <p>{work.commentNum} 评论</p>
                    </div>
                </Col>
                <Col className="comm-left" xs={24} sm={24} md={14} lg={14} xl={14}>
                    <div className="left-communitydetail">
                        <div className="avatar-div">
                            <div className="avatar-left-div">
                                <Avatar src={work.headPicPath} size={50} />
                                <div className="avatar-left-left-div">
                                    <div style={{ fontWeight: "bold" }}>{work.penName}</div>
                                    <div>{(new Date(work.inputTime)).toLocaleString()}</div>
                                </div>
                            </div>
                            <Button size="small" style={{ marginLeft: "0.5rem" }}>关注</Button>
                        </div>
                        <div className="work-center-content-div">
                            <h2 style={{ fontWeight: "bold" }}>{work.title}</h2>
                            <div
                                dangerouslySetInnerHTML={{ __html: work.text }}
                            ></div>
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                            <h3>评论</h3>
                            <CommonContext.Provider value={work.workId}>
                                <CommentList/>
                            </CommonContext.Provider>
                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <Author />
                    <div className="author-div comm-box extra">
                        <Button type="primary" icon="highlight">关注</Button>
                        <Button type="primary" icon="profile">他的主页</Button>
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}