import { Comment, Avatar, Form, Button, List, Input, message } from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import CommonContext from './CommonContext'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                提交
        </Button>
        </Form.Item>
    </div>
)

const CommentList = (props) => {
    const workId = useContext(CommonContext)
    const [commentsData, setCommentsData] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')
    const [commentChange, setCommentChange] = useState(0)
    const {setComment} = props

    useEffect(() => {
        if (workId != undefined)
            getCommentsData()
    }, [workId, commentChange])

    const getCommentsData = () => {
        axios({
            method: 'GET',
            url: servicePath.getCommentListByWorkId + workId,
            withCredentials: true
        }).then(
            res => {
                setCommentsData(res.data.data)
            }
        )
    }

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleSubmit = () => {
        if (cookie.load('user') == undefined)
            message.warn("请先登录！")
        else {
            if (!value){
                message.warn("评论内容不能为空！")
                return;
            }
            setSubmitting(true)
            setTimeout(() => {
                let dataProps = {
                    commentText: value,
                    workId: workId
                }
                axios({
                    method: "POST",
                    url: servicePath.addComment,
                    withCredentials: true,
                    headers: { 'token': cookie.load('token')},
                    data: dataProps
                }).then(
                    res=>{
                        if(res.data.code == 200){
                            setSubmitting(false)
                            setValue('')
                            setCommentChange(commentChange==0)
                            setComment(1)
                        }
                        else{
                            message.error("出现未知错误")
                        }
                    }
                )
            }, 1000)
        }

    }

    return (
        <div>
            {commentsData.length > 0 && <List
                className="comment-list"
                header={`${commentsData.length} 条评论`}
                itemLayout="horizontal"
                dataSource={commentsData}
                renderItem={item => (
                    <li>
                        <Comment
                            //   actions={item.actions}
                            author={item.penName}
                            avatar={item.headPicPath}
                            content={item.commentText}
                            datetime={(new Date(item.inputTime)).toLocaleString()}
                        />
                    </li>
                )}
            />}
            <Comment
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />

        </div>
    )
}

export default CommentList