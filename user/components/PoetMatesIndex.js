import { List, Avatar, Icon } from 'antd'
import { useContext } from 'react'
import CommonContext from '../components/CommonContext'


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
function PoetMatesIndex() {
  let data = useContext(CommonContext)
  let pagination = data[0]
  let listData = data[1]

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
            <IconText type="star-o" text="156" key="list-vertical-star-o" />,
            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
            <IconText type="message" text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  )
}
export default PoetMatesIndex