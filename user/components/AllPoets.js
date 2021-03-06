import {useState, setState} from 'react'
import TypeSelectList from './TypeSelectList'
import '../styles/components/allpoems.css'
import CommonContext from './CommonContext'
import PoetIntro from './PoetIntro'
import { Divider } from 'antd'

const Poet=()=>{
    const [dynastyType, setDynastyType] = useState([
        {id:'0', value:'不限'},
        {id:'1', value:'战国'},
        {id:'2', value:'春秋'},
        {id:'3', value:'秦朝'},
        {id:'4', value:'汉朝'},
        {id:'5', value:'唐朝'},
        {id:'6', value:'宋朝'},
        {id:'7', value:'元朝'},
        {id:'8', value:'明朝'},
        {id:'9', value:'清朝'},
        {id:'10', value:'中华人民共和国'}
    ])
    const dynastyContext = ['朝代',dynastyType]

    return (
        <div className="allpoems-div">
            <Divider></Divider>
            <CommonContext.Provider value={dynastyContext}>
                <TypeSelectList/>
            </CommonContext.Provider>
            <Divider></Divider>
            <div className="allpoems-div-poemcontent"><PoetIntro/></div>
        </div>
    )
}
export default Poet