import '../styles/components/allpoems.css'
import {useEffect, useState } from 'react'
import PoetIntro from './PoetIntro'
import { Divider } from 'antd'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import DynastySelectList from '../components/DynastySelectList'
import CommonContext from './CommonContext'

const Poet=()=>{
    const [poets,setPoets] = useState([])
    const [poetList,setPoetList] = useState([])
    const [dynasty,setDynasty] = useState(0)
    const pagination = {
        onChange: page => {
            console.log(page);
        },
        pageSize: 10,
    }

    useEffect(()=>{
        getPoetList()
    },[])

    const getPoetList = ()=>{
        axios({
            method: 'get',
            url: servicePath.getPoetList,
            withCredentials:true
        }).then(
            res=>{
                setPoets(res.data.data)
                setPoetList(res.data.data)
            }
        )
    }

    useEffect(() => {
        if (poetList.length != 0) {
            let temp = []
            for (let i = 0; i < poetList.length; i++)
                if (dynasty == 0 || dynasty == poetList[i].dynastyid)
                    temp.push(poetList[i])
            setPoets(temp)
        }
    }, [dynasty])

    return (
        <div className="allpoems-div">
            <DynastySelectList setDynasty={setDynasty}/>
            <Divider></Divider>
            <CommonContext.Provider value={{poets,pagination}}>
                <PoetIntro/>
            </CommonContext.Provider>
        </div>
    )
}
export default Poet