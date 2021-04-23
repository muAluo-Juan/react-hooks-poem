import { Comment, Avatar, Form, Button, List, Input, message } from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import CommonContext from './CommonContext'
import servicePath from '../config/apiUrl'
import cookies from 'react-cookies'

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

const AnswerList = (props) => {
    const data = useContext(CommonContext)
    const [isSolved, setIsSolved] = useState(0)
    const [answerData, setAnswerData] = useState([])
    const [questionId, setQuestionId] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')
    const { setAnswerState } = props

    useEffect(() => {
        if (data != undefined && data[0] != undefined && data[1] != undefined) {
            setAnswerData(data[0])
            setIsSolved(data[1])
            setQuestionId(data[2])
        }
    }, [data])

    const handleChange = e => {
        setValue(e.target.value)
    }

    const handleSubmit = () => {
        if (cookies.load("user") == undefined)
            message.warn("请先登录！")
        else {
            if (!value)
                return;
            setSubmitting(true)
            setTimeout(() => {
                let dataProps = {
                    questionId: questionId,
                    text: value
                }
                axios({
                    method: "POST",
                    url: servicePath.answerQuestion,
                    withCredentials: true,
                    headers: { "token": cookies.load("token") },
                    data: dataProps
                }).then(
                    res => {
                        if (res.data.code == 200) {
                            setSubmitting(false)
                            setValue('')
                            setAnswerState(1)
                        } else {
                            message.error("出现未知错误")
                        }
                    }
                )
            }, 1000)
        }
    }

    function likeAnswer(answerId) {
        console.log("点赞的回答id是", answerId)
        if (cookies.load("user") == undefined)
            message.warn("请先登录！")
        else {
            axios({
                method: "POST",
                url: servicePath.likeAnswer + answerId,
                withCredentials: true,
                headers: { "token": cookies.load("token") }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        setAnswerState(2)
                    } else {
                        message.error("出现未知错误")
                    }
                }
            )
        }
    }

    function adoptAnswer(answerId) {
        if (cookies.load("user") == undefined)
            message.warn("请先登录！")
        else {
            let dataProps = {
                questionId: questionId,
                answerId: answerId
            }
            axios({
                method: "PUT",
                url: servicePath.adoptAnswer,
                withCredentials: true,
                data: dataProps,
                headers: { "token": cookies.load("token") }
            }).then(
                res => {
                    if (res.data.code == 200) {
                        setAnswerState(3)
                    } else {
                        message.error(res.data.message)
                    }
                }
            )
        }
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
                        <img style={{ display: item.answerId == isSolved ? "block" : "none", float: 'right', marginTop: "0.5rem" }} width={70} height={45} src="https://raw.githubusercontent.com/muAluo-Juan/react-hooks-poem/master/user/img/adopted.png" />
                        <Comment
                            //   actions={item.actions}
                            author={item.penName}
                            avatar={item.headPicPath}
                            datetime={(new Date(item.inputTime)).toLocaleString()}
                        />
                        <div style={{ lineHeight: "1.7rem" }}>
                            {item.text}
                        </div>
                        <div>
                            <Button onClick={() => { likeAnswer(item.answerId) }} style={{ marginTop: "0.5rem" }}>{item.likedByLoginer ? '取消赞同' : '赞同'} {item.likeNum}</Button>
                            <Button onClick={() => { adoptAnswer(item.answerId) }} style={{ marginRight:"0.5rem",float:"left", marginTop: "0.5rem", display: item.showAdoptBtn ? 'block' : 'none' }}>采纳</Button>
                        </div>
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