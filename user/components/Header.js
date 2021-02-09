/**导航栏组件 */
import React,{useEffect,useState} from 'react';
import '../styles/components/header.css'
import { Row, Col, Menu, Icon } from 'antd' //使用Ant Design的24格栅格化布局
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import servicePath from '../config/apiUrl'

const Header = () => {
    //getInitialProps不能在子组件中使用
    const [navArray,setNavArray] = useState([])  //初始值为空
    useEffect(()=>{
        const fetchData = async()=>{
            const result = await axios(servicePath.getTypeInfo)
                        .then((res)=>{
                            return res.data.data
                        })
            setNavArray(result)
        }
        fetchData() //让它执行
    },[])

    const handleClickNav = (e)=>{
        //e可以获取Ant Design中的menu传递来的key值
        if(e.key == 0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <img className="header-logo" src="" alt=""/>
                    <span className="header-txt">万一努力的尽头，是你呢</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClickNav}>
                    <Menu.Item key="0">
                        <Icon type="home" />
                        首页
                    </Menu.Item>
                    {
                        navArray.map((item)=>{
                            return (
                                <Menu.Item key={item.id}>
                                    <Icon type={item.icon} />
                                    {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
export default Header