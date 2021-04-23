import '../styles/pages/comm.css'
import '../styles/pages/question.css'
import '../styles/components/author.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Divider, Avatar, Button, message } from 'antd'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from "../config/apiUrl"
import CommonContext from '../components/CommonContext'
import AnswerList from '../components/AnswerList'
import cookies from 'react-cookies'

export default function QuestionDetail() {
    const [cookieState, setCookieState] = useState(false)
    const [answerMates, setAnswerMates] = useState([
        { id: 1, userName: '元川居安1', adopted: 20, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 2, userName: '笑死我了好', adopted: 75, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 3, userName: '元川居安3', adopted: 30, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 4, userName: '元川居安4', adopted: 60, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 5, userName: '元川居安5', adopted: 50, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' }
    ])
    const [question, setQuestion] = useState({})
    const [likeQuestionState, setLikeQuestionState] = useState(0)
    const [attendQuestionState, setAttendQuestionState] = useState(0)
    const [answerState, setAnswerState] = useState(0)

    useEffect(() => {
        getQuestionById()
        setAnswerState(0)
    },[likeQuestionState,cookieState,attendQuestionState,answerState])

    const getQuestionById = () => {
        axios({
            method: "GET",
            url: servicePath.getQuestionById + (window.location.search.split('='))[1],
            withCredentials: true,
            headers:{'token':cookies.load('token')}
        }).then(
            res => {
                setQuestion(res.data.data)
                console.log(res.data.data)
            }
        )
    }

    function likeQuestion(){
        if(cookies.load("user") == undefined)
            message.warn("请先登录！")
        else{
            axios({
                method: "POST",
                url: servicePath.likeQuestion + (window.location.search.split('='))[1],
                withCredentials: true,
                headers:{'token':cookies.load('token')}
            }).then(
                res=>{
                    if(res.data.code == 200)
                        setLikeQuestionState(likeQuestionState==0)
                    else    
                        message.error("出现未知错误")
                }
            )
        }
    }

    function attendQuestion(){
        if(cookies.load("user") == undefined)
            message.warn("请先登录！")
        else{
            axios({
                method: "POST",
                url: servicePath.attendQuestion + (window.location.search.split('='))[1],
                withCredentials: true,
                headers:{'token':cookies.load('token')}
            }).then(
                res=>{
                    if(res.data.code == 200)
                        setAttendQuestionState(attendQuestionState==0)
                    else    
                        message.error("出现未知错误")
                }
            )
        }
    }

    return (
        <div>
            <Head>
                <title>夜雨时问答详情</title>
            </Head>
            <Header setCookieState={setCookieState}/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="common-left-content-div">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Avatar src={question.headPicPath} />
                            <span style={{ marginLeft: "0.8rem" }}>{question.penName}</span>
                            <span style={{ marginLeft: "0.8rem" }}>{(new Date(question.inputTime)).toLocaleString()}</span>
                        </div>
                        <div style={{ marginTop: "1.5rem" }}>
                            <h2 style={{ fontWeight: "bold" }}>{question.text}</h2>
                            <div style={{lineHeight:"1.7rem"}}>{question.description}</div>
                        </div>
                        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "row" }}>
                            <Button onClick={likeQuestion}>{question.likedByLoginer?'取消点赞':'点赞'} {question.likeNum}</Button>
                            <Button onClick={attendQuestion} style={{marginLeft:"0.8rem"}}>{question.attendByLoginer?'取消关注':'关注'} {question.attentionNum}</Button>
                            <Button type="primary" style={{marginLeft:"0.8rem"}}>写回答</Button>
                        </div>
                        <div style={{ marginTop: "1.5rem" }}>
                            {/* <h3>回答</h3> */}
                            <CommonContext.Provider value={[question.answers,question.isSolved,question.questionId]}>
                                <AnswerList setAnswerState={setAnswerState}/>
                            </CommonContext.Provider>
                        </div>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    {/* <div className="comm-box author-div">
                        前往<a style={{ padding: '0.3rem', textDecoration: 'none', color: '#cd201f' }}>登录</a>查看更多我的问答信息
                    </div> */}
                    <div className="comm-box rank-div">
                        <div style={{ float: "left" }}>问答榜</div>
                        <div style={{ float: "right", color: "rgba(0,0,0,0.45)", fontSize: "0.7rem" }}>被点赞次数</div>
                        <Divider />
                        {
                            answerMates.map((item, index) => {
                                return (
                                    <div className="rank-content">
                                        <div className="rank-content-left">
                                            <div className="left">{index + 1}</div>
                                            <div className="right">
                                                <Avatar src={item.avatar} size={30} />
                                                <div className="right-name"><a>{item.userName}</a></div>
                                            </div>
                                        </div>
                                        <div className="rank-content-right">
                                            {item.adopted}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}