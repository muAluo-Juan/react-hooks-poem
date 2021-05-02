import '../styles/components/mywork.css'
import { Divider, Icon, List, message } from 'antd'
import { useEffect, useState } from 'react'
import axio from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
)

const MyWork = () => {
    const pagination = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 5,
    }

    const [workState, setWorkState] = useState(0)

    const [listData, setListData] = useState([])

    function gotoCommunityDetail(e) {
        window.open('/communitydetail?workid=' + e.target.dataset.workid, '_blank')
    }

    useEffect(()=>{
        getUserWorkList()
        setWorkState(0)
    },[workState])

    function getUserWorkList(){
        axio({
            method:"get",
            url: servicePath.getUserWorkList + cookie.load("user"),
            withCredentials: true
        }).then(res=>{
            if(res.data.code == 200){
                console.log(res.data.data)
                setListData(res.data.data)
            }else{
                message.error("出现未知错误！")
            }
        })
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
                                <span style={{color:"#cd201f"}}>删除</span>
                                <Divider type="vertical" />
                                <span style={{color:"#108ee9"}}>修改</span>
                            </div>
                        </div>
                        <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyWork