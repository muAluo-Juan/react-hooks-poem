import { List, message, Avatar, Spin } from 'antd';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import '../styles/components/lazyquestionlist.css'
import { useContext, useEffect, useState } from 'react';
import CommonContext from './CommonContext';
import Router from 'next/router'

const LazyQuestionList = () => {
    const allData = useContext(CommonContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const temp = 0

    let loadedRowsMap = {};

    useEffect(() => {
        setData(allData)
    })

    const gotoQuestionDetail = (e)=>{
        // Router.push('/questiondetail?id='+e.target.dataset.id)
        window.open('/questiondetail?id='+e.target.dataset.id,'_blank')
    }

    const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
        let newData = data
        setLoading(true)
        for (let i = startIndex; i <= stopIndex; i++) {
            // 1 means loading
            loadedRowsMap[i] = 1;
        }
        if (newData.length > 5) {
            message.warning('全部加载完毕！');
            setLoading(false)
            return;
        }
        newData = newData.concat(allData);
        setData(newData)
        setLoading(false)
    };

    const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

    const renderItem = ({ index, key, style }) => {
        const item = data[index];
        return (
            <List.Item key={key} style={style}>
                <div className="question-list-left">
                    <div><span>{item.likeNum}</span><span className="des">点赞</span></div>
                    <div><span>{item.attentionNum}</span><span className="des">关注</span></div>
                    <div><span>{item.answerNum}</span><span className="des">回答</span></div>
                </div>
                <List.Item.Meta
                    title={
                        <div className="question-content">
                            <h3 style={{cursor:"pointer",fontWeight:"bold"}} data-id={item.questionId} onClick={gotoQuestionDetail}>{item.text}</h3>
                            <div className="question-content-content">{item.description}</div>
                        </div>
                    }
                    description={
                        <div style={{float:"right",fontSize:"0.8rem"}}>
                            <span>{item.penName}</span>
                            <span style={{marginLeft:"1rem"}}>{(new Date(item.inputTime)).toLocaleString()}</span>
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
            rowHeight={100}
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