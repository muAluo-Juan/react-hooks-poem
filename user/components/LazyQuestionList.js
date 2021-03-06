import { List, message, Avatar, Spin } from 'antd';

import reqwest from 'reqwest';

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';

import '../styles/components/lazyquestionlist.css'
import { useEffect, useState } from 'react';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const allData = []
    for(let i = 0 ; i < 50; i ++){
        allData.push({
            name:"原川",
            questionTime:"5分钟前",
            question:"当前项目中打印pdf需要显示富文本内容，富文本内容 包含图片，图片转为base64直接存到数据库中，但是取出数据在pdf显示时，图片无法显示，有朋友解决过这个问题吗",
            title:"PDF中如何显示base64图片",
            likeNum:50,
            collectNum:20,
            answerNum:100
        })
    }
const LazyQuestionList = () => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const temp = 0

    let loadedRowsMap = {};

    useEffect(() => {
        setData(allData)
        // fetchData(res => {
        //     setData(res.results)
        // });
        // console.log("本useEffect获得的数据",data.length)
    },[temp])

    // const fetchData = callback => {
    //     reqwest({
    //         url: fakeDataUrl,
    //         type: 'json',
    //         method: 'get',
    //         contentType: 'application/json',
    //         success: res => {
    //             callback(res);
    //         },
    //     });
    // };

    const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        let newData = data
        setLoading(true)
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            loadedRowsMap[i] = 1;
        }
        if (newData.length > 49) {
            message.warning('全部加载完毕！');
            setLoading(false)
            return;
        }
        newData = newData.concat(allData);
        setData(newData)
        setLoading(false)
        // fetchData(res => {
        //     newData = newData.concat(res.results);
        //     setData(newData)
            // console.log("本更新后获得的数据",data.length)
        //     setLoading(false)
        // });
    };

    const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

    const renderItem = ({ index, key, style }) => {
        // const { data } = this.state;
        const item = data[index];
        return (
            <List.Item key={key} style={style}>
                <div className="question-list-left">
                    <div><span>{item.likeNum}</span><span className="des">点赞</span></div>
                    <div><span>{item.collectNum}</span><span className="des">关注</span></div>
                    <div><span>{item.answerNum}</span><span className="des">回答</span></div>
                </div>
                <List.Item.Meta
                    title={
                        <div className="question-content">
                            <h3 style={{cursor:"pointer",fontWeight:"bold"}}>{item.title}</h3>
                            <div className="question-content-content">{item.question}</div>
                        </div>
                    }
                    description={
                        <div style={{float:"right",fontSize:"0.7rem"}}>
                            <span>{item.name}</span>
                            <span style={{marginLeft:"1rem"}}>{item.questionTime}</span>
                        </div>
                    }
                />
            </List.Item>
        );
    };

    const vlist = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered, width }) => (
        <VList
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            overscanRowCount={2}
            rowCount={data.length}
            rowHeight={110}
            rowRenderer={renderItem}
            onRowsRendered={onRowsRendered}
            scrollTop={scrollTop}
            width={width}
        />
    );
    const autoSize = ({ height, isScrolling, onChildScroll, scrollTop, onRowsRendered }) => (
        <AutoSizer disableHeight>
            {({ width }) =>
                vlist({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    onRowsRendered,
                    width,
                })
            }
        </AutoSizer>
    );
    const infiniteLoader = ({ height, isScrolling, onChildScroll, scrollTop }) => (
        <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={handleInfiniteOnLoad}
            rowCount={data.length}
        >
            {({ onRowsRendered }) =>
                autoSize({
                    height,
                    isScrolling,
                    onChildScroll,
                    scrollTop,
                    onRowsRendered,
                })
            }
        </InfiniteLoader>
    );
    return (
        <List>
            {data.length > 0 && <WindowScroller>{infiniteLoader}</WindowScroller>}
            {loading && <Spin className="demo-loading" />}
        </List>
    );
}
export default LazyQuestionList