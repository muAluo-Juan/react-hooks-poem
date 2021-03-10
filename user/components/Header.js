/**导航栏组件 */
import '../styles/components/header.css'
import React, { useEffect, useState } from 'react';
import { Row, Col, Menu, Icon, Button, Input } from 'antd' //使用Ant Design的24格栅格化布局
import Router from 'next/router'

const Header = () => {
    //getInitialProps不能在子组件中使用
    const { Search } = Input //搜索框
    const { SubMenu } = Menu;

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
    const [current,setCurrent] = useState('index')

    const handlerClickNav = (e) => {
        // console.log("之前的"+current)
        // setCurrent(e.key)//导航跳来跳去，未解决
        // console.log("现在的"+current)
        if(e.key == 'index')
            Router.push('/')
        else
            Router.push('/' + e.key)
    }

    useEffect(()=>{
        let pathname = window.location.pathname.replace("/","")
        if(pathname == "")
            pathname = "index"
        else if(pathname == "poemdetail")
            pathname = "poem"
        else if(pathname == "poetdetail")
            pathname = "poet"
        setCurrent(pathname)
        console.log(pathname)
    })
  
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <img className="header-logo" src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/logo.png" alt="夜雨时" />
                </Col>
                <Col xs={22} sm={22} md={8} lg={10} xl={11}>
                    <Menu mode="horizontal" selectedKeys={[current]} onClick={handlerClickNav}>
                        <Menu.Item key="index" >
                            <Icon type="home" />
                            首页
                        </Menu.Item>
                        <SubMenu
                            title={
                                <span>
                                    <Icon type="read" />
                                    诗词
                                </span>
                            }
                        >
                            <Menu.Item key="poem">诗词大全</Menu.Item>
                            <Menu.Item key="poet">诗人一览</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="community">
                            <Icon type="smile" />
                            社区
                        </Menu.Item>
                        <Menu.Item key="question">
                            <Icon type="question-circle" />
                            问答
                        </Menu.Item>
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