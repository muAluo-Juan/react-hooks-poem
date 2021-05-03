import { Tabs, List, Button, Avatar, message, Tag, Icon } from 'antd'
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
const MyAttention = () => {
    const [questions, setQuestions] = useState([])
    const [users, setUsers] = useState([])
    const [attentionState, setAttentionState] = useState(0)

    useEffect(() => {
        setAttentionState(0)
        getAttentionList()
    }, [attentionState])

    function getAttentionList() {
        axios({
            method: "get",
            url: servicePath.getUserAttentionList + cookie.load("user"),
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 200) {
                    console.log("关注列表", res.data.data)
                    setUsers(res.data.data[0])
                    setQuestions(res.data.data[1])
                } else {
                    message.error("出现未知错误！")
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
                <TabPane tab="用户" key="1">
                    <List
                        itemLayout="horizontal"
                        dataSource={users}
                        renderItem={item => (
                            <List.Item
                                actions={[<Button size="small">取消关注</Button>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.headPicPath} />}
                                    title={<a>{item.penName}</a>}
                                    description={item.personalizedSig}
                                />
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="问题" key="2">
                    <List
                        itemLayout="vertical"
                        pagination={pagination}
                        dataSource={questions}
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
                                        <Tag style={{ marginLeft: "0.5rem", display: item.isSolved != 0 ? "block" : "none" }} color="volcano">问题已解决</Tag>
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

export default MyAttention