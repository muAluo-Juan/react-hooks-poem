import '../styles/components/myinfo.css'
import { useEffect, useState } from 'react'
import { Avatar, Divider, Tabs, Tag, Input, Radio, DatePicker, Button, message } from 'antd'
import moment from 'moment'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'
const dateFormat = 'YYYY-MM-DD'

const MyInfo = () => {
    const [infoState, setInfoState] = useState(0)
    const [myInfo, setMyInfo] = useState({
        normaluser:{
            headPicPath:'',
            penName:'',
            sex:null,
            personalizedSig:'',
            rewardPoints:0,
            userName:'',
            birth: null
        },
        grade:'',
    })
    const [penNameValue, setPenNameValue] = useState('')
    const [personalizedSigValue, setPersonalizedSigValue] = useState('')
    const [sexValue, setSexValue] = useState(null)
    const [birthValue, setBirthValue] = useState(null)

 
    useEffect(() => {
        getMyInfo()
        setInfoState(0)
    }, [infoState])

    function getMyInfo() {
        axios({
            method:"get",
            url: servicePath.getWorkUser + cookie.load("user"),
            withCredentials: true
        }).then(res=>{
            if(res.data.code == 200){
                console.log(myInfo)
                setMyInfo(res.data.data)
                setPenNameValue(res.data.data.normaluser.penName)
                setPersonalizedSigValue(res.data.data.personalizedSig)
                setSexValue(res.data.data.normaluser.sex)
                setBirthValue(res.data.data.normaluser.birth)
            }else{
                message.error("出现未知错误！")
            }
        })
    }

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    

    return (
        <div>
            <div className="myinfo-avatar-div">
                <div>
                    <Avatar style={{ cursor: "pointer" }} src={myInfo.normaluser.headPicPath} size={100} />
                </div>
                <div className="myinfo-avatar-div-name">
                    <h2>{myInfo.normaluser.penName}</h2>
                    <Tag className="myinfo-avatar-div-tag" color="#cd201f">{myInfo.grade}</Tag>
                </div>
            </div>
            <Divider style={{marginBottom:"1.5rem"}} orientation="left">基本信息</Divider>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>用户笔名</div>
                <Input placeholder="未填写" value={myInfo.normaluser.penName} style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>个性签名</div>
                <Input placeholder="未填写" value={myInfo.normaluser.personalizedSig} style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
                <Radio.Group defaultValue={myInfo.normaluser.sex+''}>
                    <Radio.Button value="1">男</Radio.Button>
                    <Radio.Button value="0">女</Radio.Button>
                    <Radio.Button value="null">保密</Radio.Button>
                </Radio.Group>
                <div style={{ width: "7rem", marginLeft:"2.9rem" }}>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
                <DatePicker defaultValue={myInfo.normaluser.birth==null?null:moment(new Date(myInfo.normaluser.birth).toDateString(), dateFormat)} onChange={onChange} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</div>
                <div style={{color:"black"}}>{myInfo.grade}</div>
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>积&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分</div>
                <div style={{color:"black"}}>{myInfo.normaluser.rewardPoints}</div>
            </div>
            <div style={{float:"right"}}>
                <Button style={{marginRight:"1rem"}}>放弃修改</Button>
                <Button type="primary">保存修改</Button>
            </div>

            <Divider style={{marginBottom:"1.5rem"}} orientation="left">账号信息</Divider>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>用&nbsp;&nbsp;户&nbsp;&nbsp;名</div>
                <Input placeholder="未填写" disabled value={myInfo.normaluser.userName} style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</div>
                <Input disabled placeholder="未填写" type="password" value="123456" style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div style={{float:"right",marginBottom:"0.5rem"}}>
                <Button type="primary">修改密码</Button>
            </div>
        </div>
    )
}

export default MyInfo