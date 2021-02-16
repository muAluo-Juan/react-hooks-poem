/**导航栏组件 */
import React, { useEffect, useState } from 'react';
import '../styles/components/header.css'
import { Row, Col, Menu, Icon, Button, Input } from 'antd' //使用Ant Design的24格栅格化布局
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import servicePath from '../config/apiUrl'

const Header = () => {
    //getInitialProps不能在子组件中使用
    const [navArray, setNavArray] = useState([
        { path: 'index', icon: 'home', typeName: '首页' },
        { path: 'poem', icon: 'read', typeName: '诗词' },
        { path: 'community', icon: 'highlight', typeName: '社区' },
        { path: 'question', icon: 'question-circle', typeName: '问答' }
    ])  //初始值为空
    const {Search} = Input //搜索框

    //待解决
    // const [nowNav,setNowNav] = useState('0')
    // useEffect(()=>{
    //     setNowNav('2')
    // },[])
    // useEffect(()=>{
    //     // const fetchData = async()=>{
    //     //     const result = await axios(servicePath.getTypeInfo)
    //     //                 .then((res)=>{
    //     //                     return res.data.data
    //     //                 })
    //     //     setNavArray(result)
    //     // }
    //     // fetchData() //让它执行
    //     setNavArray('诗词鉴赏')
    // },[])

    const handleClickNav = (e) => {
        //e可以获取Ant Design中的menu传递来的key值
        if (e.key == 'index') {
            Router.push('/')
        } else {
            Router.push('/'+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <img className="header-logo" src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/logo.png" alt="夜雨时" />
                </Col>
                <Col xs={22} sm={22} md={8} lg={10} xl={11}>
                    <Menu mode="horizontal" onClick={handleClickNav} defaultSelectedKeys={['index']}>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.path}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
                <Col xs={0} sm={0} md={14} lg={10} xl={8}>
                    <Search
                        placeholder="搜索诗词"
                        onSearch={value => console.log(value)}
                        className="search"
                    />
                    <Button type="primary">登录</Button>
                    <Button type="danger" className="btn-user">注册</Button>
                </Col>
            </Row>
        </div>
    )
}
export default Header