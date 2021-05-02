import { Tabs, List, Button, Avatar, message} from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
const { TabPane } = Tabs
const MyAttention = () => {
    const [questions, setQuestions] = useState([])
    const [users, setUsers] = useState([])
    const [fans, setFans] = useState([])
    const [attentionState, setAttentionState] = useState(0)

    useEffect(()=>{
        setAttentionState(0)
        getAttentionList()
    },[attentionState])

    function getAttentionList(){
        axios({
            method: "get",
            url: servicePath.getUserAttentionList + cookie.load("user"),
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 200) {
                    console.log("关注列表",res.data.data)
                    setUsers(res.data.data[0])
                    setFans(res.data.data[1])
                    setQuestions(res.data.data[2])
                } else {
                    message.error("出现未知错误！")
                }
            }
        )
    }

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="我的关注" key="1">
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
                <TabPane tab="我的粉丝" key="2">
                    <List
                        itemLayout="horizontal"
                        dataSource={fans}
                        renderItem={item => (
                            <List.Item
                                actions={[<Button size="small">关注</Button>]}
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
            </Tabs>
        </div>
    )
}

export default MyAttention