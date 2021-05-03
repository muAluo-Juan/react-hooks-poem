import 'braft-editor/dist/index.css'
import dynamic from 'next/dynamic'
import { Button, Divider, Input, message } from 'antd'
import { useContext, useEffect, useState } from 'react'
import CommenContext from '../components/CommonContext'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import cookie from 'react-cookies'

let BraftEditor = dynamic(
    import('braft-editor').then((module) => {
        BraftEditor = module.default
        return module.default
    }), {
    ssr: false
}
)

const controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 
    // 'emoji', 禁用
    'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media', 'fullscreen',
    'separator', 'clear'
]

function Editor() {
    const [workTitle, setWorkTitle] = useState('')
    const [workText, setWorkText] = useState('')
    const workId = useContext(CommenContext)

    useEffect(() => {
        if (workId != -1) {
            console.log(BraftEditor)
            getOriginalWork()
        }
    }, [])

    function getOriginalWork() {
        axios({
            method: "get",
            url: servicePath.getWorkById + workId,
            headers: { "token": cookie.load("token") },
            withCredentials: true
        }).then(
            res => {
                // console.log("作品内容",res.data.data)
                setWorkTitle(res.data.data.title)
                setWorkText(BraftEditor.createEditorState(res.data.data.text))
                // console.log(workText.toHTML())
            }
        )
    }

    const changeContent = workText => {
        setWorkText(workText)
        console.log(workText.toHTML())
    }

    function addWork(e) {
        // console.log(e.target.dataset.state)
        const state = e.target.dataset.state
        const dataProps = {
            title: workTitle,
            text: workText.toHTML(),
            state: state
        }
        axios({
            method: "post",
            url: servicePath.addWorkOrDraft,
            withCredentials: true,
            headers: { "token": cookie.load("token") },
            data: dataProps
        }).then(
            res => {
                if (res.data.code == 200 && state == 1) {
                    message.success("发布成功，积分+5！")

                } else if (res.data.code == 200 && state == 0) {
                    message.success("作品已保存至草稿箱！")
                } else {
                    message.error("出现未知错误！")
                }
            }
        )
    }

    return (
        <div style={{ padding: "0.8rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
                <Input placeholder="请输入作品标题..." size="large" value={workTitle} onChange={e => { setWorkTitle(e.target.value) }} />
            </div>
            <BraftEditor
                placeholder="请输入作品内容..."
                value={workText}
                onChange={changeContent}
                controls={controls}
            />
            <Divider />
            <div style={{ float: "right", paddingBottom: "0.5rem" }}>
                <Button data-state={1} type="primary" style={{ marginRight: "1rem" }} onClick={addWork}>发布作品</Button>
                <Button data-state={0} onClick={addWork}>保存草稿</Button>
            </div>
        </div>
    )
}

export default Editor