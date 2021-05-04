import '../styles/components/mywork.css'
import { Divider, Icon, List, message, Modal } from 'antd'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
import CommonContext from './CommonContext'
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

const MyWork = (props) => {
    const [workState, setWorkState] = useState(0)
    const [listData, setListData] = useState([])
    const [deletevisible, setDeleteVisible] = useState(false)
    const [deleteOne, setDeleteOne] = useState()
    const { setKidState } = props
    const kidState = useContext(CommonContext)

    function gotoCommunityDetail(e) {
        window.open('/communitydetail?workid=' + e.target.dataset.workid, '_blank')
    }

    useEffect(() => {
        setWorkState(0)
        getUserWorkList()
    }, [workState,kidState])

    function getUserWorkList() {
        axios({
            method: "get",
            url: servicePath.getUserWorkList + cookie.load("user"),
            withCredentials: true
        }).then(res => {
            if (res.data.code == 200) {
                console.log(res.data.data)
                setListData(res.data.data)
            } else {
                message.error("出现未知错误！")
            }
        })
    }

    function deleteWork(){
        console.log("要删除的是",deleteOne)
        setDeleteVisible(false)
        axios({
            method:"delete",
            url: servicePath.deleteUserWork + deleteOne,
            withCredentials: true,
            headers:{"token": cookie.load("token")}
        }).then(
            res=>{
                if(res.data.code == 200){
                    message.success("作品已移入回收站")
                    setWorkState(1)
                    setKidState(1)
                }
                else
                    message.error("出现未知错误！")
            }
        )
    }

    function cancelDeleteWork() {
        setDeleteVisible(false)
        setDeleteOne()
    }

    const gotoDelete = e=>{
        // console.log(e.target.dataset.workid)
        setDeleteOne(e.target.dataset.workid)
        setDeleteVisible(true)
    }

    const gotoModify = e=>{
        window.open('/mywork?workid='+e.target.dataset.workid,'_blank')
    }

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={pagination}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText type="like-o" text={item.likeNum} key="list-vertical-like-o" />,
                            <IconText type="star-o" text={item.collectNum} key="list-vertical-star-o" />,
                            <IconText type="message" text={item.commentNum} key="list-vertical-message" />,
                            <span>最近修改：{(new Date(item.modifyTime)).toLocaleString()}</span>
                        ]}
                    >
                        <div className="mywork-title">
                            <h3 data-workid={item.workId} style={{ fontWeight: "bold", cursor: "pointer" }} onClick={gotoCommunityDetail}>{item.title}</h3>
                            <div className="mywork-title-process">
                                <span data-workid={item.workId} style={{ color: "#cd201f" }} onClick={gotoDelete}>删除</span>
                                <Divider type="vertical" />
                                <span data-workid={item.workId} style={{ color: "#108ee9" }} onClick={gotoModify}>修改</span>
                            </div>
                            <Modal
                                title="删除作品"
                                visible={deletevisible}
                                onOk={deleteWork}
                                onCancel={cancelDeleteWork}
                                okText="确认"
                                cancelText="取消"
                            >
                                <p>确认删除作品吗？删除后的作品将移入回收站。</p>
                            </Modal>
                        </div>
                        <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyWork