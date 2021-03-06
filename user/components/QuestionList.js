import { List, Avatar, Button, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import reqwest from 'reqwest';
import '../styles/components/questionlist.css'

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const QuestionList = () => {
    const [initLoading, setInitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [list, setList] = useState([])
    const a = 10
    useEffect(()=>{
        console.log("老子执行了几次")
        getData(res => {
            setInitLoading(false)
            setData(res.results)
            setList(res.results)
        });
    },[a])

    const getData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    const onLoadMore = () => {
        setLoading(true)
        setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))))
        getData(res => {
            const dataNew = data.concat(res.results);
            setData(dataNew)
            setList(data)
            setLoading(false)
            window.dispatchEvent(new Event('resize'))
        });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>加载更多</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default QuestionList