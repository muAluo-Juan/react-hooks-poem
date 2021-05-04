import '../styles/components/mywork.css'
import { Divider,List } from 'antd'
import { useEffect, useState,useContext } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
import CommonContext from './CommonContext'
const pagination = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 5,
    }
const MyDraft = (props) => {
    const [draftState, setDraftState] = useState(0)
    const [listData, setListData] = useState([])
    const { setKidState } = props
    const kidState = useContext(CommonContext)
    useEffect(()=>{
        setDraftState(0)
        getDraftList()
    },[draftState,kidState])

    function getDraftList(){
        axios({
            method:"get",
            url: servicePath.getUserDraftList + cookie.load("user"),
            withCredentials: true
        }).then(res=>{
            if(res.data.code == 200){
                console.log("草稿箱",res.data.data)
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
                            <span>最近修改：{(new Date(item.modifyTime)).toLocaleString()}</span>
                        ]}
                    >
                        <div className="mywork-title">
                            <h3 data-workid={item.workId} style={{ fontWeight: "bold" }}>{item.title}</h3>
                            <div className="mywork-title-process">
                                <span style={{ color: "#cd201f" }}>删除</span>
                                <Divider type="vertical" />
                                <span style={{ color: "#108ee9" }}>编辑</span>
                            </div>
                        </div>
                        {/* <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div> */}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyDraft