import {useContext} from 'react'
import { List, Icon, Button, message } from 'antd'
import '../styles/components/poemcontent.css'
import ClipboardJS from 'clipboard'
import CommonContext from './CommonContext';

const collect=(e)=>{
    //未登录先登录（未解决）
    console.log(e.currentTarget.attributes)
    if(e.currentTarget.dataset.collect == "false"){
        e.currentTarget.style.color = '#cd201f'
        // e.currentTarget.attributes.theme = 'filled'
        // e.currentTarget.setAttribute('color','#cd201f')
        // e.currentTarget.setAttribute('theme','filled')
        e.currentTarget.dataset.collect = "true"
        message.success("已添加到收藏夹")
    }
    else{
        e.currentTarget.style.color = '#888'
        e.currentTarget.dataset.collect = "false"
        message.success("已移出收藏夹")
    }
    
}

function copy() {
    var clipboard = new ClipboardJS('#copy-icon')
    if(clipboard){
        message.success("已复制到剪贴板~")
    }else{
        message.success("复制失败，请手动复制~")
    }
    
}

const download = (e)=>{
    const element = document.createElement("a")
    console.log(document.getElementById('poem-content-copy'+e.currentTarget.dataset.pos).innerText)
    const file = new Blob([document.getElementById('poem-content-copy'+e.currentTarget.dataset.pos).innerText], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = e.currentTarget.dataset.poemname+".txt"
    document.body.appendChild(element)
    element.click()
}

function correct() {

}

const PoemContent = () => {
    let {poemList} = useContext(CommonContext)
    let {pagination} = useContext(CommonContext)
    let {display} = useContext(CommonContext)
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={poemList}
            renderItem={(item,index) => (
                <List.Item
                    key={item.name}
                    actions={[
                        <Button size="small" style={{display:display}}>全文赏析</Button>
                    ]}
                >
                    <div id={"poem-content-copy"+index}>
                    <div className="poem-icon-div">
                            <audio src={item.audio} controls style={{ marginRight: "1.2rem" }}></audio>
                            <Icon
                                className="icon"
                                style={{ marginRight: "1.2rem" }}
                                // data-collect={item.isCollect}
                                type="star"
                                title="收藏"
                                onClick={collect}
                                // theme="filled"
                            />
                            <Icon
                                id="copy-icon"
                                className="icon"
                                style={{ marginRight: "1.2rem" }}
                                type="copy"
                                title="复制"
                                onClick={copy}
                                data-clipboard-target={"#poem-content-copy"+index}
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
                            <Icon
                                className="icon"
                                type="form"
                                title="完善"
                                onClick={correct}
                            />
                        </div>
                        <List.Item.Meta
                            title={<h2 style={{color:"#cd201f"}}>{item.name}</h2>}
                            description={item.authoruid + '[' + item.dynastyid + ']'}
                        />
                        <div
                            dangerouslySetInnerHTML={{ __html: item.content.replace(/^(\s|\\n)+|(\s|\\n)+$/g, '').replace(/\\n/g, "<br>")}}
                            style={{ lineHeight: "2rem" }}>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}
export default PoemContent