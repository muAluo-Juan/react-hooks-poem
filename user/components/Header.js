/**导航栏组件 */
import '../styles/components/header.css'
import React, { useEffect, useState } from 'react';
import { Row, Col, Menu, Icon, Button, Input, Avatar } from 'antd' //使用Ant Design的24格栅格化布局
import Router from 'next/router'
import Login from './Login';
import Register from './Register';

const Header = (props) => {
    //getInitialProps不能在子组件中使用
    const { Search } = Input //搜索框
    const { SubMenu } = Menu;
    const [registerDisplay, setRegisterDisplay] = useState("block")
    const { setCookieState } = props
    const [current, setCurrent] = useState('index')

    const handlerClickNav = (e) => {
        if (e.key == 'index')
            Router.push('/')
        else
            Router.push('/' + e.key)
    }

    useEffect(() => {
        let pathname = window.location.pathname.replace("/", "")
        if (pathname == "")
            pathname = "index"
        else if (pathname == "poemdetail")
            pathname = "poem"
        else if (pathname == "poetdetail")
            pathname = "poet"
        else if (pathname == "communitydetail")
            pathname = "community"
        else if (pathname == "creatework")
            pathname = "community"
        else if (pathname == "questiondetail")
            pathname = "question"
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
                    <div style={{ float: "right", display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Login setRegisterDisplay={setRegisterDisplay} setCookieState={setCookieState} />
                        <Register registerDisplay={registerDisplay} />
                        <Search
                            placeholder="搜索诗词"
                            onSearch={value => console.log(value)}
                            className="search"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Header