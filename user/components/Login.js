import cookie from 'react-cookies'
import { Button, Modal, Form, Input, Icon, message, Avatar } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Login = (props) => {
    const [visible, setVisible] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const [loginDisplay,setLoginDisplay] = useState("block")
    const [avatarDisplay,setAvatarDisplay] = useState("none")
    const {setRegisterDisplay} = props

    useEffect(()=>{
        let userName = cookie.load("user")
        let token = cookie.load("token")
        if(userName != undefined && token != undefined){
            setVisible(false)
            setLoginDisplay("none")
            setRegisterDisplay("none")
            setAvatarDisplay("block")
        }
    })

    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setUserName('')
        setPassword('')
        setVisible(false)
    }
    const handleLogin = () => {
        if (!userName) {
            message.error('手机号不能为空！')
            return false
        } else if (!password) {
            message.error('密码不能为空！')
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true,
        }).then(
            res => {
                if (res.data.code == 200) {
                    setUserData(res.data.data[0])
                    setVisible(false)
                    setLoginDisplay("none")
                    setRegisterDisplay("none")
                    setAvatarDisplay("block")
                    message.success(res.data.message)
                    cookie.save('user', res.data.data[0].userName, { path: '/' })
                    cookie.save('token', res.data.data[1], { path: '/' })
                } else {
                    message.error(res.data.message)
                }
            }
        )
    }

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{display:loginDisplay}}>登录</Button>
            <Modal
                visible={visible}
                title="账密登录"
                okText="登录"
                cancelText="取消"
                onCancel={handleCancel}
                onOk={handleLogin}
                width="430px"
            >
                <Input
                    id="userName"
                    size="large"
                    placeholder="请输入您的手机号"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setUserName(e.target.value) }}
                />
                <br /><br />
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="请输入您的密码"
                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <br /><br />
                <a href="" style={{ float: "right", marginBottom: "0.5rem" }}>忘记密码？去找回</a>
            </Modal>
            <Avatar src={userData.headPicPath} size={42} style={{display:avatarDisplay}}/>
        </div>
    )
}

export default Login