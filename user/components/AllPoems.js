import {useState, setState} from 'react'
import TypeSelectList from '../components/TypeSelectList'
import '../styles/components/allpoems.css'
import CommonContext from './CommonContext'
import PoemContent from '../components/PoemContent'
import { Divider } from 'antd'

const AllPoems=()=>{
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
    const [poetType, setPoetType] = useState([
        {id:'0', value:'不限'},{id:'1', value:'李白'},{id:'2', value:'杜甫'},{id:'3', value:'李煜'},
        {id:'4', value:'李清照'},{id:'5', value:'李商隐'},{id:'6', value:'李贺'},{id:'7', value:'杜牧'},
        {id:'8', value:'刘长卿'},{id:'9', value:'曹操'},{id:'10', value:'柳宗元'},{id:'11', value:'苏轼'},
        {id:'12', value:'苏辙'},{id:'13', value:'苏洵'},{id:'14', value:'陶渊明'},{id:'15', value:'元稹'}
    ])
    const [typeType, setTypeType] = useState([
        {id:'0', value:'不限'},{id:'0', value:'小学必背古诗三百首'},{id:'0', value:'中学必背古诗文'},{id:'0', value:'写风'},
        {id:'0', value:'写景'},{id:'0', value:'写花'},{id:'0', value:'伤感'},{id:'0', value:'抒情'}
    ])
    const dynastyContext = ['朝代',dynastyType]
    const poetContext = ['诗人',poetType]
    const typeContext = ['类别',typeType]
    return (
        <div className="allpoems-div">
            <CommonContext.Provider value={dynastyContext}>
                <TypeSelectList/>
            </CommonContext.Provider>
            <CommonContext.Provider value={poetContext}>
                <TypeSelectList/>
            </CommonContext.Provider>
            <CommonContext.Provider value={typeContext}>
                <TypeSelectList/>
            </CommonContext.Provider>
            <Divider></Divider>
            <div className="allpoems-div-poemcontent"><PoemContent/></div>
        </div>
    )
}
export default AllPoems