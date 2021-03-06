import { useState, useEffect, useContext } from 'react'
import CommonContext from '../components/CommonContext'
import { Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../styles/components/typeselectlist.css'

export default function DynastySelectList() {
    const [iconType, setIconType] = useState('down')
    const [chosenType, setChosenType] = useState(0)
    const [dynastyType, setDynastyType] = useState([])
    useEffect(()=>{
        getDynastyList()
    },[])
    const getDynastyList = ()=>{
        axios({
            method: 'get',
            url: servicePath.getDynastyList,
            withCredentials: true
        }).then(
            res=>{
                setDynastyType(res.data.data)
            }
        )
    }
    function openAll() {
        if (iconType == 'down') {
            setIconType('up')
        }
        else {
            setIconType('down')
        }
    }
    const chooseType = (e) => {
        // console.log(e.target.dataset)
        setChosenType(e.target.dataset.pos)
    }
    return (
        <div className="type-select-list-div">
            <div><span>朝代 :</span></div>
            <ul>
                {
                    dynastyType.map((item, index) => {
                        return (
                            <li
                                title={item.name}
                                data-pos={index}
                                key={index}
                                style={{ 
                                    marginTop: index > 13?"0.3rem":"0rem",
                                    display: iconType == 'up' || index <= 13 ? 'block' : 'none', 
                                    color: index == chosenType ? '#cd201f' : 'rgba(0, 0, 0, 0.65)' 
                                }}
                                onClick={chooseType}
                            >
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
            <Icon
                type={iconType}
                style={{ visibility: dynastyType.length > 14 ? "visible" : "hidden", cursor: "pointer", width: "3%" }}
                onClick={openAll}
            >
            </Icon>
        </div>
    )
}