import '../styles/components/author.css'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Divider, Badge } from 'antd'
import cookie from 'react-cookies'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import CommonContext from './CommonContext'


const Author = () => {
    const userName = useContext(CommonContext)
    const [loginUser, setLoginUser] = useState({
        normaluser:{
            headPicPath:'',
            userName:'',
            personalizedSig:'',
            score:0
        },
        grade:'',
        fans:0,
        workNum:0
    })
    useEffect(()=>{
        console.log(userName)
        if(!(userName == '')){
            axios({
                method: 'GET',
                url: servicePath.getWorkUser + userName,
                withCredentials: true,
                headers:{'token':cookie.load('token')}
            }).then(
                res=>{
                    console.log(res.data)
                    if(res.data.code == 200){
                        console.log(res.data.data)
                        setLoginUser(res.data.data)
                    }
                }
            )
        }
    },[userName])

    return (
        <div className="author-div comm-box">
            <div className="author-avatar">
                <Badge count={loginUser.grade}><Avatar size={100} src={loginUser.normaluser.headPicPath} /></Badge>
            </div>
            <div>{loginUser.normaluser.penName}</div>
            <div className="author-introduction">
                {loginUser.normaluser.personalizedSig}
            </div>
            <Divider />
            <span className="author-message">
                <span><p>{loginUser.normaluser.rewardPoints}</p><p style={{ color: '#999' }}>积分</p></span>
                <span><p>{loginUser.fans}</p><p style={{ color: '#999' }}>粉丝</p></span>
                <span><p>{loginUser.workNum}</p><p style={{ color: '#999' }}>作品</p></span>
            </span>
        </div>
    )
}

export default Author
