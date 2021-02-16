import { List, Avatar, Icon, Button } from 'antd';
import '../styles/components/poemcontent.css'

const listData = [];
for (let i = 0; i < 500; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `静夜思`,
        description:
            '李白 [唐代]',
        content:
            '\n离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。远芳侵古道，晴翠接荒城。又送王孙去，萋萋满别情。\n'.replace(/。/g, "。<br>")
    });
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const PoemContent = () => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <Button size="small">全文赏析</Button>
                    ]}
                    extra={
                        <div className="poem-icon-div">
                            <audio src="" controls="controls" style={{marginRight: "1.2rem"}}></audio>
                            <Icon style={{ fontSize: "1.3rem", marginRight: "1.2rem" }} type="star" title="收藏" />
                            <Icon style={{ fontSize: "1.3rem", marginRight: "1.2rem" }} type="copy" title="复制" />
                            <Icon style={{ fontSize: "1.3rem"}} type="form" title="勘误" />
                        </div>
                    }
                >
                    <List.Item.Meta
                        title={<h2><a href={item.href}>{item.title}</a></h2>}
                        description={item.description}
                    />
                    <div
                        dangerouslySetInnerHTML={{ __html: item.content }}
                        style={{ lineHeight: "2rem" }}>
                    </div>
                </List.Item>
            )}
        />
    )
}
export default PoemContent