import React from 'react'
import { Avatar, Divider, Badge } from 'antd'
import '../styles/components/author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div className="author-avatar">
                <Badge count={'童生'}><Avatar size={100} src="https://gitee.com/muAluo/rainyNightPoemsVue/raw/master/img/w4.jpg" /></Badge>
            </div>
            <div>元川居安</div>
            <div className="author-introduction">
                间歇性失忆患者
            </div>
            <Divider />
            <span className="author-message">
                <span><p>18</p><p style={{ color: '#999' }}>积分</p></span>
                <span><p>22</p><p style={{ color: '#999' }}>粉丝</p></span>
                <span><p>22</p><p style={{ color: '#999' }}>获赞</p></span>
                <span><p>22</p><p style={{ color: '#999' }}>收藏</p></span>
                <span><p>22</p><p style={{ color: '#999' }}>评论</p></span>
            </span>
        </div>
    )
}

export default Author
