import '../styles/components/mywork.css'
import { Divider,List } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
const pagination = {
    onChange: page => {
        console.log(page);
    },
    pageSize: 5,
}
const MyRecycle = () => {
    
    const [listData, setListData] = useState([])
    const [recycleState, setRecycleState] = useState(0)

    useEffect(()=>{
        setRecycleState(0)
        getDraftList()
    },[recycleState])

    function getDraftList(){
        axios({
            method:"get",
            url: servicePath.getUserRecycleList + cookie.load("user"),
            withCredentials: true
        }).then(res=>{
            if(res.data.code == 200){
                console.log("回收站",res.data.data)
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
                            <span>回收于{(new Date(item.modifyTime)).toLocaleString()}</span>
                        ]}
                    >
                        <div className="mywork-title">
                            <h3 data-workid={item.workId} style={{ fontWeight: "bold" }}>{item.title}</h3>
                            <div className="mywork-title-process">
                                <span style={{ color: "#cd201f" }}>删除</span>
                                <Divider type="vertical" />
                                <span style={{ color: "#108ee9" }}>恢复</span>
                            </div>
                        </div>
                        {/* <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div> */}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyRecycle