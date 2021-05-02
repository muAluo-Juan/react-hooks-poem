import '../styles/components/worklist.css'
import { Tabs, Menu, Icon, List, Button, Avatar, message } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'

const { TabPane } = Tabs
const { SubMenu } = Menu
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
)
const MyCollect = () => {
    const [openKeys, setOpenKeys] = useState(['sub1'])
    const [poemList, setPoemList] = useState([])//收藏的诗词
    const [workList, setWorkList] = useState([])//收藏的作品
    const [collectState, setCollectState] = useState(0)

    const rootSubmenuKeys = ['sub1', 'sub2']
    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(openKeys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    }

    function gotoCommunityDetail(e) {
        window.open('/communitydetail?workid=' + e.target.dataset.workid, '_blank')
    }

    function gotoPoemDetail(e) {
        // console.log(e.currentTarget.dataset.id)
        window.open('/poemdetail?id=' + e.currentTarget.dataset.id, '_blank')
    }

    useEffect(() => {
        setCollectState(0)
        getCollectionList()
    },[collectState])

    function getCollectionList() {
        axios({
            method: "get",
            url: servicePath.getUserCollectionList + cookie.load("user"),
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 200) {
                    console.log(res.data.data)
                    setPoemList(res.data.data[0])
                    setWorkList(res.data.data[1])
                } else {
                    message.error("出现未知错误！")
                }
            }
        )
    }

    return (
        <div>
            <Menu
                defaultSelectedKeys={['1', '2']}
                mode="vertical"
            >
                <Menu.Item key="1" >诗词</Menu.Item>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={poemList}
                    renderItem={(item, index) => (
                        <List.Item key={item.name} style={{ cursor: "pointer" }}>
                            <div style={{ marginLeft: "1.5rem", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}  data-id={item.id} onClick={gotoPoemDetail}>
                                    <div style={{ fontWeight: "bolder", marginRight: "1rem" }}>{item.name}</div>
                                    <div>{item.author} [{item.dynasty}]</div>
                                </div>
                                <Button size="small" style={{ marginRight: "1rem" }}>取消收藏</Button>
                            </div>
                        </List.Item>
                    )}
                />
                <Menu.Item key="2">作品</Menu.Item>
                <List
                    itemLayout="vertical"
                    size="large"
                    style={{ marginLeft: "1.5rem" }}
                    dataSource={workList}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type="like-o" text={item.likeNum} key="list-vertical-like-o" />,
                                <IconText type="star-o" text={item.collectNum} key="list-vertical-star-o" />,
                                <IconText type="message" text={item.commentNum} key="list-vertical-message" />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.headPicPath} size={40} />}
                                title={
                                    <div>
                                        <span>{item.penName}</span>
                                        <Button size="small" style={{ marginRight: "1rem", float: "right" }}>取消收藏</Button>
                                    </div>
                                }
                                description={(new Date(item.modifyTime)).toLocaleString()}
                            />
                            <h3 data-workid={item.workId} style={{ fontWeight: "bold", cursor: "pointer" }} onClick={gotoCommunityDetail}>{item.title}</h3>
                            <div style={{ marginRight: "1.5rem" }} className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                        </List.Item>
                    )}
                />
            </Menu>
        </div>
    )
}

export default MyCollect