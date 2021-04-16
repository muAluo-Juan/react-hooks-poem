import '../styles/pages/comm.css'
import '../styles/pages/question.css'
import '../styles/components/author.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Divider, Avatar, Input, Button, Tabs, Radio } from 'antd'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import LazyQuestionList from '../components/LazyQuestionList'
import axios from 'axios'
import servicePath from "../config/apiUrl"
import CommonContext from '../components/CommonContext'

export default function Question() {
    const [answerMates, setAnswerMates] = useState([
        { id: 1, userName: '元川居安1', adopted: 20, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 2, userName: '笑死我了好', adopted: 75, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 3, userName: '元川居安3', adopted: 30, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 4, userName: '元川居安4', adopted: 60, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 5, userName: '元川居安5', adopted: 50, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' }
    ])
    const { Search } = Input
    const [choose,setChoose] = useState("a")
    const [questionList,setQuestionList] = useState([])
    useEffect(()=>{
        if(choose == "a"){
            getHotQuestions()
        }else if(choose == "b"){
            getNosolvedQuestions()
        }else if(choose == "c"){
            getSolvedQuestions()
        }
    },[choose])

    const getHotQuestions = ()=>{
        axios({
            method: 'GET',
            url: servicePath.getHotQuestionList,
            withCredentials: true
        }).then(
            res=>{
                setQuestionList(res.data.data)
            }
        )
    }

    const getNosolvedQuestions = ()=>{
        axios({
            method: 'GET',
            url: servicePath.getNoSolvedQuestionList,
            withCredentials: true
        }).then(
            res=>{
                setQuestionList(res.data.data)
            }
        )
    }

    const getSolvedQuestions = ()=>{
        axios({
            method: 'GET',
            url: servicePath.getSolvedQuestionList,
            withCredentials: true
        }).then(
            res=>{
                setQuestionList(res.data.data.slice(0,10))
            }
        )
    }

    return (
        <div>
            <Head>
                <title>夜雨时问答专区</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="common-left-content-div">
                        <div className="search-add-question">
                            <Search className="input-question" placeholder="输入搜索内容" onSearch={value => console.log(value)} enterButton />
                            <Button className="add-question" type="primary">提问</Button>
                        </div>
                        <div style={{ marginTop: "1.5rem",marginBottom:"1rem" }}>
                            <Radio.Group defaultValue={choose} buttonStyle="solid">
                                <Radio.Button value="a" onClick={()=>{setChoose("a")}}>人气问题</Radio.Button>
                                <Radio.Button value="b" onClick={()=>{setChoose("b")}}>未解决</Radio.Button>
                                <Radio.Button value="c" onClick={()=>{setChoose("c")}}>已解决</Radio.Button>
                            </Radio.Group>
                        </div>
                        <Divider/>
                        <CommonContext.Provider value={questionList}>
                            <LazyQuestionList />
                        </CommonContext.Provider>
                        <Divider/>
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    <div className="comm-box author-div">
                        前往<span style={{ paddingLeft: '0.3rem', paddingRight: '0.3rem', color: '#cd201f' }}>登录</span>查看更多我的问答信息
                    </div>
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