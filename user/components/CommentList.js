import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import CommonContext from './CommonContext'
import servicePath from '../config/apiUrl'

const { TextArea } = Input

// const Comments = ({ comments }) => (
//     <List
//         dataSource={comments}
//         header={`${comments.length} ${'条评论'}`}
//         itemLayout="horizontal"
//         renderItem={props => <Comment {...props} />}
//     />
// )

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

const CommentList = () => {
    const workId = useContext(CommonContext)
    const [commentsData, setCommentsData] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        if(workId != undefined)
            getCommentsData()
    },[workId])

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
        if (!value)
            return;
        setSubmitting(true)
        setTimeout(() => {
            setSubmitting(false)
            setValue('')
            setCommentsData(
                [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...commentsData
                ]
            )
        }, 1000)
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