import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/articleList.css'
const { confirm } = Modal //解构

function ArticleList(props) {
    const [list, setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(
            res => {
                setList(res.data.data)
            }
        )
    }

    //删除文章
    const deleteArticle = (id) => {
        //确认是否删除
        confirm({
            title: '确定删除博客吗？',
            content: '如果你点击OK按钮，文章将永远被删除，无法恢复',
            onOk() {
                axios(
                    servicePath.deleteArticle+id,{withCredentials:true}
                ).then(
                    res => {
                        message.success('文章删除成功')
                        getList()
                    }
                )
            },onCancel(){
                message.success('取消删除成功')
            }
        }) 
    }

    //修改文章的跳转方法
    const updateArticle = (id)=>{
        props.history.push('/index/add/' + id)
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;
                                <Button onClick={()=>{deleteArticle(item.id)}}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList