import '../styles/components/poemcontent.css'
import { useContext, useEffect } from 'react'
import { List, Icon, Button, message } from 'antd'
import ClipboardJS from 'clipboard'
import CommonContext from './CommonContext';
import Router from 'next/router'
import cookie from 'react-cookies'
import axios from 'axios';
import servicePath from '../config/apiUrl';

export default function PoemContent(props) {
    let { poemList } = useContext(CommonContext)
    let { pagination } = useContext(CommonContext)
    let { display } = useContext(CommonContext)
    const {setCollectState} = props
    // useEffect(()=>{
    //     console.log("poemList.length",poemList.length)
    // })

    const collect = (e) => {
        //未登录先登录（未解决）
        if (cookie.load("user") == undefined) {
            message.warn("请先登录！")
        } else {
            axios({
                method: 'POST',
                url: servicePath.collect + e.currentTarget.dataset.id,
                withCredentials: true,
                headers:{'token':cookie.load('token')}
            }).then(
                res=>{
                    if(res.data.code == 200){
                        message.success("已移出收藏夹！")
                        setCollectState(1)
                    }else if(res.data.code == 300){
                        message.success("已添加到收藏夹")
                        setCollectState(1)
                    }else{
                        message.error("系统错误，操作失败")
                    }
                }
            )
        }
    }

    function copy() {
        var clipboard = new ClipboardJS('#copy-icon')
        if (clipboard) {
            message.success("已复制到剪贴板~")
        } else {
            message.success("复制失败，请手动复制~")
        }

    }

    const download = (e) => {
        const element = document.createElement("a")
        console.log(document.getElementById('poem-content-copy' + e.currentTarget.dataset.pos).innerText)
        const file = new Blob([document.getElementById('poem-content-copy' + e.currentTarget.dataset.pos).innerText], { type: 'text/plain' })
        element.href = URL.createObjectURL(file)
        element.download = e.currentTarget.dataset.poemname + ".txt"
        document.body.appendChild(element)
        element.click()
    }

    function gotoPoemDetail(e) {
        let poem = []
        for (let i = 0; i < poemList.length; i++)
            if (poemList[i].id == e.target.dataset.id) {
                poem.push(poemList[i])
                break
            }
        Router.push("/poemdetail?id=" + e.target.dataset.id)
    }
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={poemList}
            renderItem={(item, index) => (
                <List.Item
                    key={item.name}
                    actions={[
                        <Button size="small" style={{ display: display }} data-id={item.id} onClick={gotoPoemDetail}>全文赏析</Button>
                    ]}
                >
                    <div id={"poem-content-copy" + index}>
                        <div className="poem-icon-div">
                            <audio src={item.audio == null ? '' : item.audio} controls style={{ marginRight: "1.2rem" }}></audio>
                            <Icon
                                className="icon"
                                style={{ marginRight: "1.2rem", color: item.collect ? '#FFA500' : '#888' }}
                                data-id={item.id}
                                type="star"
                                title="收藏"
                                onClick={collect}
                                theme="filled"
                            />
                            <Icon
                                id="copy-icon"
                                className="icon"
                                style={{ marginRight: "1.2rem" }}
                                type="copy"
                                title="复制"
                                onClick={copy}
                                data-clipboard-target={"#poem-content-copy" + index}
                            />
                            <Icon
                                className="icon"
                                style={{ marginRight: "1.2rem" }}
                                data-pos={index}
                                data-poemname={item.name}
                                type="download"
                                title="下载"
                                onClick={download}
                            />
                        </div>
                        <List.Item.Meta
                            title={
                                <h2
                                    style={{ color: "#cd201f", cursor: 'pointer' }}
                                    data-id={item.id}
                                    onClick={gotoPoemDetail}
                                >
                                    {item.name}
                                </h2>
                            }
                            description={item.author + ' [' + item.dynasty + '] '}
                        />
                        <div
                            dangerouslySetInnerHTML={{ __html: item.content.replace(/^(\s|\\n)+|(\s|\\n)+$/g, '').replace(/\\n/g, "<br>") }}
                            style={{ lineHeight: "2rem" }}>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}