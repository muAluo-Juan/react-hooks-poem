/**增加文章组件 */
import React, { useState,useEffect } from 'react';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'

import marked from 'marked'
import axios from 'axios'
import servicePath from '../config/apiUrl'

import '../static/css/addArticle.css'

const { Option } = Select  //下拉列表中的每一项
const { TextArea } = Input //多行文本框

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类别') //选择的文章类别

    useEffect(()=>{
        getTypeInfo()
        let tmpId = props.match.params.id
        if(tmpId){
            setArticleId(tmpId)//必须做
            getArticleById(tmpId)
        }
    },[])

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    //markdown预览
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    //文章简介预览
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    //修改文章类型
    const selectTypeHandler = (value)=>{
        setSelectType(value)
    }

    /**从接口获得文章类别信息 */
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials:true  //Cookie跨域，要加这个才能使用中间件
        })
        .then(
            res => {
                if(res.data.data === '没有登录'){
                    localStorage.removeItem('openId')
                    props.history.push('/')  //回到登录界面
                }else{
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    /**保存文章 */
    const saveArticle = ()=>{

        if(!articleTitle){
            message.error('文章标题不能为空！')
            return false
        }else if(selectedType == '请选择类型'){
            message.error('必须选择文章类别！')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空！')
            return false
        }else if(!introducemd){
            message.error('简介不能为空！')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空！')
            return false
        }
        let dataText = showDate.replaceAll('-','/')
        console.log('时间',dataText)
        let dataProps = {
            type_id : selectedType,
            title : articleTitle,
            article_content : articleContent,
            introduce : introducemd,
            addTime : (new Date(dataText).getTime()) / 1000
        }
        if(articleId == 0){//新增
            dataProps.view_count = 0
            console.log("发布的文章如下",dataProps)
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                withCredentials:true
            }).then(
                res=>{
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess){
                        message.success('文章添加成功')
                    }else{
                        message.error('文章添加失败')
                    }
                }
            )
            
        }else{//修改
            dataProps.id = articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:dataProps,
                withCredentials:true
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success('文章保存成功！')
                    }else{
                        message.error('文章保存失败！')
                    }
                }
            )
        }
    }

    const getArticleById=(id)=>{
        axios(servicePath.getArticleById+id,{withCredentials:true})
        .then(
            res=>{
                //省略判断是否获得
                let articleInfo = res.data.data[0]
                setArticleTitle(articleInfo.title)
                setArticleContent(articleInfo.article_content)
                let html = marked(articleInfo.article_content)
                setMarkdownContent(html)
                setIntroducemd(articleInfo.introduce)
                let temp = marked(articleInfo.introduce)
                setIntroducehtml(temp)
                setShowDate(articleInfo.addTime)
                setSelectType(articleInfo.typeId)//咋没效果？
                console.log(articleInfo.typeId)
            }
        )
    }



    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={e=>{
                                    setArticleTitle(e.target.value)
                                }
                            }
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML={{ __html: markdownContent }}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>
                            &nbsp;
                            {/* primary是蓝色按钮 */}
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                rows={4}
                                value={introducemd}
                                placeholder="文章简介"
                                onChange={changeIntroduce}
                            />
                            <br /><br />
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{ __html: introducehtml }}
                            >
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date,dateString)=>(setShowDate(dateString))}
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle