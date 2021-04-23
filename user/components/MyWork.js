import '../styles/components/mywork.css'
import { Divider, Icon, List } from 'antd'
import { useState } from 'react'
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
)

const MyWork = () => {
    const pagination = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 5,
    }
    const [listData, setListData] = useState([{
        likeNum: 10,
        collectNum: 20,
        commentNum: 30,
        title: "声声慢·春慢 独木桥体",
        workId: 20,
        modifyTime: 1450842466320,
        text: '<p>娥眉才画，妆粉初凝，隔春绣帘掀慢。缓下瑶阶，纤月香尘挥慢.</p><p>&nbsp;闲来倚得烟杏，捧新诗、玉葱拨慢。春困染，恼衣沾琼雪，暖风熏慢。</p><p>魂入清熟小梦，小梦里、檀郎傍窗吟慢。</p><p>欲近相扶，惊闻懒莺啼慢。</p><p>揉开惺忪倦眼，已黄昏、斜阳去慢。</p><p>郎未见，只远村、酒旆摇慢。</p><p>鄙人好趣诗趣词已久。前几日偶然读得了数篇窗友佳作，便心驰神往，心痒难耐。</p><p>奈何虽心中跃跃，却苦无灵感。</p><p>今日重读东坡《贺新郎》两句，忽生灵感，便填此《声声慢》，以效颦诸君。</p><p>跋：似乎有好配图比较能吸引人来读，奈何鄙人找图无能，拍照手残，配一张三年前拍的鸢尾助助势吧。<img src="https://gitee.com/muAluo/rainyNightPoemsVue/raw/master/img/w3.jpg" style="max-width: 100%;"></p>'
    },
    {
        likeNum: 10,
        collectNum: 20,
        commentNum: 30,
        title: "声声慢·春慢 独木桥体",
        workId: 20,
        modifyTime: 1450842466320,
        text: '<p>娥眉才画，妆粉初凝，隔春绣帘掀慢。缓下瑶阶，纤月香尘挥慢.</p><p>&nbsp;闲来倚得烟杏，捧新诗、玉葱拨慢。春困染，恼衣沾琼雪，暖风熏慢。</p><p>魂入清熟小梦，小梦里、檀郎傍窗吟慢。</p><p>欲近相扶，惊闻懒莺啼慢。</p><p>揉开惺忪倦眼，已黄昏、斜阳去慢。</p><p>郎未见，只远村、酒旆摇慢。</p><p>鄙人好趣诗趣词已久。前几日偶然读得了数篇窗友佳作，便心驰神往，心痒难耐。</p><p>奈何虽心中跃跃，却苦无灵感。</p><p>今日重读东坡《贺新郎》两句，忽生灵感，便填此《声声慢》，以效颦诸君。</p><p>跋：似乎有好配图比较能吸引人来读，奈何鄙人找图无能，拍照手残，配一张三年前拍的鸢尾助助势吧。<img src="https://gitee.com/muAluo/rainyNightPoemsVue/raw/master/img/w3.jpg" style="max-width: 100%;"></p>'
    },
    {
        likeNum: 10,
        collectNum: 20,
        commentNum: 30,
        title: "声声慢·春慢 独木桥体",
        workId: 20,
        modifyTime: 1450842466320,
        text: '<p>娥眉才画，妆粉初凝，隔春绣帘掀慢。缓下瑶阶，纤月香尘挥慢.</p><p>&nbsp;闲来倚得烟杏，捧新诗、玉葱拨慢。春困染，恼衣沾琼雪，暖风熏慢。</p><p>魂入清熟小梦，小梦里、檀郎傍窗吟慢。</p><p>欲近相扶，惊闻懒莺啼慢。</p><p>揉开惺忪倦眼，已黄昏、斜阳去慢。</p><p>郎未见，只远村、酒旆摇慢。</p><p>鄙人好趣诗趣词已久。前几日偶然读得了数篇窗友佳作，便心驰神往，心痒难耐。</p><p>奈何虽心中跃跃，却苦无灵感。</p><p>今日重读东坡《贺新郎》两句，忽生灵感，便填此《声声慢》，以效颦诸君。</p><p>跋：似乎有好配图比较能吸引人来读，奈何鄙人找图无能，拍照手残，配一张三年前拍的鸢尾助助势吧。<img src="https://gitee.com/muAluo/rainyNightPoemsVue/raw/master/img/w3.jpg" style="max-width: 100%;"></p>'
    },
    ])

    function gotoCommunityDetail(e) {
        window.open('/communitydetail?workid=' + e.target.dataset.workid, '_blank')
    }

    return (
        <div>
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
                            <span>最近修改：{(new Date(item.modifyTime)).toLocaleString()}</span>
                        ]}
                    >
                        <div className="mywork-title">
                            <h3 data-workid={item.workId} style={{ fontWeight: "bold", cursor: "pointer" }} onClick={gotoCommunityDetail}>{item.title}</h3>
                            <div className="mywork-title-process">
                                <span style={{color:"#cd201f"}}>删除</span>
                                <Divider type="vertical" />
                                <span style={{color:"#108ee9"}}>修改</span>
                            </div>
                        </div>
                        <div className="work-content-div" dangerouslySetInnerHTML={{ __html: item.text.replace(/(<([^>]+)>)/ig, "").replace(/[\r\n]/g, "") }}></div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyWork