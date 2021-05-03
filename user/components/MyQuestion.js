import { Tabs, List, Icon, Button, Tag, message } from 'antd'
import '../styles/components/myquestion.css'
import '../styles/components/mywork.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'

const { TabPane } = Tabs
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
)
const pagination = {
    onChange: page => {
        console.log(page);
    },
    pageSize: 5,
}

const MyQuestion = () => {
    const [aqState, setAqState] = useState(0)
    const [answerList, setAnswerList] = useState([])
    const [questionList, setQuestionList] = useState([])

    useEffect(()=>{
        setAqState(0)
        getAnswerList()
        getQuestionList()
    },[aqState])

    function getAnswerList(){
        axios({
            method:"get",
            url: servicePath.getUserAnswerList + cookie.load("user"),
            withCredentials: true
        }).then(
            res=>{
                if(res.data.code == 200){
                    console.log("我的回答列表",res.data.data)
                    setAnswerList(res.data.data)
                }else{
                    message.warn("出现未知错误！")
                }
            }
        )
    }

    function getQuestionList(){
        axios({
            method:"get",
            url: servicePath.getUserQuestionList + cookie.load("user"),
            withCredentials: true
        }).then(
            res=>{
                if(res.data.code == 200){
                    console.log("我的提问列表",res.data.data)
                    setQuestionList(res.data.data)
                }else{
                    message.warn("出现未知错误！")
                }
            }
        )
    }

    function gotoQuestionDetail(e) {
        window.open('/questiondetail?questionid=' + e.target.dataset.questionid, '_blank')
    }

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="我的回答" key="1">
                    <List
                        itemLayout="vertical"
                        // size="large"
                        pagination={pagination}
                        dataSource={answerList}
                        renderItem={item => (
                            <List.Item
                                key={item.questionName}
                                actions={[
                                    <IconText type="like-o" text={item.likeNum} key="list-vertical-like-o" />,
                                    <span>回答于 {(new Date(item.inputTime)).toLocaleString()}</span>,
                                    <span style={{ display: item.beAdopted ? "block" : "none" }}>该回答 <Tag color="cyan">已被采纳</Tag></span>
                                ]}
                            >
                                <div className="mywork-title">
                                    <h3 data-questionid={item.questionId} style={{ fontWeight: "bold", cursor: "pointer" }} onClick={gotoQuestionDetail}>问题：{item.questionName}</h3>
                                    <div className="mywork-title-process">
                                        <Button size="small" type="dashed">删除回答</Button>
                                    </div>
                                </div>
                                <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="我的提问" key="2">
                    <List
                        itemLayout="vertical"
                        // size="large"
                        pagination={pagination}
                        dataSource={questionList}
                        renderItem={item => (
                            <List.Item
                                key={item.questionName}
                                actions={[
                                    <IconText type="like-o" text={item.likeNum} key="list-vertical-like-o" />,
                                    <IconText type="star-o" text={item.attentionNum} key="list-vertical-star-o" />,
                                    <IconText type="message" text={item.answerNum} key="list-vertical-message" />,
                                    <span>提问于 {(new Date(item.inputTime)).toLocaleString()}</span>
                                ]}
                            >
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <h3 style={{ cursor: "pointer", fontWeight: "bold" }} data-questionid={item.questionId} onClick={gotoQuestionDetail}>{item.text}</h3>
                                        <Tag style={{marginLeft:"0.5rem",display: item.isSolved != 0 ? "block" : "none" }} color="volcano">问题已解决</Tag>
                                    </div>
                                    <div className="mywork-title-process">
                                        <Button size="small" type="dashed">删除提问</Button>
                                    </div>
                                </div>
                                <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MyQuestion