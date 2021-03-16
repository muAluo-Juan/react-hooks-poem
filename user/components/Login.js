import { Button, Modal, Form, Input, Icon, message } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Login = () => {
    const [visible, setVisible] = useState(false)
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const showModal = () => {
        setVisible(true)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const handleLogin = () => {
        if(!userName){
            message.error('手机号不能为空！')
            return false
        }else if(!password){
            message.error('密码不能为空！')
            return false
        }
        let dataProps = {
            'userName':userName,
            'password':password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true,
        }).then(
            res=>{
                console.log(res.data)
            }
        )
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>登录</Button>
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
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password 
                        id="password"
                        size="large"
                        placeholder="请输入您的密码"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}}/>}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <a href="" style={{float:"right",marginBottom:"0.5rem"}}>忘记密码？去找回</a>
                </Modal>
        </div>
    )
}

export default Login