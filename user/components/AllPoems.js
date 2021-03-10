import '../styles/components/allpoems.css'
import { useContext, useEffect, useState } from 'react'
import DynastySelectList from '../components/DynastySelectList'
import TypeSelectList from '../components/TypeSelectList'
import PoetSelectList from '../components/PoetSelectList'
import CommonContext from './CommonContext'
import PoemContent from '../components/PoemContent'
import { Divider } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const AllPoems = () => {
    const [poems, setPoems] = useState([])
    const [poemList, setPoemList] = useState([])
    const [dynasty, setDynasty] = useState(0)
    const [poet, setPoet] = useState(0)
    const [type, setType] = useState(0)
    useEffect(() => {
        getPoems()
        console.log("useEffect")
    }, [])

    useEffect(() => {
        if (poems.length != 0) {
            let temp = []
            for (let i = 0; i < poems.length; i++)
                if ((dynasty == 0 || dynasty == poems[i].dynastyid) && (poet == 0 || poet == poems[i].authoruid) && (type == 0 || type == poems[i].typeid))
                    temp.push(poems[i])
            setPoemList(temp)
        }
    }, [dynasty, poet, type])

    const getPoems = () => {
        axios({
            method: 'get',
            url: servicePath.getPoems,
            withCredentials: true
        }).then(
            res => {
                setPoemList(res.data.data)
                setPoems(res.data.data)
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
            <DynastySelectList setDynasty={setDynasty} />
            <PoetSelectList setPoet={setPoet} />
            <TypeSelectList setType={setType} />
            <Divider></Divider>
            <CommonContext.Provider value={{ poemList, pagination, display }}>
                <PoemContent />
            </CommonContext.Provider>
        </div>
    )
}
export default AllPoems