import cookie from 'react-cookies'
import { Button, Modal, Input, Icon, message, Avatar, Menu, Dropdown } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Router from 'next/router'
const { Search } = Input

const Login = (props) => {
    const [visible, setVisible] = useState(false)
    const [penName, setPenName] = useState('')
    const [headPicPath, setHeadPicPath] = useState('')
    const [findVisible1, setFindVisible1] = useState(false)
    const [findVisible2, setFindVisible2] = useState(false)
    const [findVisible3, setFindVisible3] = useState(false)
    const [userName, setUserName] = useState('')
    const [findUserName, setFindUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const [loginDisplay, setLoginDisplay] = useState("block")
    const [avatarDisplay, setAvatarDisplay] = useState("none")
    const [enterButton, setEnterButton] = useState('发送验证码')
    const [canSent, setCanSent] = useState(true)
    const [code, setCode] = useState('')
    const [inputCode, setInputCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let count = 30
    const { setRegisterDisplay } = props
    const {setCookieState} = props

    useEffect(() => {
        let userName = cookie.load("user")
        let token = cookie.load("token")
        if (userName != undefined && token != undefined && headPicPath != undefined && penName != undefined) {
            setVisible(false)
            setLoginDisplay("none")
            setRegisterDisplay("none")
            setAvatarDisplay("block")
            setHeadPicPath(cookie.load("headpicpath"))
            setPenName(cookie.load("penname"))
            setCookieState(true)
        }else{
            setLoginDisplay("block")
            setRegisterDisplay("block")
            setAvatarDisplay("none")
            setCookieState(false)
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
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 200) {
                    setUserData(res.data.data[0])
                    setHeadPicPath(res.data.data[0].headPicPath)
                    setPenName(res.data.data[0].penName)
                    setVisible(false)
                    setLoginDisplay("none")
                    setRegisterDisplay("none")
                    setAvatarDisplay("block")
                    cookie.save('user', res.data.data[0].userName, { path: '/' })
                    cookie.save('token', res.data.data[1], { path: '/' })
                    cookie.save('penname',res.data.data[0].penName, { path: '/' })
                    cookie.save('headpicpath',res.data.data[0].headPicPath, { path: '/' })
                    setCookieState(true)
                    message.success(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            }
        )
    }

    const menu = (
        <Menu onClick={handleMenuClick} style={{ padding: "1rem" }}>
            <h3 style={{ textAlign: "center", fontWeight: "bold", paddingLeft: "0.7rem", paddingRight: "0.7rem" }}>{penName}</h3>
            <Menu.Item key="1" size="large">
                <Icon type="highlight" />
            去写作
          </Menu.Item>
            <Menu.Item key="2" size="large">
                <Icon type="profile" />
            个人主页
          </Menu.Item>
            <Menu.Item key="3" size="large">
                <Icon type="export" />
            退出登录
          </Menu.Item>
        </Menu>
    )

    function handleMenuClick(e) {
        if(e.key == 1){
            message.success("去写作页面")
        }else if(e.key == 2){
            Router.push("/my")
        }
        else if(e.key == 3) {
            message.success('登出成功');
            cookie.remove("user")
            cookie.remove("token")
            cookie.remove("penname")
            cookie.remove("headpicpath")
            setCookieState(false)
            setLoginDisplay("block")
            setRegisterDisplay("block")
            setAvatarDisplay("none")
        }else{
            message.error("出现未知错误！")
        }
    }

    function findPwd() {
        setVisible(false)
        setFindVisible1(true)
    }

    const handleFindCancel1 = () => {
        setFindVisible1(false)
    }

    const handleFindCancel2 = () => {
        setFindVisible2(false)
    }

    const handleFindCancel3 = () => {
        setFindVisible3(false)
    }

    const handleNext = () => {
        axios({
            method: "GET",
            url: servicePath.judgeUserExist + findUserName,
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 201) {
                    message.warn("该手机号未注册！")
                } else if (res.data.code == 200) {
                    setFindVisible1(false)
                    setFindVisible2(true)
                }
            }
        )
    }

    const handleNext2 = () => {
        if(code == inputCode){
            setFindVisible2(false)
        setFindVisible3(true)
        }else{
            message.warn("验证码错误！")
        }
    }

    function handleFindPwd() {
        if (newPassword == '' || confirmPassword == '')
            message.warn("请输入完整的信息！")
        else if (newPassword != confirmPassword)
            message.warn("确认密码不一致！")
        else {
            let dataProps = {
                userName: findUserName,
                password: newPassword
            }
            axios({
                method: "POST",
                url: servicePath.checkFindPwd,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    if (res.data.code == 200) {
                        message.success("密码修改成功，可以登录啦！")
                        setFindVisible3(false)
                        setVisible(true)
                    } else {
                        message.error("出错，密码重置失败！")
                    }
                }
            )
        }
    }

    function countdown() {
        setCanSent(false)
        if (count <= 1) {
            setEnterButton("重发验证码")
            count = 30
            setCanSent(true)
        } else {
            setEnterButton(count + "秒后重发")
            // let temp = count
            count--
            // console.log('temp',temp)
            console.log('count', count)
            setTimeout(() => { countdown() }, (1000))
        }
    }

    function canNotSendCode() {
        message.warn(enterButton)
    }

    function sendCode() {
        axios({
            method: "GET",
            url: servicePath.getCode,
            withCredentials: true
        }).then(
            res => {
                if (res.data.code == 200) {
                    message.success("您的验证码为：" + res.data.data)
                    setCode(res.data.data)
                    countdown()
                }
            }
        )
    }

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ display: loginDisplay }}>登录</Button>
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
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <br /><br />
                <a style={{ float: "right", marginBottom: "0.5rem" }} onClick={findPwd}>忘记密码？去找回</a>
            </Modal>
            <Dropdown overlay={menu} placement="bottomCenter">
                <Avatar src={headPicPath} size={42} style={{ display: avatarDisplay }} />
            </Dropdown>
            <Modal
                visible={findVisible1}
                title="找回密码"
                okText="下一步"
                cancelText="取消"
                onCancel={handleFindCancel1}
                onOk={handleNext}
                width="430px"
            >
                <Input
                    id="userName"
                    size="large"
                    placeholder="请输入您的手机号"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setFindUserName(e.target.value) }}
                />
            </Modal>
            <Modal
                visible={findVisible2}
                title="找回密码"
                okText="下一步"
                cancelText="取消"
                onCancel={handleFindCancel2}
                onOk={handleNext2}
                width="430px"
            >
                <Search
                    placeholder="请输入验证码"
                    enterButton={enterButton}
                    size="large"
                    onSearch={canSent == true ? sendCode : canNotSendCode}
                    onChange={(e) => { setInputCode(e.target.value) }}
                />
            </Modal>
            <Modal
                visible={findVisible3}
                title="找回密码"
                okText="确认重置"
                cancelText="取消"
                onCancel={handleFindCancel3}
                onOk={handleFindPwd}
                width="430px"
            >
                <Input.Password
                    id="password"
                    size="large"
                    placeholder="密码"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setNewPassword(e.target.value) }}
                />
                <br/><br/>
                <Input.Password
                    id="confirmPassword"
                    size="large"
                    placeholder="确认密码"
                    prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
            </Modal>
        </div>
    )
}

export default Login