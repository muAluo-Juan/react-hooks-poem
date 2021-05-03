import { Tabs, List, Button, Avatar, message, Tag, Icon } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'

const MyFans = () => {
    const [fans, setFans] = useState([])
    const [fansState, setFansState] = useState(0)

    useEffect(() => {
        setFansState(0)
        getFansList()
    }, [fansState])

    function getFansList() {
        axios({
            method: "get",
            url: servicePath.getUserFanList + cookie.load("user"),
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 200) {
                    console.log("粉丝列表", res.data.data)
                    setFans(res.data.data)
                } else {
                    message.error("出现未知错误！")
                }
            }
        )
    }

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={fans}
                renderItem={item => (
                    <List.Item
                        actions={[<Button size="small" type={item.beAttented==true?"default":"primary"}>{item.beAttented==true?"互相关注":"关注"}</Button>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.normaluser.headPicPath} size={40}/>}
                            title={<a>{item.normaluser.penName}</a>}
                            description={item.normaluser.personalizedSig}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyFans