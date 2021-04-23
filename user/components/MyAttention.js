import { Tabs, List, Button, Avatar} from 'antd'
import { useState } from 'react'
const { TabPane } = Tabs
const MyAttention = () => {
    const [list, setList] = useState([])
    const [attention, setAttention] = useState([
        {
            headPicPath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            penName:"元川居安",
            personalSig:"有什么资格谈自由"
        },{
            headPicPath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            penName:"元川居安",
            personalSig:"有什么资格谈自由"
        },{
            headPicPath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            penName:"元川居安",
            personalSig:"有什么资格谈自由"
        },
    ])
    const [fans, setFans] = useState([
        {
            headPicPath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            penName:"元川居安",
            personalSig:"有什么资格谈自由"
        },
        {
            headPicPath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            penName:"元川居安",
            personalSig:"有什么资格谈自由"
        },
        {
            headPicPath:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            penName:"元川居安",
            personalSig:"有什么资格谈自由"
        },
    ])
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="我的关注" key="1">
                <List
                        itemLayout="horizontal"
                        dataSource={attention}
                        renderItem={item => (
                            <List.Item
                            actions={[<Button size="small">取消关注</Button>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.headPicPath} />}
                                    title={<a href="https://ant.design">{item.penName}</a>}
                                    description={item.personalSig}
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
                                    title={<a href="https://ant.design">{item.penName}</a>}
                                    description={item.personalSig}
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