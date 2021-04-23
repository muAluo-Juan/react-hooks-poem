import '../styles/components/author.css'
import '../styles/pages/communitydetail.css'
import '../styles/pages/comm.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Button, Avatar, message } from 'antd'
import Footer from '../components/Footer'
import Author from '../components/Author'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import CommentList from '../components/CommentList'
import CommonContext from '../components/CommonContext'
import cookie from 'react-cookies'

export default function CommunityDetail() {
    const [work, setWork] = useState({})
    const [like, setLike] = useState(0)
    const [collect, setCollect] = useState(0)
    const [attend, setAttend] = useState(0)
    const [cookieState, setCookieState] = useState(false)
    const [comment, setComment] = useState(0)

    useEffect(() => {
        console.log("like",like,"collect",collect)
        setComment(0)
        getWorkByWorkId()
    }, [like, collect,cookieState,attend,comment])

    const getWorkByWorkId = () => {
        axios({
            method: 'get',
            url: servicePath.getWorkById + (window.location.search.split("="))[1],
            withCredentials: true,
            headers: { 'token': cookie.load('token') }
        }).then(
            res => {
                console.log(res.data.data)
                setWork(res.data.data)
            }
        )
    }

    //点赞
    function handleLike() {
        if (cookie.load('user') == undefined)
            message.warn("请先登录！")
        else {
            axios({
                method: "POST",
                url: servicePath.likeWork + work.workId,
                withCredentials: true,
                headers: { 'token': cookie.load('token') }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        setAttend(attend == 0)
                    } else {
                        message.warn("出现未知错误！")
                    }
                }
            )
        }
    }

    //收藏作品
    function handleCollect() {
        if (cookie.load('user') == undefined)
            message.warn("请先登录！")
        else {
            axios({
                method: "POST",
                url: servicePath.collectWork + work.workId,
                withCredentials: true,
                headers: { 'token': cookie.load('token') }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        setCollect(collect == 0)
                    } else {
                        message.warn("出现未知错误！")
                    }
                }
            )
        }
    }

    //关注用户
    function handleAttend(){
        if (cookie.load('user') == undefined)
            message.warn("请先登录！")
        else {
            axios({
                method: "POST",
                url: servicePath.attendUser + work.userId,
                withCredentials: true,
                headers: { 'token': cookie.load('token') }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        setAttend(attend==0)
                    } else {
                        message.warn("出现未知错误！")
                    }
                }
            )
        }
    }

    return (
        <div>
            <Head>
                <title>夜雨时社区详情</title>
            </Head>
            <Header setCookieState={setCookieState} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="community-comm-left" xs={0} sm={0} md={2} lg={2} xl={2}>
                    <div className="community-left-list">
                        <Avatar
                            icon="like-o"
                            size={50}
                            style={{ color: work.likedByLoginer ? '#cd201f' : 'rgba(0, 0, 0, 0.45)', backgroundColor: 'white', cursor: "pointer" }}
                            onClick={handleLike}
                        />
                        <p>{work.likeNum} 点赞</p>
                        <Avatar
                            icon="star-o"
                            size={50}
                            style={{ color: work.collectByLoginer ? '#FFA500' : 'rgba(0, 0, 0, 0.45)', backgroundColor: 'white', cursor: "pointer" }}
                            onClick={handleCollect}
                        />
                        <p>{work.collectNum} 收藏</p>
                        <Avatar
                            icon="message"
                            size={50}
                            style={{ color: 'rgba(0, 0, 0, 0.45)', backgroundColor: 'white', cursor: "pointer" }}
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
                                    <div>{(new Date(work.modifyTime)).toLocaleString()}</div>
                                </div>
                            </div>
                            <Button 
                                size="small" 
                                style={{ marginLeft: "0.5rem", display:work.attendAuthor==2?'none':'block' }}
                                onClick={handleAttend}
                            >
                                {work.attendAuthor==1?'取消关注':'关注'}
                            </Button>
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
                                <CommentList setComment={setComment}/>
                            </CommonContext.Provider>
                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <CommonContext.Provider value={work.userName}>
                        <Author />
                    </CommonContext.Provider>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}