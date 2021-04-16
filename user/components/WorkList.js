import '../styles/components/worklist.css'
import { List, Avatar, Icon, Button } from 'antd'
import { useContext, useEffect, useState } from 'react'
import CommonContext from './CommonContext'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
function WorkList() {
  let {chooseNav} = useContext(CommonContext)
  let {pagination} = useContext(CommonContext)
  const [listData,setListData] = useState([])
 
  useEffect(()=>{
    if(chooseNav == "最新"){
      getNewWork()
    }
    else if(chooseNav == "热门"){
      getHotWork()
    }else if(chooseNav == "首页"){
      getIndexWork()
    }
  })

  const getNewWork = ()=>{
    axios({
      method: 'get',
      url: servicePath.getNewWorkList,
      withCredentials: true
    }).then(
      res=>{
        setListData(res.data.data)
      }
    )
  }

  const getHotWork = ()=>{
    axios({
      method: 'get',
      url: servicePath.getHotWorkList,
      withCredentials: true
    }).then(
      res=>{
        setListData(res.data.data)
      }
    )
  }

  const getIndexWork = ()=>{
    axios({
      method: 'get',
      url: servicePath.getHotWorkList,
      withCredentials: true
    }).then(
      res=>{
        setListData(res.data.data.slice(0,3))
      }
    )
  }

  function gotoCommunityDetail(e){
    window.open('/communitydetail?workid='+e.target.dataset.workid,'_blank')
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={pagination}
      dataSource={listData}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="like-o" text={item.likeNum} key="list-vertical-like-o" />,
            <IconText type="star-o" text={item.collectNum} key="list-vertical-star-o" />,
            <IconText type="message" text={item.commentNum} key="list-vertical-message" />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.headPicPath} size={40}/>}
            title={
              <div>
                <span>{item.penName}</span>
                <Button size="small" style={{marginLeft:"0.5rem"}}>关注</Button>
              </div>
            }
            description={(new Date(item.modifyTime)).toLocaleString()}
          />
            <h3 data-workid={item.workId} style={{fontWeight:"bold",cursor:"pointer"}} onClick={gotoCommunityDetail}>{item.title}</h3>
            <div className="work-content-div" dangerouslySetInnerHTML={{__html: item.text.replace(/(<([^>]+)>)/ig,"").replace(/[\r\n]/g,"")}}></div>
        </List.Item>
      )}
    />
  )
}
export default WorkList