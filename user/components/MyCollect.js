import '../styles/components/worklist.css'
import { Tabs, Icon, List, Button, Avatar, message } from 'antd'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
import CommonContext from './CommonContext'
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
const MyCollect = (props) => {
    const [poemList, setPoemList] = useState([])//收藏的诗词
    const [workList, setWorkList] = useState([])//收藏的作品
    const [collectState, setCollectState] = useState(0)
    const { setKidState } = props
    const kidState = useContext(CommonContext)

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
    }, [collectState, kidState])

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

    const deleteCollection = e=>{
        // console.log(e.target.dataset.id,e.target.dataset.type)
        if(e.target.dataset.type == 0){//收藏的是诗词
            axios({
                method: 'POST',
                url: servicePath.collect + e.target.dataset.id,
                withCredentials: true,
                headers:{'token':cookie.load('token')}
            }).then(
                res=>{
                    if(res.data.code == 200){
                        message.success("已移出收藏夹")
                        setCollectState(1)
                    }else{
                        message.error("系统错误，操作失败")
                    }
                }
            )
        }else if(e.target.dataset.type == 1){
            axios({
                method: "POST",
                url: servicePath.collectWork + e.target.dataset.id,
                withCredentials: true,
                headers: { 'token': cookie.load('token') }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        message.success("已移除收藏夹")
                        setCollectState(1)
                    } else {
                        message.warn("系统错误，操作失败")
                    }
                }
            )
        }else{
            message.error("系统错误！")
        }
    }

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="诗词" key="1">
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={pagination}
                        dataSource={poemList}
                        renderItem={(item, index) => (
                            <List.Item key={item.name} style={{ cursor: "pointer" }}>
                                <div style={{ marginLeft: "1.5rem", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} data-id={item.id} onClick={gotoPoemDetail}>
                                        <div style={{ fontWeight: "bolder", marginRight: "1rem" }}>{item.name}</div>
                                        <div>{item.author} [{item.dynasty}]</div>
                                    </div>
                                    <Button data-id={item.id} data-type={0} size="small" style={{ marginRight: "1rem" }} onClick={deleteCollection}>取消收藏</Button>
                                </div>
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="作品" key="2">
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={pagination}
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
                                            <Button data-id={item.workId} data-type={1} size="small" style={{ marginRight: "1rem", float: "right" }} onClick={deleteCollection}>取消收藏</Button>
                                        </div>
                                    }
                                    description={(new Date(item.modifyTime)).toLocaleString()}
                                />
                                <h3 data-workid={item.workId} style={{ fontWeight: "bold", cursor: "pointer" }} onClick={gotoCommunityDetail}>{item.title}</h3>
                                <div style={{ marginRight: "1.5rem" }} className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                            </List.Item>
                        )}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MyCollect