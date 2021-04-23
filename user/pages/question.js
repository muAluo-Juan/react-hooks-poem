import '../styles/pages/comm.css'
import '../styles/pages/question.css'
import '../styles/components/author.css'
import Head from 'next/head'
import Header from '../components/Header'
import { Row, Col, Divider, Avatar, Input, Button, Radio, Modal, message } from 'antd'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import LazyQuestionList from '../components/LazyQuestionList'
import axios from 'axios'
import servicePath from "../config/apiUrl"
import CommonContext from '../components/CommonContext'
import cookie from 'react-cookies'

export default function Question() {
    const [cookieState, setCookieState] = useState(false)
    const { TextArea } = Input
    const [visible, setVisible] = useState(false)
    const [answerMates, setAnswerMates] = useState([
        { id: 1, userName: '元川居安1', adopted: 20, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 2, userName: '笑死我了好', adopted: 75, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 3, userName: '元川居安3', adopted: 30, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 4, userName: '元川居安4', adopted: 60, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' },
        { id: 5, userName: '元川居安5', adopted: 50, avatar: 'https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/yeyv1.jpg' }
    ])
    const { Search } = Input
    const [choose, setChoose] = useState("a")
    const [questionList, setQuestionList] = useState([])
    const [textValue, setTextValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const [addQsState, setAddQsState] = useState(0)
    const [showSearchQuestion, setShowSearchQuestion] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (choose == "a") {
            getHotQuestions()
        } else if (choose == "b") {
            getNosolvedQuestions()
        } else if (choose == "c") {
            getSolvedQuestions()
        }else if(choose == "d"){
            getSearchQuestions()
        }
    },[choose,addQsState])

    const getHotQuestions = () => {
        axios({
            method: 'GET',
            url: servicePath.getHotQuestionList,
            withCredentials: true
        }).then(
            res => {
                setQuestionList(res.data.data)
            }
        )
    }

    const getNosolvedQuestions = () => {
        axios({
            method: 'GET',
            url: servicePath.getNoSolvedQuestionList,
            withCredentials: true
        }).then(
            res => {
                setQuestionList(res.data.data)
            }
        )
    }

    const getSolvedQuestions = () => {
        axios({
            method: 'GET',
            url: servicePath.getSolvedQuestionList,
            withCredentials: true
        }).then(
            res => {
                setQuestionList(res.data.data.slice(0, 10))
            }
        )
    }

    const getSearchQuestions = ()=>{
        console.log("searchValue",searchValue)
        axios({
            method: "GET",
            url: servicePath.searchQuestion + searchValue,
            withCredentials: true
        }).then(
            res=>{
                if(res.data.code == 200)
                    setQuestionList(res.data.data)
                else
                    message.error("出现未知错误")
            }
        )
    }

    const showModal = () => {
        if (cookie.load("user") == undefined) {
            message.warn("请先登录！")
        } else {
            setVisible(true)
        }
    }

    const handleOk = e => {
        if (cookie.load("user") == undefined) {
            message.warn("请先登录！")
        } else {
            let dataProps={
                text: textValue,
                description: descriptionValue
            }
            // console.log("textvalue",dataProps.textValue)
            // console.log("descriptionValue",dataProps.descriptionValue)
            axios({
                method: "POST",
                url: servicePath.addQuestion,
                withCredentials: true,
                data: dataProps,
                headers: {"token": cookie.load("token")}
            }).then(
                res=>{
                    if(res.data.code == 200){
                        setVisible(false)
                        //提问成功跳转到该问题详情页
                        message.success("提问成功！")
                        setAddQsState(addQsState==0)
                        setDescriptionValue('')
                        setTextValue('')
                    }else{
                        message.error("提问失败，出现未知错误")
                    }
                }
            )
        }
    };

    const handleCancel = e => {
        setVisible(false)
    };

    function searchQuestion(){
        setShowSearchQuestion(true)
        setChoose('d')
    }

    function cancleSearch(){
        setShowSearchQuestion(false)
        setChoose('a')
        setSearchValue('')
    }

    return (
        <div>
            <Head>
                <title>夜雨时问答专区</title>
            </Head>
            <Header setCookieState={setCookieState} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
                    <div className="common-left-content-div">
                        <div className="search-add-question">
                            <Search className="input-question" placeholder="输入搜索内容" value={searchValue} onChange={e=>{setSearchValue(e.target.value)}} onSearch={searchQuestion} enterButton />
                            <Button className="add-question" type="primary" onClick={showModal}>提问</Button>
                            <Modal
                                title="提问"
                                visible={visible}
                                okText="提交"
                                cancelText="取消"
                                onOk={handleOk}
                                onCancel={handleCancel}
                            >
                                <p>标题</p>
                                <Input placeholder="请输入问题的简要描述" value={textValue} onChange={e=>{setTextValue(e.target.value)}}/><br/>
                                <p style={{marginTop:"1rem"}}>内容</p>
                                <TextArea rows={4} placeholder="请描述问题的具体情况" value={descriptionValue} onChange={e=>setDescriptionValue(e.target.value)}/>
                            </Modal>
                        </div>
                        <div style={{ display:showSearchQuestion?"none":"block",marginTop: "1.5rem", marginBottom: "1rem" }}>
                            <Radio.Group defaultValue={choose} buttonStyle="solid">
                                <Radio.Button value="a" onClick={() => { setChoose("a") }}>人气问题</Radio.Button>
                                <Radio.Button value="b" onClick={() => { setChoose("b") }}>未解决</Radio.Button>
                                <Radio.Button value="c" onClick={() => { setChoose("c") }}>已解决</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{ marginTop:"1.5rem",display:showSearchQuestion?"block":"none"}}>
                            搜索结果如下：<a onClick={cancleSearch}>取消搜索</a>
                        </div>
                        <Divider />
                        <CommonContext.Provider value={questionList}>
                            <LazyQuestionList />
                        </CommonContext.Provider>
                        <Divider />
                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={5} lg={5} xl={5}>
                    {/* <div className="comm-box author-div">
                        前往<span style={{ paddingLeft: '0.3rem', paddingRight: '0.3rem', color: '#cd201f' }}>登录</span>查看更多我的问答信息
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