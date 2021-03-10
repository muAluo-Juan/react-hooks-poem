import '../styles/components/poetintro.css'
import { List, Icon, Button } from 'antd'
import { useContext} from 'react'
import CommonContext from './CommonContext'
import Router from 'next/router'

const PoetIntro = () => {
    const {poets} = useContext(CommonContext)
    const {pagination} = useContext(CommonContext)
    function gotoPoetDetail(e){
        let poet = []
        for(let i = 0 ; i < poets.length ; i ++)
            if(poets[i].uid == e.target.dataset.uid)
            {
                poet.push(poets[i])
                break
            }   
        Router.push("/poetdetail?uid="+e.target.dataset.uid)
    }
    function gotoSeePoems(e){
        Router.push("/poetdetail?uid="+e.target.dataset.uid)
    }

    return (
        <List
            pagination={pagination}
            dataSource={poets}
            renderItem={item => (
                <List.Item>
                    <div className="poet-intro-div">
                        <img style={{display:item.avatar == null ? 'none' : 'block'}} src={item.avatar} width={100} height={130} alt="暂未收录"/>
                        <div style={{width:'100%'}}>
                            {/* <Button size="small" style={{ fontSize: '0.8rem', float: 'right' }}>完善</Button> */}
                            <h2 data-uid={item.uid}  style={{color:'#cd201f',cursor:"pointer"}} onClick={gotoPoetDetail}>{item.name}</h2>
                            <div className="poet-intro-content-div">
                                {item.intro}
                                <a data-uid={item.uid} onClick={gotoSeePoems}><Icon type="caret-right" />{item.poems.length}篇诗文（仅包含已收录）</a>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default PoetIntro