import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import CommonContext from './CommonContext'
import servicePath from '../config/apiUrl'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                回答
        </Button>
        </Form.Item>
    </div>
)

const AnswerList = () => {
    const answers = useContext(CommonContext)
    const [answerData, setAnswerData] = useState([])
    console.log(answers)
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')
    
    useEffect(()=>{
        if(answers != undefined)
            setAnswerData(answers)
    },[answers])

    // const getCommentsData = () => {
    //     axios({
    //         method: 'GET',
    //         url: servicePath.getCommentListByWorkId + workId,
    //         withCredentials: true
    //     }).then(
    //         res => {
    //             setCommentsData(res.data.data)
    //         }
    //     )
    // }

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
            // setCommentsData(
            //     [
            //         {
            //             author: 'Han Solo',
            //             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            //             content: <p>{value}</p>,
            //             datetime: moment().fromNow(),
            //         },
            //         ...commentsData
            //     ]
            // )
        }, 1000)
    }

    return (
        <div>
            {answerData.length > 0 && <List
                className="comment-list"
                header={`${answerData.length} 个回答`}
                itemLayout="horizontal"
                dataSource={answerData}
                renderItem={item => (
                    <li>
                        <Comment
                            //   actions={item.actions}
                            author={item.penName}
                            avatar={item.headPicPath}
                            datetime={(new Date(item.inputTime)).toLocaleString()}
                        />
                        <div style={{lineHeight:"1.7rem"}}>
                            {item.text}
                        </div>
                        <Button style={{marginTop:"0.5rem"}}>赞同 {item.likeNum}</Button>
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

export default AnswerList