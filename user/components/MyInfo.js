import '../styles/components/myinfo.css'
import { useEffect, useContext, useState } from 'react'
import { Avatar, Divider, Tabs, Tag, Input, Radio, DatePicker, Button } from 'antd'
import CommonContext from './CommonContext'
const { TabPane } = Tabs
const { TextArea } = Input

const MyInfo = () => {
    const [infoState, setInfoState] = useState(0)

    useEffect(() => {
        getMyInfo()
    }, [infoState])

    function getMyInfo() {

    }

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div>
            <div className="myinfo-avatar-div">
                <div>
                    <Avatar style={{ cursor: "pointer" }} src="https://gitee.com/muAluo/rainyNightPoemsVue/raw/master/img/w3.jpg" size={100} />
                </div>
                <div className="myinfo-avatar-div-name">
                    <h2>元川居安</h2>
                    <Tag className="myinfo-avatar-div-tag" color="#cd201f">秀才</Tag>
                </div>
            </div>
            {/* <span style={{fontWeight:"bold",marginBottom:"1.5rem"}}>基本信息</span> */}
            <Divider style={{marginBottom:"1.5rem"}} orientation="left">基本信息</Divider>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>用户笔名</div>
                <Input placeholder="未填写" value="元川居安" style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>个性签名</div>
                <Input placeholder="未填写" value="有什么资格谈自由" style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
                <Radio.Group defaultValue="c">
                    <Radio.Button value="a">男</Radio.Button>
                    <Radio.Button value="b">女</Radio.Button>
                    <Radio.Button value="c">保密</Radio.Button>
                </Radio.Group>
                <div style={{ width: "7rem", marginLeft:"2.9rem" }}>生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</div>
                <DatePicker onChange={onChange} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>等&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级</div>
                <div style={{color:"black"}}>秀才</div>
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>积&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分</div>
                <div style={{color:"black"}}>156</div>
            </div>
            <div style={{float:"right"}}>
                <Button style={{marginRight:"1rem"}}>放弃修改</Button>
                <Button type="primary">保存修改</Button>
            </div>

            {/* <span style={{fontWeight:"bold",marginBottom:"1.5rem"}}>账号信息</span> */}
            <Divider style={{marginBottom:"1.5rem"}} orientation="left">账号信息</Divider>
            {/* <Divider style={{marginBottom:"1.5rem"}}/> */}
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>用&nbsp;&nbsp;户&nbsp;&nbsp;名</div>
                <Input placeholder="未填写" disabled value="15979510879" style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div className="myinfo-input">
                <div style={{ width: "7rem" }}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</div>
                <Input placeholder="未填写" type="password" value="123456" style={{ color: "black", width: "30.5rem", height: "2.2rem" }} />
            </div>
            <div style={{float:"right",marginBottom:"0.5rem"}}>
                <Button style={{marginRight:"1rem"}}>放弃修改</Button>
                <Button type="primary">保存修改</Button>
            </div>
        </div>
    )
}

export default MyInfo