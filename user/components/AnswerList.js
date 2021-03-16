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
    const data = useContext(CommonContext)
    const [isSolved,setIsSolved] = useState(0)
    const [answerData, setAnswerData] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')
    
    useEffect(()=>{
        if(data != undefined && data[0] != undefined && data[1] != undefined)
        {
            setAnswerData(data[0])
            setIsSolved(data[1])
        }    
    },[data])

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
                        <img style={{display: item.answerId == isSolved ? "block" : "none",float:'right',marginTop:"0.5rem"}} width={70} height={45} src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/adopted.png"/>
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