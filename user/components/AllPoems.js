import { useEffect, useState } from 'react'
import DynastySelectList from '../components/DynastySelectList'
import TypeSelectList from '../components/TypeSelectList'
import PoetSelectList from '../components/PoetSelectList'
import '../styles/components/allpoems.css'
import CommonContext from './CommonContext'
import PoemContent from '../components/PoemContent'
import { Divider } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const AllPoems = () => {
    const [poemList, setPoemList] = useState([])
    const [dynastyType, setDynastyType] = useState([])
    useEffect(() => {
        getPoemList()
    }, [])
    const getPoemList = () => {
        axios({
            method: 'get',
            url: servicePath.getPoemList,
            withCredentials: true
        }).then(
            res => {
                setPoemList(res.data.data)
            }
        )
    }
    let pagination = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 10,
    }
    let display = 'block'

    return (
        <div className="allpoems-div">
            <Divider></Divider>
            <DynastySelectList />
            <PoetSelectList />
            <TypeSelectList />
            <Divider></Divider>
            <CommonContext.Provider value={{ poemList, pagination, display }}>
                <PoemContent />
            </CommonContext.Provider>
        </div>
    )
}
export default AllPoems