import React from 'react'
import {Avatar,Divider} from 'antd'
import '../styles/components/author.css'

const Author = ()=>{
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://gitee.com/muAluo/rainyNightPoemsVue/raw/master/img/w4.jpg"/>
            </div>
            <div className="author-introduction">
                大家好我是元川居安，我知道你看照片就喜欢上我了。那我就不过多介绍自己了，怕你爱上我，因为我是仙女不能和凡人恋爱的。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"/>
                <Avatar size={28} icon="qq" className="account"/>
                <Avatar size={28} icon="wechat" className="account"/>
            </div>
        </div>
    )
}

export default Author
